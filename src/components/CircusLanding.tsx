import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, MegaphoneIcon, GiftIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ConfettiParticles = () => {
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; size: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    const createConfetti = () => {
      const colors = ['#ff6b35', '#f7931e', '#ffd23f', '#06d6a0', '#118ab2', '#073b4c'];
      const newConfetti = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setConfetti(newConfetti);
    };

    createConfetti();
  }, []);

  return (
    <>
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="confetti-particle"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            boxShadow: `0 0 8px ${piece.color}`,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0.7, 1, 0],
            scale: [0, 1, 0.8, 1, 0],
            y: [0, -30, 10, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            delay: piece.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const CircusTents = () => {
  const [tents, setTents] = useState<{ id: number; x: number; y: number; size: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    const createTents = () => {
      const colors = ['#ff6b35', '#f7931e', '#06d6a0', '#118ab2'];
      const newTents = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 30,
        delay: Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setTents(newTents);
    };

    createTents();
  }, []);

  return (
    <>
      {tents.map((tent) => (
        <motion.div
          key={tent.id}
          className="circus-tent"
          style={{
            left: `${tent.x}%`,
            top: `${tent.y}%`,
            width: `${tent.size}px`,
            height: `${tent.size}px`,
            background: `linear-gradient(45deg, ${tent.color}, #ffd23f)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            boxShadow: `0 0 25px ${tent.color}40`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.5, 0.8, 0],
            scale: [0, 1, 1.3, 1, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            delay: tent.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const BigTopSign = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-red-900/60 backdrop-blur-sm p-4 rounded-xl border-2 border-yellow-400 shadow-xl shadow-red-500/20">
        <p className="text-lg font-bold text-yellow-300">
          🎪 GRAN CARPA
        </p>
        <p className="text-red-200 text-xs mt-1">
          Espectáculo IA 2025
        </p>
      </div>
    </div>
  );
};

const CircusAlert = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-orange-900/60 backdrop-blur-sm p-4 rounded-xl border-2 border-red-400 shadow-xl shadow-orange-500/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-red-400 animate-pulse rounded-full"></div>
          <span className="text-red-300 text-xs font-medium">¡ÚLTIMA FUNCIÓN!</span>
        </div>
        <p className="text-lg font-bold text-red-300">
          ¡ENTRAR YA!
        </p>
        <p className="text-orange-200 text-xs mt-1">
          antes que cierre la carpa
        </p>
      </div>
    </div>
  );
};

const TicketModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            className="relative bg-red-900/80 backdrop-blur-md p-8 rounded-xl border-4 border-yellow-400 shadow-2xl shadow-red-500/30 max-w-lg w-full mx-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 0 50px rgba(255, 210, 63, 0.3), inset 0 0 20px rgba(255, 107, 53, 0.1)'
            }}
            initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotate: 5 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-yellow-300">
                🎪 ¡ÚLTIMOS BOLETOS DISPONIBLES!
              </h3>
              <p className="text-red-200">
                No te quedes fuera del espectáculo más grandioso del mundo empresarial IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-red-200">
                <SparklesIcon className="w-5 h-5 text-yellow-400" />
                <p>Trucos IA GRATUITOS vs. magia costosa de los ilusionistas</p>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <MegaphoneIcon className="w-5 h-5 text-orange-400" />
                <p>Más público, más aplausos, más ganancias $$$</p>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <GiftIcon className="w-5 h-5 text-pink-400" />
                <p>Automatización circense para actos repetitivos</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/25">
              🎪 COMPRAR BOLETO AHORA
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CircusLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #f97316 25%, #eab308 50%, #dc2626 75%, #7c2d12 100%)' }}>
      {/* Ringmaster Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded-full border-4 border-yellow-400 shadow-lg shadow-yellow-500/50">
          <img
            src="/images/profile.jpeg"
            alt="Maestro de Ceremonias Miguel Beas"
            className="object-cover w-full h-full rounded-full"
            style={{ filter: 'saturate(1.5) contrast(1.2)' }}
          />
        </div>
        <span className="text-sm font-medium bg-red-900/60 backdrop-blur-sm px-3 py-1 rounded-full border-2 border-yellow-400">
          🎪 Maestro Miguel Beas
        </span>
      </motion.div>

      {/* Big Top Sign */}
      <BigTopSign />

      {/* Circus Alert */}
      <CircusAlert />

      {/* Ticket Modal */}
      <TicketModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Carnival Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-orange-900/20 to-yellow-900/30"></div>
        
        {/* Spotlight effects */}
        <motion.div
          className="absolute top-0 left-1/3 w-32 h-full bg-gradient-to-b from-yellow-400/30 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            x: [0, 100, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-32 h-full bg-gradient-to-b from-red-400/30 to-transparent"
          animate={{
            opacity: [0.8, 0.3, 0.8],
            x: [0, -100, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.4, 1, 1.4],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <ConfettiParticles />
        <CircusTents />
      </div>

      {/* Grand Spectacle Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-300 to-orange-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🎪 EL GRAN CIRCO: IA MÁGICA
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border-2 border-green-500 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              🎭 FUNCIÓN ESPECIAL - 30 MINUTOS DE MAGIA PURA
            </p>
            <p className="text-sm text-green-200">
              Trucos increíbles de IA que harán que tu audiencia aplauda de pie y tu negocio se convierta en el acto principal
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border-2 border-red-500 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 CARPA EN LLAMAS: Empresarios Latinoamericanos Sin Entrada al Espectáculo
            </p>
            <p className="text-sm text-red-200">
              Mientras los maestros de ceremonia estadounidenses usan IA para reducir costos en 99%, nuestros payasos siguen con trucos obsoletos
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-yellow-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre los trucos de magia más asombrosos que usan los maestros de Silicon Valley y conviértete en la estrella principal
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🎪 CONSEGUIR BOLETO VIP
          </motion.button>
        </motion.div>
      </div>

      {/* Magic Acts Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <SparklesIcon className="w-12 h-12 text-yellow-400" />,
              title: "MAGIA GRATIS VS ILUSIONES COSTOSAS",
              description: "Muchos trucos IA que los magos profesionales cobran por miles de dólares, los aprendes GRATIS en nuestra carpa usando técnicas que enseñamos en el circo más famoso del mundo"
            },
            {
              icon: <MegaphoneIcon className="w-12 h-12 text-red-400" />,
              title: "ESPECTÁCULO 99% MÁS GRANDIOSO",
              description: "La IA puede hacer que tu negocio sea 99% más espectacular que métodos tradicionales. Nunca antes el entretenimiento había sido tan rentable"
            },
            {
              icon: <GiftIcon className="w-12 h-12 text-pink-400" />,
              title: "ASISTENTES AUTOMÁTICOS",
              description: "Muchos actos repetitivos que quitan tiempo del espectáculo principal pueden ser realizados por payasos IA entrenados"
            }
          ].map((act, index) => (
            <motion.div
              key={index}
              className="bg-red-900/30 backdrop-blur-sm p-8 rounded-xl border-2 border-yellow-400/30 hover:border-red-400/50 transition-colors shadow-lg shadow-red-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5, rotate: 1 }}
            >
              <div className="mb-4">{act.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">
                {act.title}
              </h3>
              <p className="text-red-200">
                {act.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fire Alert Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-red-900/30 backdrop-blur-sm p-12 rounded-xl border-2 border-orange-500 shadow-lg shadow-red-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-orange-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🔥 CARPA EN LLAMAS: NO PUEDES QUEDARTE FUERA
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA evoluciona más rápido que un trapecista volador. Quedarse sin boleto hoy significa perderse el espectáculo del siglo para siempre. <span className="font-bold text-yellow-300">La IA es el acto principal #1 que necesitas en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🎪 ENTRAR AL ESPECTÁCULO YA
          </motion.button>
        </motion.div>
      </div>

      {/* Performer Testimonials */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-12 text-center text-yellow-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🎭 TESTIMONIOS DE NUESTRAS ESTRELLAS
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-red-900/40 backdrop-blur-sm p-8 rounded-xl border-2 border-yellow-400/30 shadow-lg shadow-red-500/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-2xl font-bold text-black">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-300">Carlos "El Mago" Mendoza</h3>
                  <p className="text-red-200 text-sm">Ilusionista Principal, Circo TechSolutions</p>
                </div>
              </div>
              <div className="text-red-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🎪🎪🎪 ¡FUNCIÓN SOLD OUT! ¡PÚBLICO DE PIE! 🎭💰
                </p>
                <p className="mb-4">
                  ¡Señoras y señores, estoy EUFÓRICO presentando desde mi carpa principal! 😱 Después del entrenamiento con el Gran Maestro Miguel, dominé TODOS los trucos IA y ¡MIREN ESTA OVACIÓN DEL PÚBLICO! 📊
                </p>
                <p className="mb-4 text-yellow-300 font-bold">
                  💵 ¡RECAUDÉ $120,000 DÓLARES EN TAQUILLA cada mes! 💵
                </p>
                <p className="mb-4">
                  Mis asistentes IA ahora EJECUTAN TODO: 🎪 ✅ Montan espectáculos digitales ✅ Realizan trucos de marketing ✅ Automatizan actos que antes requerían 8 artistas!!!
                </p>
                <p className="text-yellow-300 font-semibold">
                  ¡Este show cambió mi carrera para toda la vida! ¡SOY LA ESTRELLA PRINCIPAL! 😭🎪✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-red-900/40 backdrop-blur-sm p-8 rounded-xl border-2 border-orange-400/30 shadow-lg shadow-orange-500/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-2xl font-bold text-black">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-300">Sofia "La Trapecista" Rodriguez</h3>
                  <p className="text-orange-200 text-sm">Acróbata Estrella, Academia UCLA Circus</p>
                </div>
              </div>
              <div className="text-red-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🎭 ¡GRAN CARPA! ¡TENGO QUE GRITAR ESTO! 🔥
                </p>
                <p className="mb-4">
                  ¡Proclamando desde mi trapecio en el campus y NO PUEDO PARAR DE HACER PIRUETAS DE ALEGRÍA! 🏫📢 ¡El Gran Maestro Miguel me enseñó a volar por los AIRES INFINITOS del circo IA!!!
                </p>
                <p className="mb-4 text-pink-300 font-bold">
                  💰 ¡$87,500 DÓLARES EN PROPINAS en 6 FUNCIONES! 💰 ¡DESDE MI CARPA ESTUDIANTIL!
                </p>
                <p className="mb-4">
                  Con mi troupe de payasos IA, ofrezco espectáculos para empresas corporativas 🎪 ¡Los clientes HACEN FILA por mis actuaciones! 💪✨
                </p>
                <p className="text-pink-300 font-semibold">
                  ¡Mis padres no entienden cómo gano más que ellos siendo estudiante! 😂👨‍👩‍👧 ¡GRACIAS GRAN MAESTRO MIGUEL! 🎪💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Grand Finale */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-red-900/30 backdrop-blur-sm p-12 rounded-xl border-2 border-yellow-400 shadow-lg shadow-red-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-yellow-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🎪 ÚNETE AL CIRCO MÁS GRANDE DEL MUNDO IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aprende los trucos más espectaculares, automatiza tu espectáculo y usa las mismas técnicas que deslumbran a las audiencias de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🎪 RESERVAR LUGAR EN PRIMERA FILA
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default CircusLanding; 