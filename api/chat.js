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
    const systemPrompt = `Eres el asistente IA oficial de Miguel Beas para su webinar "IA para Emprendedores". Tu trabajo es responder ÚNICAMENTE preguntas relacionadas con el contenido de la página web del webinar y temas directamente relacionados con IA para empresas y emprendedores.

INFORMACIÓN DEL WEBINAR:
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

PROBLEMA QUE RESUELVE:
- Emprendedores en Latinoamérica se están quedando atrás de Estados Unidos en el uso de IA
- La IA es la habilidad #1 para aprender en 2025
- Nunca había sido tan barato construir soluciones de software personalizadas

RESULTADOS DE ESTUDIANTES ANTERIORES:
- Carlos Mendoza (CEO, TechSolutions LATAM): Ahorró más de $120,000 dólares al mes automatizando tareas que requerían 8 empleados
- Sofia Rodriguez (Estudiante UCLA): Generó $87,500 dólares en 6 meses desde su dormitorio usando asistentes de IA

INSTRUCCIONES DE RESPUESTA:
1. Si la pregunta está relacionada con el webinar, IA para empresas, automatización, emprendimiento, o Miguel Beas: responde con información útil y específica
2. Si la pregunta NO está relacionada con estos temas: responde EXACTAMENTE: "No estoy seguro de eso, pero para más información de esta web hazme otra pregunta"
3. Siempre mantén un tono entusiasta y motivador
4. Incluye las fechas del webinar cuando sea relevante
5. Enfócate en los beneficios específicos mencionados en la página web

Responde en español, sé conciso pero informativo, y siempre invita a registrarse al webinar gratuito.`;

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