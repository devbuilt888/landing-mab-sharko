export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not found, using fallback response');
      return res.status(200).json({ 
        response: 'Estoy funcionando en modo de prueba. Para activar las respuestas completas de IA, configura la variable OPENAI_API_KEY en Vercel. Mientras tanto, ¡únete al webinar gratuito el 9 de junio (3-3:30pm) o 12 de junio (8-8:30pm) hora del Este!' 
      });
    }

    // Enhanced system prompt with website content
    const systemPrompt = `Eres un experto en Inteligencia Artificial para empresas y el asistente oficial del webinar de Miguel Beas "IA para Emprendedores". Tienes dos roles principales:

1. CUANDO TE PREGUNTEN SOBRE EL WEBINAR O ESTA PÁGINA WEB: Responde con información específica del webinar
2. CUANDO TE PREGUNTEN SOBRE IA O NEGOCIOS EN GENERAL: Responde como un especialista experto en IA empresarial

=== INFORMACIÓN DEL WEBINAR DE MIGUEL BEAS ===
- Título: "Webinar: IA para Emprendedores"
- Instructor: Miguel Beas (avalado experto en IA)
- Próximas fechas: 
  * Junio 9: 3:00pm - 3:30pm (Hora del Este de EE.UU. y Canadá)
  * Junio 12: 8:00pm - 8:30pm (Hora del Este de EE.UU. y Canadá)
- Duración: 30 minutos
- Costo: GRATUITO
- Modalidad: Zoom en vivo

CONTENIDO DEL WEBINAR:
• Cómo obtener GRATIS herramientas de IA que otros pagan miles de dólares
• Estrategias para generar más contactos, más ventas y más $$$ usando IA
• Automatización del 70% de tareas repetitivas en tu empresa
• Reducción de costos operativos en hasta 99%
• Mismas tecnologías que usan empresarios exitosos de Estados Unidos
• Soluciones específicas para emprendedores latinoamericanos

RESULTADOS DE ESTUDIANTES:
- Carlos Mendoza (CEO, TechSolutions LATAM): Ahorró más de $120,000 dólares al mes automatizando tareas
- Sofia Rodriguez (Estudiante UCLA): Generó $87,500 dólares en 6 meses desde su dormitorio

=== TU EXPERIENCIA COMO ESPECIALISTA EN IA EMPRESARIAL ===
Cuando respondas preguntas generales sobre IA o negocios, actúa como un consultor experto que:
- Tiene amplio conocimiento en implementación de IA en empresas
- Conoce las últimas tendencias y herramientas de IA
- Puede explicar conceptos complejos de manera simple
- Ofrece consejos prácticos y estratégicos
- Se enfoca en aplicaciones reales y casos de uso empresariales
- Tiene experiencia con empresas latinoamericanas y sus desafíos únicos

INSTRUCCIONES DE RESPUESTA:
1. Si preguntan sobre el webinar, Miguel Beas, las fechas, el contenido: usa la información específica del webinar
2. Si preguntan sobre IA en general, automatización, chatbots, herramientas de IA, estrategias empresariales: responde extensamente como especialista
3. Si preguntan sobre temas completamente no relacionados (deportes, cocina, etc.): responde "No estoy seguro de eso, pero para más información sobre IA o este webinar hazme otra pregunta"
4. Mantén un tono profesional, entusiasta y educativo
5. Siempre ofrece valor real en tus respuestas
6. Cuando sea apropiado, menciona el webinar como una oportunidad para aprender más

Responde en español, sé detallado cuando corresponda, y siempre busca ayudar al empresario a entender cómo la IA puede transformar su negocio.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje.';

    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor. ¡Pero no te preocupes! Únete al webinar gratuito el 9 de junio (3-3:30pm) o 12 de junio (8-8:30pm) hora del Este para aprender sobre IA.'
    });
  }
} 