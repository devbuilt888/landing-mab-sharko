import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, RocketLaunchIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import CalendlyModal from './CalendlyModal';

const ParticleSystem = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5
      }));
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const GeometricShapes = () => {
  const [shapes, setShapes] = useState<{ id: number; x: number; y: number; size: number; delay: number; rotation: number }[]>([]);

  useEffect(() => {
    const createShapes = () => {
      const newShapes = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        delay: Math.random() * 4,
        rotation: Math.random() * 360
      }));
      setShapes(newShapes);
    };

    createShapes();
  }, []);

  return (
    <>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="geometric-shape"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.8, 0],
            scale: [0, 1.2, 0.8, 1.2, 0],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
          }}
          transition={{
            duration: 10,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const FloatingText = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-black-30 backdrop-blur-sm p-4 rounded-xl border border-white-10 shadow-xl">
        <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
          La habilidad #1
        </p>
        <p className="text-gray-300 text-xs mt-1">
          para aprender en 2025
        </p>
      </div>
    </div>
  );
};

const LimitedSeatsBanner = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-black-30 backdrop-blur-sm p-4 rounded-xl border border-white-10 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-red-400 text-xs font-medium">No te quedes atrás</span>
        </div>
        <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
          Únete Ahora
        </p>
        <p className="text-gray-300 text-xs mt-1">
          antes que sea tarde
        </p>
      </div>
    </div>
  );
};

const DefaultLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setShowModal(true);

  const modalTheme = {
    background: 'bg-gray-900/95',
    borderColor: 'border-white/10',
    titleColor: 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400',
    subtitleColor: 'text-gray-300',
    textColor: 'text-gray-300',
    iconColors: {
      close: 'text-gray-400'
    }
  };

  const modalFeatures = [
    {
      icon: <SparklesIcon className="w-5 h-5 text-blue-400" />,
      text: 'Obtén GRATIS lo que otros pagan miles de dólares'
    },
    {
      icon: <RocketLaunchIcon className="w-5 h-5 text-purple-400" />,
      text: 'Más contactos, más ventas, más $$$'
    },
    {
      icon: <ChartBarIcon className="w-5 h-5 text-pink-400" />,
      text: 'Automatiza tareas repetitivas y enfócate en lo importante'
    }
  ];

  return (
    <main className="min-h-screen text-white overflow-hidden relative">
      {/* Profile Section */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/25">
          <img
            src="/images/profile.jpeg"
            alt="Miguel Beas"
            className="object-cover w-full h-full"
          />
        </div>
        <span className="text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          Avalado por Miguel Beas
        </span>
      </motion.div>

      {/* Floating Text */}
      <FloatingText />

      {/* Limited Seats Banner */}
      <LimitedSeatsBanner />

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡Últimos Cupos Disponibles!"
        subtitle="Reserva tu lugar en el webinar GRATUITO de IA para emprendedores"
        features={modalFeatures}
        theme={modalTheme}
      />

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 bg-size-400"></div>
        <div className="absolute inset-0 bg-radial-gradient"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <ParticleSystem />
        <GeometricShapes />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Webinar: IA para Emprendedores
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              📹 Únete a un Zoom GRATUITO donde aprenderás en 30 mins
            </p>
            <p className="text-sm text-gray-300">
              Cómo la IA en español ya puede hacer crecer tu negocio de manera automática
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 Emprendedores en Latinoamérica se están quedando atrás de Estados Unidos en el uso de IA
            </p>
            <p className="text-sm text-gray-300">
              Mientras empresarios estadounidenses automatizan sus negocios y reducen costos en 99%, muchos en LATAM siguen usando métodos tradicionales
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre cómo empresarios líderes en Estados Unidos están revolucionando sus negocios con IA y cómo tú puedes hacer lo mismo
          </motion.p>
          <motion.button 
            onClick={openModal}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            No Me Quiero Quedar Atrás
          </motion.button>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <SparklesIcon className="w-12 h-12 text-blue-400" />,
              title: "Obtén GRATIS lo que Otros Pagan Miles",
              description: "Muchas soluciones de IA que ves anunciadas por miles de dólares, las puedes obtener GRATIS usando los modelos básicos de IA con los prompts correctos"
            },
            {
              icon: <RocketLaunchIcon className="w-12 h-12 text-purple-400" />,
              title: "Más Contactos, Más Ventas, Más $$$",
              description: "La IA te ayuda a generar leads calificados automáticamente, cerrar más ventas con chatbots inteligentes y crear sistemas que trabajan 24/7 para hacer crecer tu negocio y aumentar tus ingresos"
            },
            {
              icon: <ChartBarIcon className="w-12 h-12 text-pink-400" />,
              title: "Automatiza Tareas Repetitivas",
              description: "Muchas tareas repetitivas que te quitan tiempo de hacer cosas importantes en tu negocio pueden ser fácilmente manejadas con IA"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gray-800-50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700-50 hover:border-purple-500-50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {benefit.title}
              </h3>
              <p className="text-gray-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Urgency Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-yellow-900/30 to-red-900/30 backdrop-blur-sm p-12 rounded-2xl border border-yellow-500/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ⚠️ No Puedes Quedarte Atrás en IA
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA va a avanzar tan rápido que quedarse atrás hoy significa quedarse atrás para siempre. Según las tendencias económicas, <span className="font-bold text-yellow-300">la IA es lo #1 que debes aprender en 2025</span>.
          </motion.p>
          <motion.p 
            className="text-lg mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Nunca antes había sido tan barato y alcanzable construir soluciones de software personalizadas para negocios que usan las mismas tecnologías que las empresas de Silicon Valley.
          </motion.p>
          <motion.button 
            onClick={openModal}
            className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Quiero Aprender IA Ahora
          </motion.button>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🚀 Resultados Reales de Nuestros Estudiantes
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              className="bg-gray-800-50 backdrop-blur-sm p-8 rounded-2xl border border-green-500/30 shadow-lg shadow-green-500/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-2xl font-bold text-white">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Carlos Mendoza</h3>
                  <p className="text-green-400 text-sm">CEO, TechSolutions LATAM</p>
                </div>
              </div>
              <div className="text-gray-300 leading-relaxed">
                <p className="text-lg mb-4">
                  🤯🤯🤯 NO PUEDEN CREER LO QUE PASÓ!!! 🚀💰
                </p>
                <p className="mb-4">
                  Hermanos, estoy TEMBLANDO mientras escribo esto... 😱 Después del webinar de Miguel, implementé TODO lo que enseñó y MIREN ESTOS NÚMEROS: 📊
                </p>
                <p className="mb-4 text-green-300 font-bold">
                  💵 AHORRÉ MÁS DE $120,000 DÓLARES AL MES en salarios!!! 💵
                </p>
                <p className="mb-4">
                  La IA ahora hace TODO: 🤖 ✅ Desarrolla nuestro software ✅ Crea contenido para redes sociales ✅ Maneja tareas que antes requerían 8 empleados!!! 
                </p>
                <p className="text-yellow-300 font-semibold">
                  Literalmente estoy llorando de la emoción... MI VIDA CAMBIÓ PARA SIEMPRE!!! 😭🙏✨
                </p>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              className="bg-gray-800-50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-2xl font-bold text-white">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sofia Rodriguez</h3>
                  <p className="text-purple-400 text-sm">Estudiante de Marketing, UCLA</p>
                </div>
              </div>
              <div className="text-gray-300 leading-relaxed">
                <p className="text-lg mb-4">
                  OMG CHICOS!!! 😍💎 TENGO QUE CONTARLES ESTO!!! 🔥
                </p>
                <p className="mb-4">
                  Estoy escribiendo desde mi cuarto en el dormitorio universitario y NO PUEDO PARAR DE GRITAR!!! 🏫📢 Miguel me cambió la vida COMPLETAMENTE!!! 
                </p>
                <p className="mb-4 text-purple-300 font-bold">
                  💰 $87,500 DÓLARES en 6 MESES!!! 💰 DESDE MI CUARTO!!! 
                </p>
                <p className="mb-4">
                  Con el equipo de asistentes de IA que construimos, ofrezco servicios de marketing a empresas 🚀 ¡Los clientes PELEAN por trabajar conmigo! 💪✨
                </p>
                <p className="text-pink-300 font-semibold">
                  Mis papás no entienden cómo gano más que ellos siendo estudiante!!! 😂👨‍👩‍👧 ¡GRACIAS MIGUEL! 🙏💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-gray-800-50 backdrop-blur-sm p-12 rounded-2xl border border-gray-700-50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforma tu Negocio con IA en 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aprende a crear soluciones profesionales, automatizar procesos y aprovechar las mismas tecnologías que usan los emprendedores más exitosos de Estados Unidos
          </motion.p>
          <motion.button 
            onClick={openModal}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Reserva tu Lugar
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default DefaultLanding; 