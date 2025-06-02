import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoltIcon, FireIcon, TrophyIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SpeedParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 3
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
          }}
          initial={{ opacity: 0, scale: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, 100, 200],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const RacingStripes = () => {
  const [stripes, setStripes] = useState<{ id: number; x: number; y: number; width: number; delay: number }[]>([]);

  useEffect(() => {
    const createStripes = () => {
      const newStripes = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 150 + 50,
        delay: Math.random() * 2
      }));
      setStripes(newStripes);
    };

    createStripes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {stripes.map((stripe) => (
        <motion.div
          key={stripe.id}
          className="absolute"
          style={{
            left: `${stripe.x}%`,
            top: `${stripe.y}%`,
            width: `${stripe.width}px`,
            height: '4px',
            backgroundColor: '#ffffff',
            transform: 'rotate(15deg)',
          }}
          initial={{ opacity: 0, x: -200 }}
          animate={{
            opacity: [0, 0.7, 0],
            x: [-200, 0, 200],
          }}
          transition={{
            duration: 3,
            delay: stripe.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const SpeedGauge = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border-2 border-red-500 shadow-xl">
        <p className="text-lg font-bold text-red-400">
          🏁 VELOCIDAD MÁXIMA
        </p>
        <p className="text-white text-xs mt-1">
          IA 2025 Turbo
        </p>
      </div>
    </div>
  );
};

const RacingAlert = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border-2 border-yellow-400 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-yellow-400 animate-pulse rounded-full"></div>
          <span className="text-yellow-400 text-xs font-medium">BANDERA AMARILLA</span>
        </div>
        <p className="text-lg font-bold text-yellow-400">
          ¡ACELERA YA!
        </p>
        <p className="text-white text-xs mt-1">
          antes que termine la carrera
        </p>
      </div>
    </div>
  );
};

const PitStopModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            className="relative bg-gray-900 backdrop-blur-md p-8 rounded-lg border-4 border-red-500 shadow-2xl max-w-lg w-full mx-4"
            style={{
              background: 'linear-gradient(45deg, #000000 25%, #dc2626 25%, #dc2626 50%, #000000 50%, #000000 75%, #dc2626 75%, #dc2626)',
              backgroundSize: '20px 20px'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="absolute inset-4 bg-black/90 rounded">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-red-400 hover:text-red-200 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-6 p-4">
                <h3 className="text-2xl font-bold mb-2 text-red-400">
                  🏁 ¡ÚLTIMAS VUELTAS DISPONIBLES!
                </h3>
                <p className="text-white">
                  No dejes que tu negocio se quede en boxes mientras otros cruzan la meta
                </p>
              </div>

              <div className="space-y-4 mb-6 px-4">
                <div className="flex items-center gap-3 text-white">
                  <BoltIcon className="w-5 h-5 text-yellow-400" />
                  <p>Combustible IA GRATIS vs. competencia premium</p>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <FireIcon className="w-5 h-5 text-red-400" />
                  <p>Más vueltas, más trofeos, más victorias $$$</p>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <TrophyIcon className="w-5 h-5 text-yellow-400" />
                  <p>Piloto automático IA para carreras rutinarias</p>
                </div>
              </div>

              <div className="px-4 pb-4">
                <button className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105">
                  🏁 ENTRAR EN PISTA AHORA
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RacecarLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-hidden relative bg-black">
      {/* Driver Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded-full border-4 border-red-500 shadow-lg">
          <img
            src="/images/profile.jpeg"
            alt="Piloto Miguel Beas"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <span className="text-sm font-medium bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border-2 border-red-500">
          🏁 Piloto Miguel Beas
        </span>
      </motion.div>

      {/* Speed Gauge */}
      <SpeedGauge />

      {/* Racing Alert */}
      <RacingAlert />

      {/* Pit Stop Modal */}
      <PitStopModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Racing Track Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20"></div>
        
        {/* Checkered flag pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: 'repeating-conic-gradient(from 0deg, #ffffff 0deg 90deg, #000000 90deg 180deg)',
            backgroundSize: '50px 50px'
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <SpeedParticles />
        <RacingStripes />
      </div>

      {/* Starting Line Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-yellow-400 to-red-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🏁 GRAN PREMIO: IA SPEED
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border-2 border-green-500 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              🏎️ VUELTA DE ENTRENAMIENTO - 30 MINUTOS EN PISTA
            </p>
            <p className="text-sm text-green-200">
              Técnicas de alta velocidad IA que todo piloto necesita para dominar el circuito empresarial
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border-2 border-red-500 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 BANDERA ROJA: Pilotos Latinoamericanos Perdiendo la Carrera
            </p>
            <p className="text-sm text-red-200">
              Mientras equipos estadounidenses usan IA turbo reduciendo tiempos en 99%, nuestros conductores siguen con motores obsoletos
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aprende las estrategias de carrera que usan los campeones de Silicon Valley y cruza la meta en primer lugar
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🏁 SUBIR AL PODIO AHORA
          </motion.button>
        </motion.div>
      </div>

      {/* Garage Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <BoltIcon className="w-12 h-12 text-yellow-400" />,
              title: "COMBUSTIBLE GRATIS VS PREMIUM COSTOSO",
              description: "Muchas mejoras IA que la competencia vende por miles de dólares, las obtienes GRATIS usando técnicas de tuning que enseñamos en nuestro garage"
            },
            {
              icon: <FireIcon className="w-12 h-12 text-red-400" />,
              title: "MOTOR IA 99% MÁS POTENTE",
              description: "La IA puede construir tu vehículo empresarial 99% más barato que métodos tradicionales. Nunca antes la velocidad había sido tan accesible"
            },
            {
              icon: <TrophyIcon className="w-12 h-12 text-yellow-400" />,
              title: "PILOTO AUTOMÁTICO PARA RUTINAS",
              description: "Muchas vueltas repetitivas que te quitan tiempo del circuito principal pueden ser manejadas por tu copiloto IA"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border-2 border-red-500 hover:border-yellow-400 transition-colors shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-red-400">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Red Flag Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-red-900/30 backdrop-blur-sm p-12 rounded-lg border-2 border-red-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-red-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🚩 BANDERA ROJA: NO PUEDES ABANDONAR LA CARRERA
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA acelera más rápido que un Fórmula 1. Quedarte en boxes hoy significa nunca alcanzar a los líderes. <span className="font-bold text-yellow-400">La IA es el turbo #1 que necesitas en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🏁 ENTRAR A PISTA INMEDIATAMENTE
          </motion.button>
        </motion.div>
      </div>

      {/* Victory Stories */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-12 text-center text-yellow-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🏆 HISTORIAS DE VICTORIA DE NUESTROS CAMPEONES
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-black/60 backdrop-blur-sm p-8 rounded-lg border-2 border-yellow-500 shadow-lg"
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
                  <h3 className="text-xl font-bold text-yellow-400">Carlos "Speed" Mendoza</h3>
                  <p className="text-yellow-300 text-sm">Campeón, TechSolutions Racing Team</p>
                </div>
              </div>
              <div className="text-white leading-relaxed">
                <p className="text-lg mb-4">
                  🏆🏆🏆 ¡VICTORIA ÉPICA! ¡CRUZÉ LA META PRIMERO! 🏁💰
                </p>
                <p className="mb-4">
                  ¡Pilotos, estoy EUFÓRICO reportando desde el podio! 😱 Después del entrenamiento con el Campeón Miguel, implementé TODAS las técnicas de velocidad IA y ¡MIREN ESTOS TIEMPOS RÉCORD! 📊
                </p>
                <p className="mb-4 text-yellow-300 font-bold">
                  💵 ¡ADELANTÉ A LA COMPETENCIA ahorrando $120,000 DÓLARES AL MES! 💵
                </p>
                <p className="mb-4">
                  Mi equipo IA ahora DOMINA CADA VUELTA: 🏎️ ✅ Desarrolla mi monoplaza digital ✅ Ejecuta estrategias de carrera ✅ Maneja pit-stops que antes requerían 8 mecánicos!!!
                </p>
                <p className="text-yellow-300 font-semibold">
                  ¡Esta carrera cambió mi destino para siempre! ¡SOY EL NUEVO CAMPEÓN! 😭🏆✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-black/60 backdrop-blur-sm p-8 rounded-lg border-2 border-red-500 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-2xl font-bold text-white">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-400">Sofia "Turbo" Rodriguez</h3>
                  <p className="text-red-300 text-sm">Rookie del Año, UCLA Racing Academy</p>
                </div>
              </div>
              <div className="text-white leading-relaxed">
                <p className="text-lg mb-4">
                  🏁 ¡ESCUADRA! ¡TENGO QUE CONTARLES MI VICTORIA! 🔥
                </p>
                <p className="mb-4">
                  ¡Reportando desde mi garaje en el campus y NO PUEDO PARAR DE CELEBRAR! 🏫📢 ¡El Campeón Miguel me enseñó a ser IMPARABLE en el circuito!!!
                </p>
                <p className="mb-4 text-red-300 font-bold">
                  💰 ¡$87,500 DÓLARES en premios en 6 MESES! 💰 ¡DESDE MI TALLER ESTUDIANTIL!
                </p>
                <p className="mb-4">
                  Con mi equipo de mecánicos IA, ofrezco servicios de tuning para empresas 🏎️ ¡Los sponsors SE PELEAN por patrocinarme! 💪✨
                </p>
                <p className="text-red-300 font-semibold">
                  ¡Mis padres no entienden cómo gano más que ellos siendo novata! 😂👨‍👩‍👧 ¡GRACIAS CAMPEÓN MIGUEL! 🏁💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Championship Trophy */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-black/50 backdrop-blur-sm p-12 rounded-lg border-2 border-yellow-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-yellow-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🏆 GANA EL CAMPEONATO IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Entrena con técnicas profesionales, automatiza tu pit-crew y usa las mismas tecnologías que dominan los campeones de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🏁 RESERVAR MI LUGAR EN EL PODIO
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default RacecarLanding; 