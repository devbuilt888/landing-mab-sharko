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

const FloatingText = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-black-30 backdrop-blur-sm p-4 rounded-xl border border-white-10 shadow-xl">
        <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
          10x más productivo
        </p>
        <p className="text-gray-300 text-xs mt-1">
          con herramientas de IA
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
          <span className="text-red-400 text-xs font-medium">Cupos Limitados</span>
        </div>
        <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
          Regístrate Ahora
        </p>
        <p className="text-gray-300 text-xs mt-1">
          al webinar de IA
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
                No pierdas la oportunidad de transformar tu negocio con IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <SparklesIcon className="w-5 h-5 text-blue-400" />
                <p>Aprende a crear contenido profesional con IA</p>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <RocketLaunchIcon className="w-5 h-5 text-purple-400" />
                <p>Descubre las mejores herramientas de IA para tu negocio</p>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <ChartBarIcon className="w-5 h-5 text-pink-400" />
                <p>Automatiza tus procesos y aumenta tu productividad</p>
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
            Webinar: IA para Empresas
          </motion.h1>
          <motion.p 
            className="text-xl md-text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre cómo las empresas líderes en Estados Unidos están revolucionando sus negocios con IA
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Registrarse Ahora
          </motion.button>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <SparklesIcon className="w-12 h-12 text-blue-400" />,
              title: "Creación de Contenido con IA",
              description: "Aprende a generar contenido profesional, desde posts en redes sociales hasta blogs y newsletters, utilizando las mejores herramientas de IA"
            },
            {
              icon: <RocketLaunchIcon className="w-12 h-12 text-purple-400" />,
              title: "Tecnologías de IA",
              description: "Descubre las herramientas más efectivas para tu negocio: ChatGPT, Midjourney, DALL-E, y otras plataformas de IA generativa"
            },
            {
              icon: <ChartBarIcon className="w-12 h-12 text-pink-400" />,
              title: "Automatización Inteligente",
              description: "Implementa flujos de trabajo automatizados para marketing, atención al cliente y análisis de datos usando IA"
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
            Transforma tu Estrategia Digital con IA
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aprende a crear contenido impactante, automatizar procesos y aprovechar las últimas tecnologías de IA para tu negocio
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
