import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicrophoneIcon, TvIcon, SignalIcon, XMarkIcon } from '@heroicons/react/24/outline';

const NewsTickerParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6
      }));
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: '#dc2626',
            borderRadius: '50%',
            boxShadow: '0 0 8px #dc2626',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.6, 1, 0],
            scale: [0, 1, 0.8, 1, 0],
            x: [0, 30, -20, 0],
          }}
          transition={{
            duration: 10,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const BroadcastElements = () => {
  const [elements, setElements] = useState<{ id: number; x: number; y: number; size: number; delay: number; type: string }[]>([]);

  useEffect(() => {
    const createElement = () => {
      const types = ['📺', '📡', '🎙️', '📻', '📰'];
      const newElements = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 25 + 15,
        delay: Math.random() * 8,
        type: types[Math.floor(Math.random() * types.length)]
      }));
      setElements(newElements);
    };

    createElement();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.4, 0.7, 0],
            scale: [0, 1, 1.2, 1, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 16,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {element.type}
        </motion.div>
      ))}
    </div>
  );
};

const BreakingNews = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-red-900/60 backdrop-blur-sm p-4 rounded border border-red-400/50 shadow-xl shadow-red-500/20">
        <p className="text-lg font-bold text-red-300">
          📺 NOTICIA DE ÚLTIMA HORA
        </p>
        <p className="text-red-200 text-xs mt-1">
          Exclusiva IA 2025
        </p>
      </div>
    </div>
  );
};

const LiveAlert = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-orange-900/60 backdrop-blur-sm p-4 rounded border border-orange-400/50 shadow-xl shadow-orange-500/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full"></div>
          <span className="text-red-300 text-xs font-medium">EN VIVO</span>
        </div>
        <p className="text-lg font-bold text-red-300">
          ¡CONECTARSE YA!
        </p>
        <p className="text-orange-200 text-xs mt-1">
          transmisión en directo
        </p>
      </div>
    </div>
  );
};

const ExclusiveModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-red-900/80 backdrop-blur-md p-8 rounded border-2 border-red-400 shadow-2xl shadow-red-500/30 max-w-lg w-full mx-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 0 50px rgba(220, 38, 38, 0.3), inset 0 0 20px rgba(220, 38, 38, 0.1)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-red-300 hover:text-red-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-red-300">
                📺 ¡ÚLTIMAS PLAZAS PARA ENTREVISTA EXCLUSIVA!
              </h3>
              <p className="text-red-200">
                No te quedes sin la noticia del siglo mientras otros reporteros cubren la revolución IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-red-200">
                <MicrophoneIcon className="w-5 h-5 text-red-300" />
                <p>Reportajes IA GRATUITOS vs. noticias costosas de las agencias</p>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <TvIcon className="w-5 h-5 text-orange-400" />
                <p>Más audiencia, más rating, más ingresos publicitarios $$$</p>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <SignalIcon className="w-5 h-5 text-yellow-400" />
                <p>Automatización de noticias para cobertura 24/7</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/25">
              📺 ENTRAR AL ESTUDIO AHORA
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NewsroomLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #374151 25%, #4b5563 50%, #6b7280 75%, #1f2937 100%)' }}>
      {/* Anchor Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded border-2 border-red-400 shadow-lg shadow-red-500/50">
          <img
            src="/images/profile.jpeg"
            alt="Periodista Miguel Beas"
            className="object-cover w-full h-full rounded"
            style={{ filter: 'contrast(1.2) saturate(1.3)' }}
          />
        </div>
        <span className="text-sm font-medium bg-red-900/60 backdrop-blur-sm px-3 py-1 rounded border border-red-400">
          📺 Periodista Miguel Beas
        </span>
      </motion.div>

      {/* Breaking News */}
      <BreakingNews />

      {/* Live Alert */}
      <LiveAlert />

      {/* Exclusive Modal */}
      <ExclusiveModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Studio Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-slate-800/20 to-gray-900/30"></div>
        
        {/* Studio lights */}
        <motion.div
          className="absolute top-0 left-1/3 w-24 h-full bg-gradient-to-b from-red-400/20 to-transparent"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            x: [0, 50, -25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-blue-400/20 to-transparent"
          animate={{
            opacity: [0.6, 0.2, 0.6],
            x: [0, -50, 25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <NewsTickerParticles />
        <BroadcastElements />
      </div>

      {/* Breaking News Banner */}
      <motion.div 
        className="absolute top-0 left-0 w-full bg-red-600 text-white py-2 z-30"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center">
          <motion.span 
            className="text-lg font-bold mr-4 bg-white text-red-600 px-3 py-1 rounded"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ÚLTIMA HORA
          </motion.span>
          <motion.div 
            className="text-sm"
            animate={{ x: [-100, 800] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            REVOLUCIÓN IA: Miguel Beas revela secretos que cambiarán para siempre la forma de hacer negocios en Latinoamérica
          </motion.div>
        </div>
      </motion.div>

      {/* Investigative Report Section */}
      <div className="container mx-auto px-4 py-32 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            📺 INVESTIGACIÓN ESPECIAL: IA REVELADA
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              🎙️ ENTREVISTA EXCLUSIVA - 30 MINUTOS DE REVELACIONES
            </p>
            <p className="text-sm text-green-200">
              Reportaje en profundidad que expone los secretos mejor guardados de la industria IA que todo empresario debe conocer
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 CRISIS INFORMATIVA: Medios Latinoamericanos Silencian la Verdad
            </p>
            <p className="text-sm text-red-200">
              Mientras canales estadounidenses reportan cómo IA reduce costos en 99%, nuestros noticieros siguen con noticias obsoletas
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre la historia que los grandes medios de Silicon Valley no quieren que sepas y conviértete en primicia mundial
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            📺 VER REPORTAJE EXCLUSIVO
          </motion.button>
        </motion.div>
      </div>

      {/* Media Arsenal Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <MicrophoneIcon className="w-12 h-12 text-red-300" />,
              title: "NOTICIAS GRATIS VS INFORMACIÓN COSTOSA",
              description: "Muchos reportajes IA que las agencias cobran por miles de dólares, los obtienes GRATIS en nuestro canal usando fuentes directas de primera mano"
            },
            {
              icon: <TvIcon className="w-12 h-12 text-orange-400" />,
              title: "AUDIENCIA 99% MÁS GRANDE",
              description: "La IA puede multiplicar tu reach mediático 99% más que métodos tradicionales. Nunca antes la viralización había sido tan efectiva"
            },
            {
              icon: <SignalIcon className="w-12 h-12 text-yellow-400" />,
              title: "COBERTURA AUTOMATIZADA",
              description: "Muchas noticias repetitivas que quitan tiempo de las investigaciones principales pueden ser cubiertas por reporteros IA"
            }
          ].map((scoop, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/30 backdrop-blur-sm p-8 rounded border border-gray-400/30 hover:border-red-400/50 transition-colors shadow-lg shadow-gray-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{scoop.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-red-300">
                {scoop.title}
              </h3>
              <p className="text-gray-200">
                {scoop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editorial Warning */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-red-900/30 backdrop-blur-sm p-12 rounded border border-red-500/50 shadow-lg shadow-red-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-red-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            📰 EDITORIAL DE EMERGENCIA: NO PUEDES IGNORAR ESTA NOTICIA
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA evoluciona más rápido que cualquier ciclo de noticias. Quedarse desinformado hoy significa perder la historia del siglo para siempre. <span className="font-bold text-orange-300">La IA es la noticia #1 que necesitas cubrir en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            📺 SINTONIZAR AHORA
          </motion.button>
        </motion.div>
      </div>

      {/* Reporter Testimonials */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-12 text-center text-red-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🎙️ TESTIMONIOS DE NUESTROS CORRESPONSALES
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-gray-900/40 backdrop-blur-sm p-8 rounded border border-red-400/30 shadow-lg shadow-red-500/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-red-500 flex items-center justify-center text-2xl font-bold text-white">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-300">Carlos "El Corresponsal" Mendoza</h3>
                  <p className="text-gray-200 text-sm">Reportero Jefe, Canal TechSolutions</p>
                </div>
              </div>
              <div className="text-gray-200 leading-relaxed">
                <p className="text-lg mb-4">
                  📺📺📺 ¡EXCLUSIVA MUNDIAL! ¡RATING HISTÓRICO! 🎙️💰
                </p>
                <p className="mb-4">
                  ¡Colegas periodistas, estoy EMOCIONADO transmitiendo desde mi estudio principal! 😱 Después de la capacitación con el Director Miguel, cubrí TODAS las noticias IA y ¡MIREN ESTOS NÚMEROS DE AUDIENCIA! 📊
                </p>
                <p className="mb-4 text-red-300 font-bold">
                  💵 ¡GENERÉ $120,000 DÓLARES EN PUBLICIDAD cada mes! 💵
                </p>
                <p className="mb-4">
                  Mi equipo de producción IA ahora CUBRE TODO: 📺 ✅ Produce reportajes digitales ✅ Ejecuta campañas mediáticas ✅ Automatiza noticias que antes requerían 8 reporteros!!!
                </p>
                <p className="text-red-300 font-semibold">
                  ¡Esta historia cambió mi carrera para toda la vida! ¡SOY EL PERIODISTA #1! 😭📺✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/40 backdrop-blur-sm p-8 rounded border border-orange-400/30 shadow-lg shadow-orange-500/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-orange-500 flex items-center justify-center text-2xl font-bold text-white">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-300">Sofia "La Presentadora" Rodriguez</h3>
                  <p className="text-orange-200 text-sm">Anchor, Noticiero UCLA</p>
                </div>
              </div>
              <div className="text-gray-200 leading-relaxed">
                <p className="text-lg mb-4">
                  📺 ¡NOTICIA BOMBA! ¡TENGO QUE REPORTAR ESTO! 🔥
                </p>
                <p className="mb-4">
                  ¡Transmitiendo desde mi set en el campus y NO PUEDO PARAR DE DAR PRIMICIAS! 🏫📢 ¡El Director Miguel me enseñó a navegar los CANALES INFINITOS del periodismo IA!!!
                </p>
                <p className="mb-4 text-orange-300 font-bold">
                  💰 ¡$87,500 DÓLARES EN CONTRATOS en 6 PROGRAMAS! 💰 ¡DESDE MI ESTUDIO ESTUDIANTIL!
                </p>
                <p className="mb-4">
                  Con mi equipo de camarógrafos IA, produzco contenido para empresas mediáticas 📺 ¡Los canales LUCHAN por mis exclusivas! 💪✨
                </p>
                <p className="text-orange-300 font-semibold">
                  ¡Mis padres no entienden cómo tengo más rating que ellos siendo pasante! 😂👨‍👩‍👧 ¡GRACIAS DIRECTOR MIGUEL! 📺💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* News Network */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-gray-900/30 backdrop-blur-sm p-12 rounded border border-red-400/50 shadow-lg shadow-red-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-red-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            📺 ÚNETE A LA RED DE NOTICIAS IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Conviértete en corresponsal estrella, automatiza tu producción y usa las mismas técnicas que dominan los titulares de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            📺 SOLICITAR CREDENCIAL DE PRENSA
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default NewsroomLanding; 