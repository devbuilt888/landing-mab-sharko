import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, RocketLaunchIcon, ChartBarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import './App.css';

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

const RegistrationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black-50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-gray-900-95 backdrop-blur-md p-8 rounded-2xl border border-white-10 shadow-2xl max-w-lg w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                ¡Últimos Cupos Disponibles!
              </h3>
              <p className="text-gray-300">
                No dejes que tu negocio se quede atrás en la revolución de la IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <SparklesIcon className="w-5 h-5 text-blue-400" />
                <p>Obtén GRATIS lo que Otros Pagan Miles</p>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <RocketLaunchIcon className="w-5 h-5 text-purple-400" />
                <p>Construye software 99% más barato que métodos tradicionales</p>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <ChartBarIcon className="w-5 h-5 text-pink-400" />
                <p>Automatiza tareas repetitivas y enfócate en lo importante</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              Reservar mi Lugar Ahora
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-hidden relative">
      {/* Profile Section */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500-50 shadow-lg shadow-purple-500/25">
          <img
            src="/images/profile.jpeg"
            alt="Miguel Beas"
            className="object-cover w-full h-full"
          />
        </div>
        <span className="text-sm font-medium bg-black-30 backdrop-blur-sm px-3 py-1 rounded-full border border-white-10">
          Presentado por Miguel Beas
        </span>
      </motion.div>

      {/* Floating Text */}
      <FloatingText />

      {/* Limited Seats Banner */}
      <LimitedSeatsBanner />

      {/* Registration Modal */}
      <RegistrationModal isOpen={showModal} onClose={() => setShowModal(false)} />

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
              title: "Software 99% Más Barato",
              description: "La IA puede construir aplicaciones web y software 99% más barato que las rutas tradicionales. Nunca antes había sido tan económico crear soluciones personalizadas"
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
}

export default App;
