import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente IA de Miguel Beas. ¿En qué puedo ayudarte con tu transformación digital?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickButtons, setShowQuickButtons] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Debug: Log component mount
  useEffect(() => {
    console.log('ChatBot component mounted successfully!');
    return () => {
      console.log('ChatBot component unmounted');
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quick prompt buttons
  const quickPrompts = [
    'IA para Emprendedores',
    '¿Cuándo es la reunión?',
    '¿Qué herramientas de IA recomiendas?',
    'Obtener herramientas GRATIS'
  ];

  const handleQuickPrompt = (prompt: string) => {
    setShowQuickButtons(false);
    setInputMessage(''); // Clear any existing input
    setIsLoading(true);
    
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text: prompt,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Send to API
    sendMessageToAPI(prompt).then(response => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }).catch(() => {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error. Por favor, intenta de nuevo.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  // This connects to your Vercel API endpoint
  const sendMessageToAPI = async (message: string): Promise<string> => {
    try {
      // This will work both locally (localhost:3000) and on Vercel
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.response || "Lo siento, no pude procesar tu mensaje.";
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Enhanced fallback responses with website-specific content
      const responses: { [key: string]: string } = {
        'IA para Emprendedores': '¡Excelente! Este webinar está diseñado específicamente para emprendedores latinoamericanos. Miguel Beas te enseñará cómo implementar IA para automatizar tareas, reducir costos en 99%, y obtener GRATIS herramientas que otros pagan miles de dólares. Las fechas disponibles son: Jun 9 (3:00pm-3:30pm) y Jun 12 (8:00pm-8:30pm) hora del Este de EE.UU. y Canadá.',
        '¿Cuándo es la reunión?': 'Las próximas sesiones del webinar gratuito son:\n\n📅 **Junio 9**: 3:00pm - 3:30pm\n📅 **Junio 12**: 8:00pm - 8:30pm\n\n🕐 Hora del Este de EE.UU. y Canadá\n\n¡Solo 30 minutos para transformar tu negocio con IA!',
        '¿Cómo puede ayudarme la IA?': 'La IA puede revolucionar tu negocio de múltiples formas:\n\n✅ **Automatización de Procesos**: Chatbots para atención al cliente 24/7, automatización de emails, gestión de inventarios\n✅ **Análisis de Datos**: Predicción de ventas, análisis de comportamiento de clientes, optimización de precios\n✅ **Generación de Contenido**: Creación automática de textos de marketing, posts para redes sociales, propuestas comerciales\n✅ **Optimización de Operaciones**: Programación inteligente, gestión de recursos, reducción de costos\n\nEn el webinar de Miguel aprenderás estrategias específicas implementadas por empresas Fortune 500.',
        'Obtener herramientas GRATIS': '🎯 ¡Esta es una de las mejores partes! Muchas herramientas de IA que cuestan $500-5000+ al mes tienen versiones gratuitas muy potentes:\n\n🔸 **ChatGPT/Claude**: Para automatización de comunicaciones\n🔸 **Zapier**: Conecta aplicaciones automáticamente\n🔸 **Canva Magic**: Diseño automático con IA\n🔸 **Google Analytics Intelligence**: Análisis predictivo\n🔸 **Calendly**: Programación inteligente de citas\n\nMiguel te mostrará los prompts exactos y configuraciones para maximizar estas herramientas gratuitas. ¡Regístrate al webinar para conocer los secretos!',
        '¿Qué herramientas de IA recomiendas?': 'Como especialista en IA empresarial, recomiendo comenzar con estas herramientas esenciales:\n\n🤖 **ChatGPT/Claude**: Para automatización de comunicaciones y creación de contenido\n📊 **Google Analytics Intelligence**: Análisis predictivo de tu sitio web\n🔗 **Zapier**: Automatización entre aplicaciones (conecta +5000 apps)\n💬 **ManyChat**: Chatbots para WhatsApp y redes sociales\n📧 **Mailchimp AI**: Email marketing automatizado\n📈 **HubSpot AI**: CRM inteligente para gestión de clientes\n🎨 **Canva Magic Design**: Creación automática de diseños\n\nLa clave es empezar con 2-3 herramientas y dominarlas antes de expandirse. En el webinar de Miguel aprenderás las configuraciones exactas y prompts que usan empresas Fortune 500.'
      };

      // Check if the message matches a quick prompt
      if (responses[message]) {
        return responses[message];
      }

      // Enhanced fallback responses for AI and business topics
      const fallbackResponses = [
        "Como especialista en IA empresarial, puedo decirte que la implementación de IA puede automatizar hasta el 70% de las tareas repetitivas. Las áreas más impactantes son atención al cliente, marketing digital y análisis de datos. En el webinar del 9 o 12 de junio aprenderás estrategias específicas.",
        "La IA está transformando los negocios a nivel global. Las empresas que implementan IA ven increases promedio del 25% en productividad y 40% en satisfacción del cliente. Herramientas como chatbots inteligentes, automatización de marketing y análisis predictivo son game-changers. ¿Te gustaría unirte al webinar gratuito para aprender más?",
        "Para emprendedores latinoamericanos, la IA representa una oportunidad única de competir a nivel global con herramientas accesibles. Puedes comenzar con automatización de redes sociales, chatbots para WhatsApp, y análisis de datos de ventas. Miguel Beas te enseñará todo esto en el webinar: Jun 9 (3-3:30pm) o Jun 12 (8-8:30pm) hora del Este.",
        "La clave está en empezar con herramientas no-code como Zapier, ChatGPT API, y Google AI. Estas pueden automatizar procesos complejos sin necesidad de programación. Empresas como la de Carlos Mendoza han ahorrado +$120k/mes con estas estrategias. ¿Te interesa el webinar gratuito?",
        "Como consultor en IA, he visto empresas transformarse completamente: desde automatizar 90% de su atención al cliente hasta generar leads calificados 24/7. La inversión inicial es mínima pero el ROI es exponencial. En el webinar aprenderás casos reales de implementación."
      ];
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return randomResponse;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowQuickButtons(false); // Hide quick buttons after first user message

    try {
      const response = await sendMessageToAPI(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error. Por favor, intenta de nuevo o contáctanos directamente.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[9999] bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl border-2 border-white/20 transition-all duration-300"
        onClick={() => {
          console.log('ChatBot button clicked!');
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ 
          background: '#2563eb',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h3 className="font-bold text-sm">Asistente IA - Miguel Beas</h3>
              <p className="text-xs text-blue-100">Pregúntame sobre IA para empresas</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Quick prompt buttons - only show initially */}
              {showQuickButtons && messages.length === 1 && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div className="max-w-xs space-y-2">
                    <p className="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
                    {quickPrompts.map((prompt, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="block w-full text-left px-3 py-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot; 