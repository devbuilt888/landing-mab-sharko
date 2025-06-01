import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RocketLaunchIcon, BeakerIcon, GlobeAltIcon, XMarkIcon } from '@heroicons/react/24/outline';

const StarField = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; opacity: number }[]>([]);

  useEffect(() => {
    const createStars = () => {
      const newStars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.8 + 0.2
      }));
      setStars(newStars);
    };

    createStars();
  }, []);

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#00d4ff',
            borderRadius: '50%',
            position: 'absolute',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, star.opacity, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const SpaceDebris = () => {
  const [debris, setDebris] = useState<{ id: number; x: number; y: number; size: number; delay: number; rotation: number }[]>([]);

  useEffect(() => {
    const createDebris = () => {
      const newDebris = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 4,
        rotation: Math.random() * 360
      }));
      setDebris(newDebris);
    };

    createDebris();
  }, []);

  return (
    <>
      {debris.map((piece) => (
        <motion.div
          key={piece.id}
          className="space-debris"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
            transform: `rotate(${piece.rotation}deg)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.3, 0.7, 0],
            scale: [0, 1.2, 0.8, 1.2, 0],
            rotate: [piece.rotation, piece.rotation + 180, piece.rotation + 360],
          }}
          transition={{
            duration: 15,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
};

const MissionControl = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-blue-900/60 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/50 shadow-xl shadow-cyan-500/20">
        <p className="text-lg font-bold text-cyan-300">
          🚀 CONTROL DE MISIÓN
        </p>
        <p className="text-blue-200 text-xs mt-1">
          Expedición IA 2025
        </p>
      </div>
    </div>
  );
};

const RedAlert = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-red-900/60 backdrop-blur-sm p-4 rounded-xl border border-red-500/50 shadow-xl shadow-red-500/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full"></div>
          <span className="text-red-300 text-xs font-medium">ALERTA CÓSMICA</span>
        </div>
        <p className="text-lg font-bold text-red-300">
          ¡DESPEGAR AHORA!
        </p>
        <p className="text-red-200 text-xs mt-1">
          antes del lanzamiento
        </p>
      </div>
    </div>
  );
};

const CockpitModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-blue-900/80 backdrop-blur-md p-8 rounded-xl border-2 border-cyan-500 shadow-2xl shadow-cyan-500/30 max-w-lg w-full mx-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-cyan-300">
                🚀 ¡ÚLTIMAS PLAZAS EN LA NAVE!
              </h3>
              <p className="text-blue-200">
                No permitas que tu empresa se quede en la Tierra mientras otros exploran nuevas galaxias
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-blue-200">
                <RocketLaunchIcon className="w-5 h-5 text-cyan-400" />
                <p>Combustible IA GRATUITO para tu nave vs. tecnología costosa terrestre</p>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <BeakerIcon className="w-5 h-5 text-purple-400" />
                <p>Más planetas, más recursos, más colonias $$$</p>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <GlobeAltIcon className="w-5 h-5 text-green-400" />
                <p>Piloto automático IA para viajes rutinarios entre galaxias</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25">
              🚀 ABORDAR NAVE AHORA
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SpaceshipLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-hidden relative" style={{ background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 70%, #000000 100%)' }}>
      {/* Commander Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded-full border-2 border-cyan-500 shadow-lg shadow-cyan-500/50">
          <img
            src="/images/profile.jpeg"
            alt="Comandante Miguel Beas"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <span className="text-sm font-medium bg-blue-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-500">
          🚀 Comandante Miguel Beas
        </span>
      </motion.div>

      {/* Mission Control */}
      <MissionControl />

      {/* Red Alert */}
      <RedAlert />

      {/* Cockpit Modal */}
      <CockpitModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30"></div>
        
        {/* Nebula effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.4, 1, 1.4],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <StarField />
        <SpaceDebris />
      </div>

      {/* Launch Pad Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🚀 EXPEDICIÓN: IA CÓSMICA
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              🛸 TRANSMISIÓN ESPECIAL - 30 MINUTOS DE DURACIÓN
            </p>
            <p className="text-sm text-green-200">
              Tecnologías de exploración IA que todo comandante necesita para colonizar galaxias empresariales
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              ⚠️ ALERTA CÓSMICA: Exploradores Latinoamericanos Perdidos en el Espacio
            </p>
            <p className="text-sm text-red-200">
              Mientras flotas estadounidenses usan IA hiperespacial reduciendo tiempo de viaje en 99%, nuestras naves siguen con propulsión obsoleta
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre las tecnologías de navegación que usan los comandantes de Silicon Valley y conquista nuevos sistemas solares
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🚀 UNIRSE A LA EXPEDICIÓN
          </motion.button>
        </motion.div>
      </div>

      {/* Space Station Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <RocketLaunchIcon className="w-12 h-12 text-cyan-400" />,
              title: "COMBUSTIBLE GRATIS VS PREMIUM CÓSMICO",
              description: "Muchas tecnologías IA que los alienígenas venden por miles de créditos galácticos, las obtienes GRATIS usando protocolos de navegación que enseñamos en nuestra estación espacial"
            },
            {
              icon: <BeakerIcon className="w-12 h-12 text-purple-400" />,
              title: "TECNOLOGÍA ALIENÍGENA 99% MÁS AVANZADA",
              description: "La IA puede construir tu nave interestelar 99% más barata que métodos terrestres. Nunca antes la exploración había sido tan accesible"
            },
            {
              icon: <GlobeAltIcon className="w-12 h-12 text-green-400" />,
              title: "AUTOPILOTO PARA MISIONES RUTINARIAS",
              description: "Muchos viajes repetitivos que te quitan tiempo de la exploración principal pueden ser manejados por tu IA de a bordo"
            }
          ].map((tech, index) => (
            <motion.div
              key={index}
              className="bg-blue-900/30 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30 hover:border-purple-500/50 transition-colors shadow-lg shadow-cyan-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{tech.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-cyan-300">
                {tech.title}
              </h3>
              <p className="text-blue-200">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Black Hole Alert Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-red-900/30 backdrop-blur-sm p-12 rounded-xl border border-red-500/50 shadow-lg shadow-red-500/20"
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
            ⚠️ AGUJERO NEGRO: NO PUEDES QUEDARTE EN EL ESPACIO
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA avanza más rápido que la velocidad de la luz. Quedarte en órbita hoy significa ser absorbido por la obsolescencia para siempre. <span className="font-bold text-cyan-300">La IA es el combustible hiperespacial #1 que necesitas en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🚀 DESPEGAR INMEDIATAMENTE
          </motion.button>
        </motion.div>
      </div>

      {/* Mission Reports */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-12 text-center text-cyan-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🛸 REPORTES DE MISIÓN DE NUESTROS EXPLORADORES
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-blue-900/40 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-2xl font-bold text-black">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300">Capitán Carlos Mendoza</h3>
                  <p className="text-cyan-200 text-sm">Comandante, Flota TechSolutions</p>
                </div>
              </div>
              <div className="text-blue-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🛸🛸🛸 ¡MISIÓN EXITOSA! ¡NUEVA GALAXIA CONQUISTADA! 🚀💰
                </p>
                <p className="mb-4">
                  ¡Tripulación, estoy EXTASIADO reportando desde mi nave madre! 😱 Después del entrenamiento con el Comandante Miguel, implementé TODAS las tecnologías IA y ¡MIREN ESTOS HALLAZGOS CÓSMICOS! 📊
                </p>
                <p className="mb-4 text-cyan-300 font-bold">
                  💵 ¡COLONICÉ NUEVOS PLANETAS ahorrando $120,000 CRÉDITOS AL MES! 💵
                </p>
                <p className="mb-4">
                  Mi flota IA ahora DOMINA CADA SISTEMA SOLAR: 🛸 ✅ Desarrolla naves autónomas ✅ Ejecuta misiones de exploración ✅ Maneja operaciones que antes requerían 8 astronautas!!!
                </p>
                <p className="text-cyan-300 font-semibold">
                  ¡Esta expedición cambió el curso de mi civilización! ¡NUEVA ERA DORADA! 😭🛸✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-blue-900/40 backdrop-blur-sm p-8 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-300">Teniente Sofia Rodriguez</h3>
                  <p className="text-purple-200 text-sm">Cadete Estelar, Academia UCLA</p>
                </div>
              </div>
              <div className="text-blue-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🚀 ¡BASE ESPACIAL! ¡TENGO QUE TRANSMITIR ESTO! 🔥
                </p>
                <p className="mb-4">
                  ¡Reportando desde mi estación orbital en el campus y NO PUEDO CONTENER LA EMOCIÓN! 🏫📢 ¡El Comandante Miguel me enseñó a navegar las DIMENSIONES INFINITAS del universo IA!!!
                </p>
                <p className="mb-4 text-purple-300 font-bold">
                  💰 ¡$87,500 CRÉDITOS GALÁCTICOS en 6 MESES! 💰 ¡DESDE MI LABORATORIO ESTUDIANTIL!
                </p>
                <p className="mb-4">
                  Con mi equipo de androides IA, ofrezco servicios de terraformación para empresas 🛸 ¡Las corporaciones LUCHAN por contratar mi flota! 💪✨
                </p>
                <p className="text-purple-300 font-semibold">
                  ¡Mis padres no entienden cómo gano más que ellos siendo cadete espacial! 😂👨‍👩‍👧 ¡GRACIAS COMANDANTE MIGUEL! 🚀💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Galaxy Command */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-blue-900/30 backdrop-blur-sm p-12 rounded-xl border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-cyan-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🛸 CONQUISTA LA GALAXIA IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Entrénate en protocolos intergalácticos, automatiza tu tripulación y usa las mismas tecnologías que dominan los comandantes de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🚀 RESERVAR LUGAR EN LA NAVE
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default SpaceshipLanding; 