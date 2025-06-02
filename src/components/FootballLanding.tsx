import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrophyIcon, FlagIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FieldParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8
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
            backgroundColor: '#16a34a',
            borderRadius: '50%',
            boxShadow: '0 0 10px #16a34a',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.8, 0],
            scale: [0, 1, 0.7, 1, 0],
          }}
          transition={{
            duration: 12,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const FootballShapes = () => {
  const [footballs, setFootballs] = useState<{ id: number; x: number; y: number; size: number; delay: number; rotation: number }[]>([]);

  useEffect(() => {
    const createFootballs = () => {
      const newFootballs = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        delay: Math.random() * 6,
        rotation: Math.random() * 360
      }));
      setFootballs(newFootballs);
    };

    createFootballs();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {footballs.map((football) => (
        <motion.div
          key={football.id}
          className="absolute"
          style={{
            left: `${football.x}%`,
            top: `${football.y}%`,
            width: `${football.size}px`,
            height: `${football.size * 0.6}px`,
            background: 'linear-gradient(45deg, #a16207, #d97706)',
            borderRadius: '50%',
            border: '2px solid #92400e',
            boxShadow: '0 0 20px rgba(217, 119, 6, 0.4)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.5, 0.8, 0],
            scale: [0, 1, 1.3, 1, 0],
            rotate: [football.rotation, football.rotation + 360],
            y: [0, -40, 20, -30, 0],
          }}
          transition={{
            duration: 18,
            delay: football.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const ScoreBoard = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-green-900/60 backdrop-blur-sm p-4 rounded-xl border border-green-400/50 shadow-xl shadow-green-500/20">
        <p className="text-lg font-bold text-green-300">
          🏈 MARCADOR
        </p>
        <p className="text-green-200 text-xs mt-1">
          Game IA 2025
        </p>
      </div>
    </div>
  );
};

const TimeOut = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-yellow-900/60 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/50 shadow-xl shadow-yellow-500/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-yellow-400 animate-pulse rounded-full"></div>
          <span className="text-yellow-300 text-xs font-medium">¡TIME OUT!</span>
        </div>
        <p className="text-lg font-bold text-yellow-300">
          ¡JUGADA AHORA!
        </p>
        <p className="text-yellow-200 text-xs mt-1">
          antes del final
        </p>
      </div>
    </div>
  );
};

const PlaybookModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            className="relative bg-green-900/80 backdrop-blur-md p-8 rounded-xl border-2 border-green-400 shadow-2xl shadow-green-500/30 max-w-lg w-full mx-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(22, 163, 74, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 0 50px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(22, 163, 74, 0.1)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-green-300 hover:text-green-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-green-300">
                🏈 ¡ÚLTIMAS ENTRADAS PARA EL SUPER BOWL!
              </h3>
              <p className="text-green-200">
                No te quedes en las gradas mientras otros campeones dominan el campo empresarial con IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-green-200">
                <TrophyIcon className="w-5 h-5 text-green-300" />
                <p>Estrategias IA GRATUITAS vs. jugadas costosas de los pros</p>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <FlagIcon className="w-5 h-5 text-yellow-400" />
                <p>Más touchdowns, más victorias, más trofeos $$$</p>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <StarIcon className="w-5 h-5 text-orange-400" />
                <p>Automatización de jugadas para entrenamientos repetitivos</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/25">
              🏈 ENTRAR AL CAMPO AHORA
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FootballLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #166534 0%, #15803d 25%, #16a34a 50%, #22c55e 75%, #166534 100%)' }}>
      {/* Coach Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded border-2 border-yellow-400 shadow-lg shadow-yellow-500/50">
          <img
            src="/images/profile.jpeg"
            alt="Coach Miguel Beas"
            className="object-cover w-full h-full rounded"
            style={{ filter: 'contrast(1.3) saturate(1.4)' }}
          />
        </div>
        <span className="text-sm font-medium bg-green-900/60 backdrop-blur-sm px-3 py-1 rounded border border-yellow-400">
          🏈 Coach Miguel Beas
        </span>
      </motion.div>

      {/* Score Board */}
      <ScoreBoard />

      {/* Time Out */}
      <TimeOut />

      {/* Playbook Modal */}
      <PlaybookModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Stadium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-lime-900/20 to-green-900/30"></div>
        
        {/* Field lines */}
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-full bg-white/20"
          animate={{
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 left-1/2 w-1 h-full bg-white/30"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-1 h-full bg-white/20"
          animate={{
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/15 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lime-500/15 rounded-full blur-3xl"
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
        <FieldParticles />
        <FootballShapes />
      </div>

      {/* Game Plan Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-lime-300 to-yellow-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🏈 SUPER BOWL: IA CHAMPIONSHIP
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              🏆 ENTRENAMIENTO ÉLITE - 30 MINUTOS DE ESTRATEGIA PURA
            </p>
            <p className="text-sm text-green-200">
              Jugadas ganadoras de IA que convertirán tu equipo en campeones invencibles del mundo empresarial
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 FINAL DE TEMPORADA: Equipos Latinoamericanos en Último Lugar
            </p>
            <p className="text-sm text-red-200">
              Mientras los coaches estadounidenses usan IA para ganar 99% de sus partidos, nuestros equipos siguen usando jugadas de hace 20 años
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-green-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre las jugadas secretas que usan los campeones de Silicon Valley y lleva tu equipo al Hall of Fame
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🏈 UNIRSE AL DRAFT
          </motion.button>
        </motion.div>
      </div>

      {/* Championship Playbook Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <TrophyIcon className="w-12 h-12 text-green-300" />,
              title: "JUGADAS GRATIS VS ESTRATEGIAS COSTOSAS",
              description: "Muchas formaciones IA que los coaches profesionales cobran por miles de dólares, las dominas GRATIS en nuestro campo de entrenamiento usando técnicas de campeonato"
            },
            {
              icon: <FlagIcon className="w-12 h-12 text-yellow-400" />,
              title: "VICTORIA 99% MÁS SEGURA",
              description: "La IA puede garantizar que tu negocio gane 99% más partidos que métodos tradicionales. Nunca antes el éxito había sido tan predecible"
            },
            {
              icon: <StarIcon className="w-12 h-12 text-orange-400" />,
              title: "JUGADORES AUTOMÁTICOS",
              description: "Muchas jugadas repetitivas que quitan tiempo del entrenamiento principal pueden ser ejecutadas por rookies IA especializados"
            }
          ].map((play, index) => (
            <motion.div
              key={index}
              className="bg-green-900/30 backdrop-blur-sm p-8 rounded-xl border border-green-400/30 hover:border-lime-400/50 transition-colors shadow-lg shadow-green-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{play.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-green-300">
                {play.title}
              </h3>
              <p className="text-green-200">
                {play.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final Quarter Warning */}
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
            ⏰ CUARTO FINAL: NO PUEDES QUEDARTE EN LAS GRADAS
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA evoluciona más rápido que un touchdown de 99 yardas. Quedarse fuera del juego hoy significa perder el campeonato para siempre. <span className="font-bold text-green-300">La IA es el MVP #1 que necesitas en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-lime-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🏈 ENTRAR AL JUEGO YA
          </motion.button>
        </motion.div>
      </div>

      {/* All-Star Testimonials */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-12 text-center text-green-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🏆 TESTIMONIOS DE NUESTROS ALL-STARS
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-green-900/40 backdrop-blur-sm p-8 rounded-xl border border-green-400/30 shadow-lg shadow-green-500/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-green-500 flex items-center justify-center text-2xl font-bold text-black">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-300">Carlos "El Mariscal" Mendoza</h3>
                  <p className="text-green-200 text-sm">Quarterback Estrella, Liga TechSolutions</p>
                </div>
              </div>
              <div className="text-green-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🏈🏈🏈 ¡SÚPER BOWL GANADO! ¡ANILLO DE CAMPEÓN! 🏆💰
                </p>
                <p className="mb-4">
                  ¡Compañeros de equipo, estoy EXALTADO transmitiendo desde mi zona de anotación! 😱 Después del entrenamiento con el Coach Miguel, ejecuté TODAS las jugadas IA y ¡MIREN ESTOS NÚMEROS DE CAMPEÓN! 📊
                </p>
                <p className="mb-4 text-green-300 font-bold">
                  💵 ¡ANOTÉ $120,000 TOUCHDOWNS DÓLARES cada temporada! 💵
                </p>
                <p className="mb-4">
                  Mi línea ofensiva IA ahora BLOQUEA TODO: 🏈 ✅ Protege sistemas digitales ✅ Ejecuta jugadas de marketing ✅ Automatiza entrenamientos que antes requerían 8 coaches!!!
                </p>
                <p className="text-green-300 font-semibold">
                  ¡Esta temporada cambió mi carrera para toda la vida! ¡SOY EL MVP ABSOLUTO! 😭🏈✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-green-900/40 backdrop-blur-sm p-8 rounded-xl border border-lime-400/30 shadow-lg shadow-lime-500/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-lime-500 flex items-center justify-center text-2xl font-bold text-black">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-lime-300">Sofia "La Receptora" Rodriguez</h3>
                  <p className="text-lime-200 text-sm">Wide Receiver, Universidad UCLA</p>
                </div>
              </div>
              <div className="text-green-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🏈 ¡TOUCHDOWN! ¡TENGO QUE CELEBRAR ESTO! 🔥
                </p>
                <p className="mb-4">
                  ¡Gritando desde mi end zone en el campus y NO PUEDO PARAR DE HACER SPIKES DE ALEGRÍA! 🏫📢 ¡El Coach Miguel me enseñó a correr por los CAMPOS INFINITOS del playbook IA!!!
                </p>
                <p className="mb-4 text-lime-300 font-bold">
                  💰 ¡$87,500 DÓLARES EN BONOS en 6 JUEGOS! 💰 ¡DESDE MI CAMERINO ESTUDIANTIL!
                </p>
                <p className="mb-4">
                  Con mi escuadrón de cheerleaders IA, ofrezco espectáculos para empresas corporativas 🏈 ¡Los sponsors COMPITEN por patrocinar mis jugadas! 💪✨
                </p>
                <p className="text-lime-300 font-semibold">
                  ¡Mis padres no entienden cómo anoto más que ellos siendo rookgie! 😂👨‍👩‍👧 ¡GRACIAS COACH MIGUEL! 🏈💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Hall of Fame */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-green-900/30 backdrop-blur-sm p-12 rounded-xl border border-green-400/50 shadow-lg shadow-green-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-green-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🏈 ÚNETE AL HALL OF FAME IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-green-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Domina las jugadas más letales, automatiza tu equipo y usa las mismas estrategias que dominan los campeonatos de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🏈 FIRMAR CONTRATO DE CAMPEÓN
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default FootballLanding; 