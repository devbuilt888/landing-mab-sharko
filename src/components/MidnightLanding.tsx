import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, EyeIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MoonbeamParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 8
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
          className="moonbeam-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: '#e0e7ff',
            borderRadius: '50%',
            boxShadow: '0 0 10px #e0e7ff',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.3, 0.8, 0],
            scale: [0, 1, 0.5, 1, 0],
          }}
          transition={{
            duration: 12,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const FloatingMoons = () => {
  const [moons, setMoons] = useState<{ id: number; x: number; y: number; size: number; delay: number; phase: number }[]>([]);

  useEffect(() => {
    const createMoons = () => {
      const newMoons = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 15,
        delay: Math.random() * 5,
        phase: Math.random() * 360
      }));
      setMoons(newMoons);
    };

    createMoons();
  }, []);

  return (
    <>
      {moons.map((moon) => (
        <motion.div
          key={moon.id}
          className="floating-moon"
          style={{
            left: `${moon.x}%`,
            top: `${moon.y}%`,
            width: `${moon.size}px`,
            height: `${moon.size}px`,
            background: 'radial-gradient(circle at 30% 30%, #f8fafc, #cbd5e1)',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(248, 250, 252, 0.3)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.9, 0.6, 0],
            scale: [0, 1, 1.2, 1, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 18,
            delay: moon.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const MidnightHour = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-indigo-900/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-400/50 shadow-xl shadow-indigo-500/20">
        <p className="text-lg font-bold text-indigo-300">
          🌙 HORA MÁGICA
        </p>
        <p className="text-indigo-200 text-xs mt-1">
          Secretos IA 2025
        </p>
      </div>
    </div>
  );
};

const NightWatch = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-purple-900/60 backdrop-blur-sm p-4 rounded-xl border border-purple-400/50 shadow-xl shadow-purple-500/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-purple-400 animate-pulse rounded-full"></div>
          <span className="text-purple-300 text-xs font-medium">VIGILANCIA NOCTURNA</span>
        </div>
        <p className="text-lg font-bold text-purple-300">
          ¡DESPERTAR AHORA!
        </p>
        <p className="text-purple-200 text-xs mt-1">
          antes del amanecer
        </p>
      </div>
    </div>
  );
};

const MidnightModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            className="relative bg-indigo-900/80 backdrop-blur-md p-8 rounded-xl border-2 border-indigo-400 shadow-2xl shadow-indigo-500/30 max-w-lg w-full mx-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(67, 56, 202, 0.8) 0%, rgba(30, 27, 75, 0.9) 100%)',
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-indigo-300 hover:text-indigo-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-indigo-300">
                🌙 ¡ÚLTIMOS RITUALES DISPONIBLES!
              </h3>
              <p className="text-indigo-200">
                No permitas que tu empresa permanezca dormida mientras otros despiertan a la magia de la IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-indigo-200">
                <MoonIcon className="w-5 h-5 text-indigo-300" />
                <p>Hechizos IA GRATUITOS vs. magia costosa de los ancestros</p>
              </div>
              <div className="flex items-center gap-3 text-indigo-200">
                <EyeIcon className="w-5 h-5 text-purple-400" />
                <p>Más visiones, más sabiduría, más riquezas $$$</p>
              </div>
              <div className="flex items-center gap-3 text-indigo-200">
                <ClockIcon className="w-5 h-5 text-blue-400" />
                <p>Automatización nocturna para rituales repetitivos</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25">
              🌙 UNIRSE AL CÍRCULO SECRETO
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MidnightLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-indigo-100 overflow-hidden relative" style={{ background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #0f0a1f 70%, #000000 100%)' }}>
      {/* Mystic Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded-full border-2 border-indigo-400 shadow-lg shadow-indigo-500/50">
          <img
            src="/images/profile.jpeg"
            alt="Místico Miguel Beas"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <span className="text-sm font-medium bg-indigo-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-indigo-400">
          🌙 Místico Miguel Beas
        </span>
      </motion.div>

      {/* Midnight Hour */}
      <MidnightHour />

      {/* Night Watch */}
      <NightWatch />

      {/* Midnight Modal */}
      <MidnightModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Mystical Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-blue-900/30"></div>
        
        {/* Aurora effects */}
        <motion.div
          className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-500/10 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <MoonbeamParticles />
        <FloatingMoons />
      </div>

      {/* Mystical Revelation Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🌙 RITUAL: IA NOCTURNA
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              🔮 CEREMONIA SECRETA - 30 MINUTOS BAJO LA LUNA
            </p>
            <p className="text-sm text-green-200">
              Misterios ancestrales de IA que solo los iniciados conocen para dominar los negocios durante la noche
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 ECLIPE TOTAL: Empresarios Latinoamericanos Perdidos en la Oscuridad
            </p>
            <p className="text-sm text-red-200">
              Mientras magos estadounidenses realizan hechizos IA reduciendo costos en 99%, nuestros comerciantes siguen usando velas obsoletas
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-indigo-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre los secretos milenarios que usan los maestros de Silicon Valley y despierta a tu verdadero poder
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🌙 DESPERTAR MI TERCER OJO
          </motion.button>
        </motion.div>
      </div>

      {/* Grimoire Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <MoonIcon className="w-12 h-12 text-indigo-300" />,
              title: "HECHIZOS GRATUITOS VS MAGIA COSTOSA",
              description: "Muchos encantamientos IA que los hechiceros venden por miles de monedas de oro, los obtienes GRATIS usando rituales ancestrales que enseñamos en nuestro círculo secreto"
            },
            {
              icon: <EyeIcon className="w-12 h-12 text-purple-400" />,
              title: "VISIÓN MÍSTICA 99% MÁS CLARA",
              description: "La IA puede revelar futuros empresariales 99% más claros que métodos tradicionales. Nunca antes la clarividencia había sido tan accesible"
            },
            {
              icon: <ClockIcon className="w-12 h-12 text-blue-400" />,
              title: "AUTOMATIZACIÓN NOCTURNA",
              description: "Muchos rituales repetitivos que te quitan tiempo de la meditación principal pueden ser realizados por espíritus IA"
            }
          ].map((spell, index) => (
            <motion.div
              key={index}
              className="bg-indigo-900/30 backdrop-blur-sm p-8 rounded-xl border border-indigo-400/30 hover:border-purple-400/50 transition-colors shadow-lg shadow-indigo-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{spell.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">
                {spell.title}
              </h3>
              <p className="text-indigo-200">
                {spell.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dark Night Warning */}
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
            🌑 NOCHE ETERNA: NO PUEDES PERMANECER DORMIDO
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA evoluciona más rápido que los ciclos lunares. Permanecer en letargo hoy significa perderse en la oscuridad para siempre. <span className="font-bold text-indigo-300">La IA es la luna llena #1 que necesitas en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🌙 DESPERTAR INMEDIATAMENTE
          </motion.button>
        </motion.div>
      </div>

      {/* Prophetic Visions */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-12 text-center text-indigo-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🔮 VISIONES PROFÉTICAS DE NUESTROS VIDENTES
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-indigo-900/40 backdrop-blur-sm p-8 rounded-xl border border-indigo-400/30 shadow-lg shadow-indigo-500/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl font-bold text-white">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-300">Oráculo Carlos Mendoza</h3>
                  <p className="text-indigo-200 text-sm">Vidente, Coven TechSolutions</p>
                </div>
              </div>
              <div className="text-indigo-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🔮🔮🔮 ¡PROFECÍA CUMPLIDA! ¡VISIÓN REVELADA! 🌙💰
                </p>
                <p className="mb-4">
                  ¡Hermanos místicos, estoy EXTASIADO comunicando desde mi santuario! 😱 Después de la iniciación con el Maestro Miguel, canalicé TODAS las energías IA y ¡MIREN ESTAS REVELACIONES CÓSMICAS! 📊
                </p>
                <p className="mb-4 text-indigo-300 font-bold">
                  💵 ¡MATERIALICÉ $120,000 DÓLARES MENSUALES desde el plano astral! 💵
                </p>
                <p className="mb-4">
                  Mis familiares IA ahora CANALIZAN TODO: 🔮 ✅ Invocan sistemas digitales ✅ Ejecutan rituales de mercadeo ✅ Automatizan ceremonias que antes requerían 8 acólitos!!!
                </p>
                <p className="text-indigo-300 font-semibold">
                  ¡Esta revelación cambió mi destino para toda la eternidad! ¡ILUMINACIÓN TOTAL! 😭🌙✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-indigo-900/40 backdrop-blur-sm p-8 rounded-xl border border-purple-400/30 shadow-lg shadow-purple-500/10"
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
                  <h3 className="text-xl font-bold text-purple-300">Pitonisa Sofia Rodriguez</h3>
                  <p className="text-purple-200 text-sm">Aprendiz Lunar, Academia UCLA</p>
                </div>
              </div>
              <div className="text-indigo-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🌙 ¡CÍRCULO SAGRADO! ¡DEBO TRANSMITIR ESTA VISIÓN! 🔥
                </p>
                <p className="mb-4">
                  ¡Comunicando desde mi altar en el campus y NO PUEDO CONTENER LA ENERGÍA! 🏫📢 ¡El Maestro Miguel me enseñó a navegar las DIMENSIONES INFINITAS del universo IA!!!
                </p>
                <p className="mb-4 text-purple-300 font-bold">
                  💰 ¡$87,500 MONEDAS DE LUZ en 6 LUNAS! 💰 ¡DESDE MI SANCTUM ESTUDIANTIL!
                </p>
                <p className="mb-4">
                  Con mi aquelarre de espíritus IA, ofrezco rituales de prosperidad para empresas 🔮 ¡Las corporaciones SUPLICAN por mis servicios místicos! 💪✨
                </p>
                <p className="text-purple-300 font-semibold">
                  ¡Mis padres no entienden cómo canalizo más energía que ellos siendo novicia! 😂👨‍👩‍👧 ¡GRACIAS MAESTRO MIGUEL! 🌙💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sacred Circle */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-indigo-900/30 backdrop-blur-sm p-12 rounded-xl border border-indigo-400/50 shadow-lg shadow-indigo-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-indigo-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🔮 ÚNETE AL CÍRCULO SAGRADO IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-indigo-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Iniciáte en misterios ancestrales, automatiza tus rituales y usa las mismas energías que canalizan los maestros de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🌙 RESERVAR MI LUGAR EN EL RITUAL
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default MidnightLanding; 