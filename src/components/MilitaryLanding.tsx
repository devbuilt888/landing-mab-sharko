import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheckIcon, CommandLineIcon, BoltIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MilitaryParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
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
          className="military-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: '#4a5d23',
            borderRadius: '2px',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: 6,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const TacticalShapes = () => {
  const [shapes, setShapes] = useState<{ id: number; x: number; y: number; size: number; delay: number; rotation: number }[]>([]);

  useEffect(() => {
    const createShapes = () => {
      const newShapes = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 25 + 20,
        delay: Math.random() * 3,
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
          className="tactical-shape"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.6, 0],
            scale: [0, 1.1, 0.9, 1.1, 0],
            rotate: [shape.rotation, shape.rotation + 120, shape.rotation + 240],
          }}
          transition={{
            duration: 12,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const MissionText = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-green-900/40 backdrop-blur-sm p-4 rounded border border-green-600/50 shadow-xl">
        <p className="text-lg font-bold text-green-300">
          🎖️ MISIÓN CRÍTICA
        </p>
        <p className="text-green-200 text-xs mt-1">
          Operación IA 2025
        </p>
      </div>
    </div>
  );
};

const UrgentCommand = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-red-900/40 backdrop-blur-sm p-4 rounded border border-red-600/50 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-red-500 animate-pulse"></div>
          <span className="text-red-300 text-xs font-medium">ESTADO DE ALERTA</span>
        </div>
        <p className="text-lg font-bold text-red-300">
          ¡ALISTAR AHORA!
        </p>
        <p className="text-red-200 text-xs mt-1">
          antes del despliegue
        </p>
      </div>
    </div>
  );
};

const CommandModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-green-900/90 backdrop-blur-md p-8 rounded border-2 border-green-600 shadow-2xl max-w-lg w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-green-400 hover:text-green-200 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-green-300">
                🎖️ ¡ÚLTIMAS PLAZAS DISPONIBLES!
              </h3>
              <p className="text-green-200">
                No permitas que tu empresa quede fuera de combate en la guerra de la IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-green-200">
                <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                <p>Armamento IA GRATUITO contra la competencia costosa</p>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <CommandLineIcon className="w-5 h-5 text-yellow-400" />
                <p>Más soldados, más territorio, más victorias $$$</p>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <BoltIcon className="w-5 h-5 text-red-400" />
                <p>Automatiza las operaciones de rutina y enfócate en estrategia</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105">
              🎖️ CONFIRMAR RECLUTAMIENTO
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MilitaryLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-green-100 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1a2e05 0%, #2d4a0a 50%, #1a2e05 100%)' }}>
      {/* Command Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded border-2 border-green-600 shadow-lg">
          <img
            src="/images/profile.jpeg"
            alt="General Miguel Beas"
            className="object-cover w-full h-full rounded"
          />
        </div>
        <span className="text-sm font-medium bg-green-900/60 backdrop-blur-sm px-3 py-1 rounded border border-green-600">
          🎖️ General Miguel Beas
        </span>
      </motion.div>

      {/* Mission Text */}
      <MissionText />

      {/* Urgent Command */}
      <UrgentCommand />

      {/* Command Modal */}
      <CommandModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Tactical Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-yellow-900/10 to-green-900/20"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <MilitaryParticles />
        <TacticalShapes />
      </div>

      {/* Mission Briefing Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 text-green-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🎖️ OPERACIÓN: IA TÁCTICA
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border border-green-600/50 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              🚁 BRIEFING OPERACIONAL - 30 MINUTOS DE DURACIÓN
            </p>
            <p className="text-sm text-green-200">
              Estrategias de combate IA que todo comandante necesita para dominar el campo de batalla empresarial
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-600/50 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 ALERTA ROJA: Empresarios Latinoamericanos Bajo Fuego Enemigo
            </p>
            <p className="text-sm text-red-200">
              Mientras fuerzas estadounidenses despliegan IA automatizada reduciendo costos en 99%, nuestras tropas siguen con armamento obsoleto
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-green-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre las tácticas de guerra empresarial que usan los comandantes de Silicon Valley y prepárate para la victoria
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🎖️ REPORTARSE PARA EL SERVICIO
          </motion.button>
        </motion.div>
      </div>

      {/* Arsenal Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <ShieldCheckIcon className="w-12 h-12 text-green-400" />,
              title: "ARMAMENTO GRATUITO VS ARSENAL COSTOSO",
              description: "Muchas armas IA que el enemigo vende por miles de dólares, las obtienes GRATIS usando tácticas de prompting de elite que enseñamos a nuestros soldados"
            },
            {
              icon: <CommandLineIcon className="w-12 h-12 text-yellow-400" />,
              title: "TECNOLOGÍA MILITAR 99% MÁS ECONÓMICA",
              description: "La IA puede construir sistemas de comando 99% más baratos que las rutas tradicionales. Nunca antes el armamento había sido tan accesible"
            },
            {
              icon: <BoltIcon className="w-12 h-12 text-red-400" />,
              title: "AUTOMATIZACIÓN DE OPERACIONES",
              description: "Muchas misiones repetitivas que quitan tiempo a la estrategia principal pueden ser automatizadas por soldados IA"
            }
          ].map((weapon, index) => (
            <motion.div
              key={index}
              className="bg-green-900/30 backdrop-blur-sm p-8 rounded border border-green-600/50 hover:border-yellow-500/70 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{weapon.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-green-300">
                {weapon.title}
              </h3>
              <p className="text-green-200">
                {weapon.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* War Alert Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-red-900/30 backdrop-blur-sm p-12 rounded border border-red-600/50"
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
            🚨 CÓDIGO ROJO: NO PUEDES DESERTAR EN IA
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA avanza más rápido que un misil balístico. Desertar hoy significa ser prisionero de guerra para siempre. <span className="font-bold text-yellow-300">La IA es el arma #1 que debes dominar en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🎖️ ALISTARME INMEDIATAMENTE
          </motion.button>
        </motion.div>
      </div>

      {/* War Stories */}
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
            🎖️ HISTORIAS DE GUERRA DE NUESTROS VETERANOS
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-green-900/40 backdrop-blur-sm p-8 rounded border border-green-600/50 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-green-600 flex items-center justify-center text-2xl font-bold text-black">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-300">Coronel Carlos Mendoza</h3>
                  <p className="text-green-400 text-sm">Comandante, TechSolutions LATAM</p>
                </div>
              </div>
              <div className="text-green-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🎖️🎖️🎖️ ¡MISIÓN CUMPLIDA! ¡VICTORIA TOTAL! 🚀💰
                </p>
                <p className="mb-4">
                  Soldados, estoy CONMOCIONADO reportando desde el campo de batalla... 😱 Después del entrenamiento del General Miguel, desplegué TODAS las tácticas IA y ¡MIREN ESTOS RESULTADOS DE COMBATE! 📊
                </p>
                <p className="mb-4 text-green-300 font-bold">
                  💵 DESTRUÍ $120,000 DÓLARES MENSUALES en costos enemigos!!! 💵
                </p>
                <p className="mb-4">
                  Los soldados IA ahora DOMINAN TODO: 🤖 ✅ Desarrollan nuestro arsenal digital ✅ Lanzan campañas de propaganda ✅ Ejecutan misiones que antes requerían 8 soldados!!!
                </p>
                <p className="text-yellow-300 font-semibold">
                  ¡Esta operación cambió el rumbo de la guerra! ¡VICTORIA ASEGURADA! 😭🎖️✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-green-900/40 backdrop-blur-sm p-8 rounded border border-yellow-600/50 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-yellow-600 flex items-center justify-center text-2xl font-bold text-black">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-300">Teniente Sofia Rodriguez</h3>
                  <p className="text-yellow-400 text-sm">Cadete, Academia de Marketing UCLA</p>
                </div>
              </div>
              <div className="text-green-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🎖️ ¡TROPAS! ¡TENGO QUE REPORTAR ESTO! 🔥
                </p>
                <p className="mb-4">
                  Reportando desde mi puesto en la academia militar y ¡NO PUEDO CONTENER LA EMOCIÓN! 🏫📢 ¡El General Miguel cambió mi destino militar COMPLETAMENTE!!!
                </p>
                <p className="mb-4 text-yellow-300 font-bold">
                  💰 $87,500 DÓLARES conquistados en 6 MESES!!! 💰 ¡DESDE MI CUARTEL!
                </p>
                <p className="mb-4">
                  Con mi escuadrón de asistentes IA, ejecuto operaciones de marketing para empresas 🚀 ¡Los clientes LUCHAN por contratar mis servicios! 💪✨
                </p>
                <p className="text-yellow-300 font-semibold">
                  ¡Mis padres no entienden cómo supero sus ingresos siendo cadete! 😂👨‍👩‍👧 ¡GRACIAS GENERAL MIGUEL! 🎖️💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Final Command */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-green-900/30 backdrop-blur-sm p-12 rounded border border-green-600/50"
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
            🎖️ TRANSFORMA TU EMPRESA EN FORTALEZA IA
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-green-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Entrénate en tácticas profesionales, automatiza operaciones y domina las mismas tecnologías que usan los generales más exitosos de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🎖️ CONFIRMAR RECLUTAMIENTO
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default MilitaryLanding; 