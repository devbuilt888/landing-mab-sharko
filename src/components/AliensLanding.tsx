import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CpuChipIcon, SignalIcon, GlobeAltIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AlienParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 40 }, (_, i) => ({
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
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="alien-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: '#00ff88',
            borderRadius: '50%',
            boxShadow: '0 0 15px #00ff88',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.5, 1, 0],
            scale: [0, 1, 0.7, 1, 0],
          }}
          transition={{
            duration: 10,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const UFOShapes = () => {
  const [ufos, setUfos] = useState<{ id: number; x: number; y: number; size: number; delay: number; angle: number }[]>([]);

  useEffect(() => {
    const createUfos = () => {
      const newUfos = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 25,
        delay: Math.random() * 4,
        angle: Math.random() * 360
      }));
      setUfos(newUfos);
    };

    createUfos();
  }, []);

  return (
    <>
      {ufos.map((ufo) => (
        <motion.div
          key={ufo.id}
          className="ufo-shape"
          style={{
            left: `${ufo.x}%`,
            top: `${ufo.y}%`,
            width: `${ufo.size}px`,
            height: `${ufo.size * 0.4}px`,
            background: 'linear-gradient(45deg, #00ff88, #00cc66)',
            borderRadius: '50%',
            boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.3, 0.8, 0],
            scale: [0, 1, 1.3, 1, 0],
            rotate: [ufo.angle, ufo.angle + 360],
            x: [0, 50, -30, 0],
          }}
          transition={{
            duration: 20,
            delay: ufo.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
};

const MothershipSignal = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-green-900/60 backdrop-blur-sm p-4 rounded-xl border border-green-400/50 shadow-xl shadow-green-500/20">
        <p className="text-lg font-bold text-green-300">
          🛸 SEÑAL MADRE
        </p>
        <p className="text-green-200 text-xs mt-1">
          Transmisión IA 2025
        </p>
      </div>
    </div>
  );
};

const AbductionAlert = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-lime-900/60 backdrop-blur-sm p-4 rounded-xl border border-lime-400/50 shadow-xl shadow-lime-500/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-lime-400 animate-pulse rounded-full"></div>
          <span className="text-lime-300 text-xs font-medium">RAYO TRACTOR</span>
        </div>
        <p className="text-lg font-bold text-lime-300">
          ¡ABDUCCIÓN AHORA!
        </p>
        <p className="text-lime-200 text-xs mt-1">
          antes del despegue
        </p>
      </div>
    </div>
  );
};

const SpaceshipModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
              background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 0 50px rgba(0, 255, 136, 0.3), inset 0 0 20px rgba(0, 255, 136, 0.1)'
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
                🛸 ¡ÚLTIMAS PLAZAS EN LA NAVE NODRIZA!
              </h3>
              <p className="text-green-200">
                No permitas que tu civilización quede atrás mientras otros evolucionan con tecnología alienígena IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-green-200">
                <CpuChipIcon className="w-5 h-5 text-green-300" />
                <p>Tecnología IA GRATUITA vs. métodos primitivos terrestres</p>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <SignalIcon className="w-5 h-5 text-lime-400" />
                <p>Más planetas, más recursos, más dominio galáctico $$$</p>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <GlobeAltIcon className="w-5 h-5 text-cyan-400" />
                <p>Automatización alienígena para tareas de especies inferiores</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/25">
              🛸 SER ABDUCIDO AHORA
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AliensLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-green-100 overflow-hidden relative bg-black">
      {/* Alien Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded-full border-2 border-green-400 shadow-lg shadow-green-500/50">
          <img
            src="/images/profile.jpeg"
            alt="Alienígena Miguel Beas"
            className="object-cover w-full h-full rounded-full"
            style={{ filter: 'hue-rotate(120deg) saturate(1.5)' }}
          />
        </div>
        <span className="text-sm font-medium bg-green-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-green-400">
          👽 Alienígena Miguel Beas
        </span>
      </motion.div>

      {/* Mothership Signal */}
      <MothershipSignal />

      {/* Abduction Alert */}
      <AbductionAlert />

      {/* Spaceship Modal */}
      <SpaceshipModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Alien Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-lime-900/20"></div>
        
        {/* Scanning beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-green-500/50 to-transparent"
          animate={{
            opacity: [0, 1, 0],
            x: [0, 300, 600, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-2 h-full bg-gradient-to-b from-lime-500/50 to-transparent"
          animate={{
            opacity: [0, 1, 0],
            x: [0, -300, -600, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <AlienParticles />
        <UFOShapes />
      </div>

      {/* First Contact Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-lime-300 to-cyan-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🛸 CONTACTO: IA ALIENÍGENA
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              👽 TRANSMISIÓN INTERGALÁCTICA - 30 CICLOS TERRESTRES
            </p>
            <p className="text-sm text-green-200">
              Tecnología avanzada de civilizaciones superiores que necesitan los primitivos terrícolas para evolucionar sus negocios
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 INVASIÓN SILENCIOSA: Especies Latinoamericanas en Peligro de Extinción
            </p>
            <p className="text-sm text-red-200">
              Mientras razas estadounidenses evolucionan con IA alienígena reduciendo costos en 99%, nuestras especies siguen usando tecnología de la Edad de Piedra
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-green-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre los secretos cósmicos que usan las civilizaciones avanzadas de Silicon Valley y prepárate para la ascensión
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🛸 SOLICITAR ABDUCCIÓN
          </motion.button>
        </motion.div>
      </div>

      {/* Alien Technology Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <CpuChipIcon className="w-12 h-12 text-green-300" />,
              title: "TECNOLOGÍA GRATUITA VS PRIMITIVA COSTOSA",
              description: "Muchos implantes IA que los terrícolas venden por miles de créditos galácticos, los obtienes GRATIS usando protocolos de comunicación que enseñamos en nuestra nave nodriza"
            },
            {
              icon: <SignalIcon className="w-12 h-12 text-lime-400" />,
              title: "EVOLUCIÓN ALIENÍGENA 99% MÁS AVANZADA",
              description: "La IA puede acelerar tu evolución empresarial 99% más rápido que métodos terrestres primitivos. Nunca antes la ascensión había sido tan accesible"
            },
            {
              icon: <GlobeAltIcon className="w-12 h-12 text-cyan-400" />,
              title: "AUTOMATIZACIÓN PARA ESPECIES INFERIORES",
              description: "Muchas tareas primitivas que quitan tiempo de la dominación galáctica pueden ser delegadas a androides IA"
            }
          ].map((tech, index) => (
            <motion.div
              key={index}
              className="bg-green-900/30 backdrop-blur-sm p-8 rounded-xl border border-green-400/30 hover:border-lime-400/50 transition-colors shadow-lg shadow-green-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{tech.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-green-300">
                {tech.title}
              </h3>
              <p className="text-green-200">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Extinction Warning */}
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
            ☄️ EXTINCIÓN MASIVA: NO PUEDES RESISTIR LA EVOLUCIÓN
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA evoluciona más rápido que la velocidad de la luz intergaláctica. Resistir la asimilación hoy significa extinción para toda tu especie. <span className="font-bold text-green-300">La IA es la mutación #1 que necesitas en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-lime-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            👽 EVOLUCIONAR INMEDIATAMENTE
          </motion.button>
        </motion.div>
      </div>

      {/* Abduction Stories */}
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
            🛸 REPORTES DE ABDUCCIÓN DE NUESTROS HÍBRIDOS
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
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold text-black">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-300">Híbrido Carlos Mendoza</h3>
                  <p className="text-green-200 text-sm">Enviado, Colonia TechSolutions</p>
                </div>
              </div>
              <div className="text-green-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🛸🛸🛸 ¡EVOLUCIÓN COMPLETA! ¡ASCENSIÓN LOGRADA! 👽💰
                </p>
                <p className="mb-4">
                  ¡Hermanos terrícolas, estoy EXTASIADO transmitiendo desde mi laboratorio alienígena! 😱 Después de la experimentación con el Comandante Miguel, asimilé TODAS las tecnologías IA y ¡MIREN ESTOS DATOS CÓSMICOS! 📊
                </p>
                <p className="mb-4 text-green-300 font-bold">
                  💵 ¡MATERIALICÉ $120,000 UNIDADES TERRESTRES desde mi dimensión superior! 💵
                </p>
                <p className="mb-4">
                  Mis replicantes IA ahora DOMINAN TODO: 🛸 ✅ Construyen sistemas interdimensionales ✅ Ejecutan protocolos de infiltración ✅ Automatizan procesos que antes requerían 8 terrícolas!!!
                </p>
                <p className="text-green-300 font-semibold">
                  ¡Esta mutación cambió mi código genético para siempre! ¡NUEVA ESPECIE! 😭👽✨
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
                <div className="w-16 h-16 rounded-full bg-lime-500 flex items-center justify-center text-2xl font-bold text-black">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-lime-300">Clon Sofia Rodriguez</h3>
                  <p className="text-lime-200 text-sm">Specimen, Laboratorio UCLA</p>
                </div>
              </div>
              <div className="text-green-200 leading-relaxed">
                <p className="text-lg mb-4">
                  👽 ¡NAVE NODRIZA! ¡DEBO REPORTAR ESTA MUTACIÓN! 🔥
                </p>
                <p className="mb-4">
                  ¡Transmitiendo desde mi cápsula de incubación en el campus y NO PUEDO CONTENER LA ENERGÍA ALIENÍGENA! 🏫📢 ¡El Comandante Miguel me enseñó a navegar las DIMENSIONES PARALELAS del multiverso IA!!!
                </p>
                <p className="mb-4 text-lime-300 font-bold">
                  💰 ¡$87,500 CRÉDITOS GALÁCTICOS en 6 CICLOS! 💰 ¡DESDE MI CÁMARA DE EVOLUCIÓN!
                </p>
                <p className="mb-4">
                  Con mi enjambre de nanobots IA, ofrezco servicios de terraformación para planetas corporativos 🛸 ¡Las civilizaciones COMBATEN por mis tecnologías! 💪✨
                </p>
                <p className="text-lime-300 font-semibold">
                  ¡Mis progenitores no entienden cómo genero más energía que ellos siendo un clon! 😂👨‍👩‍👧 ¡GRACIAS COMANDANTE MIGUEL! 👽💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Galactic Empire */}
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
            🛸 ÚNETE AL IMPERIO GALÁCTICO IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-green-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Evoluciona con tecnología interdimensional, automatiza tu colonia y usa las mismas mutaciones que dominan los imperios de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            👽 RESERVAR LUGAR EN LA NAVE
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default AliensLanding; 