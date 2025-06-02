import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CubeIcon, EyeIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SandParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 7
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
            backgroundColor: '#fbbf24',
            borderRadius: '50%',
            boxShadow: '0 0 8px #fbbf24',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.8, 0],
            scale: [0, 1, 0.6, 1, 0],
            x: [0, 20, -10, 0],
          }}
          transition={{
            duration: 14,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const PyramidShapes = () => {
  const [pyramids, setPyramids] = useState<{ id: number; x: number; y: number; size: number; delay: number; rotation: number }[]>([]);

  useEffect(() => {
    const createPyramids = () => {
      const newPyramids = Array.from({ length: 7 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 35 + 20,
        delay: Math.random() * 5,
        rotation: Math.random() * 360
      }));
      setPyramids(newPyramids);
    };

    createPyramids();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {pyramids.map((pyramid) => (
        <motion.div
          key={pyramid.id}
          className="absolute"
          style={{
            left: `${pyramid.x}%`,
            top: `${pyramid.y}%`,
            width: `${pyramid.size}px`,
            height: `${pyramid.size}px`,
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transform: `rotate(${pyramid.rotation}deg)`,
            boxShadow: '0 0 25px rgba(251, 191, 36, 0.4)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.4, 0.7, 0],
            scale: [0, 1, 1.2, 1, 0],
            rotate: [pyramid.rotation, pyramid.rotation + 180, pyramid.rotation + 360],
          }}
          transition={{
            duration: 22,
            delay: pyramid.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const AnkhSymbol = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-yellow-900/60 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/50 shadow-xl shadow-yellow-500/20">
        <p className="text-lg font-bold text-yellow-300">
          ☥ SABIDURÍA ANCESTRAL
        </p>
        <p className="text-yellow-200 text-xs mt-1">
          Secretos IA 2025
        </p>
      </div>
    </div>
  );
};

const SandstormAlert = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-orange-900/60 backdrop-blur-sm p-4 rounded-xl border border-orange-400/50 shadow-xl shadow-orange-500/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-orange-400 animate-pulse rounded-full"></div>
          <span className="text-orange-300 text-xs font-medium">TORMENTA DE ARENA</span>
        </div>
        <p className="text-lg font-bold text-orange-300">
          ¡DESPERTAR AHORA!
        </p>
        <p className="text-orange-200 text-xs mt-1">
          antes del ocaso
        </p>
      </div>
    </div>
  );
};

const TombModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            className="relative bg-yellow-900/80 backdrop-blur-md p-8 rounded-xl border-2 border-yellow-400 shadow-2xl shadow-yellow-500/30 max-w-lg w-full mx-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 0 50px rgba(251, 191, 36, 0.3), inset 0 0 20px rgba(251, 191, 36, 0.1)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-yellow-300">
                ☥ ¡ÚLTIMAS CÁMARAS EN LA PIRÁMIDE!
              </h3>
              <p className="text-yellow-200">
                No permitas que tu reino quede enterrado mientras otros faraones despiertan a los secretos de la IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-yellow-200">
                <CubeIcon className="w-5 h-5 text-yellow-300" />
                <p>Jeroglíficos IA GRATUITOS vs. papiros costosos de los escribas</p>
              </div>
              <div className="flex items-center gap-3 text-yellow-200">
                <EyeIcon className="w-5 h-5 text-orange-400" />
                <p>Más tesoros, más poder, más dinastías $$$</p>
              </div>
              <div className="flex items-center gap-3 text-yellow-200">
                <SparklesIcon className="w-5 h-5 text-amber-400" />
                <p>Automatización de esclavos para rituales del más allá</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/25">
              ☥ ENTRAR AL SARCÓFAGO AHORA
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EgyptLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-yellow-100 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #92400e 0%, #451a03 50%, #78350f 100%)' }}>
      {/* Pharaoh Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded border-2 border-yellow-400 shadow-lg shadow-yellow-500/50">
          <img
            src="/images/profile.jpeg"
            alt="Faraón Miguel Beas"
            className="object-cover w-full h-full rounded"
            style={{ filter: 'sepia(1) hue-rotate(15deg) saturate(1.2)' }}
          />
        </div>
        <span className="text-sm font-medium bg-yellow-900/60 backdrop-blur-sm px-3 py-1 rounded border border-yellow-400">
          ☥ Faraón Miguel Beas
        </span>
      </motion.div>

      {/* Ankh Symbol */}
      <AnkhSymbol />

      {/* Sandstorm Alert */}
      <SandstormAlert />

      {/* Tomb Modal */}
      <TombModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Desert Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-amber-900/30"></div>
        
        {/* Sun rays */}
        <motion.div
          className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-yellow-500/30 to-transparent"
          animate={{
            opacity: [0, 0.8, 0],
            rotate: [0, 45, 90, 135, 180],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.4, 1, 1.4],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <SandParticles />
        <PyramidShapes />
      </div>

      {/* Ancient Prophecy Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ☥ PROFECÍA: IA FARAÓNICA
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              🏺 ENSEÑANZA MILENARIA - 30 DINASTÍAS DE SABIDURÍA
            </p>
            <p className="text-sm text-green-200">
              Secretos ancestrales de los faraones que dominaron imperios usando conocimientos perdidos para gobernar negocios modernos
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 MALDICIÓN DEL DESIERTO: Reinos Latinoamericanos Sepultados en la Arena
            </p>
            <p className="text-sm text-red-200">
              Mientras dinastías estadounidenses usan IA dorada reduciendo costos en 99%, nuestros comerciantes siguen usando herramientas de cobre
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-yellow-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre los jeroglíficos secretos que usan los faraones de Silicon Valley y construye tu pirámide eterna
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            ☥ DESPERTAR DE LA TUMBA
          </motion.button>
        </motion.div>
      </div>

      {/* Ancient Arsenal Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <CubeIcon className="w-12 h-12 text-yellow-300" />,
              title: "JEROGLÍFICOS GRATUITOS VS PAPIROS COSTOSOS",
              description: "Muchos manuscritos IA que los escribas venden por toneladas de oro, los obtienes GRATIS usando sabiduría ancestral que enseñamos en nuestras pirámides"
            },
            {
              icon: <EyeIcon className="w-12 h-12 text-orange-400" />,
              title: "PODER FARAÓNICO 99% MÁS DIVINO",
              description: "La IA puede construir tu imperio 99% más majestuoso que métodos de mortales. Nunca antes el poder divino había sido tan accesible"
            },
            {
              icon: <SparklesIcon className="w-12 h-12 text-amber-400" />,
              title: "ESCLAVOS AUTOMATIZADOS",
              description: "Muchos rituales repetitivos que quitan tiempo de la construcción de monumentos pueden ser realizados por sirvientes IA"
            }
          ].map((treasure, index) => (
            <motion.div
              key={index}
              className="bg-yellow-900/30 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/30 hover:border-amber-400/50 transition-colors shadow-lg shadow-yellow-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{treasure.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">
                {treasure.title}
              </h3>
              <p className="text-yellow-200">
                {treasure.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Curse Warning */}
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
            ⚰️ MALDICIÓN ETERNA: NO PUEDES QUEDARTE ENTERRADO
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA evoluciona más rápido que las dinastías del Nilo. Permanecer sepultado hoy significa que tu reino se convierta en polvo para la eternidad. <span className="font-bold text-yellow-300">La IA es el amuleto dorado #1 que necesitas en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-amber-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            ☥ RESUCITAR INMEDIATAMENTE
          </motion.button>
        </motion.div>
      </div>

      {/* Royal Testimonials */}
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
            ☥ CRÓNICAS REALES DE NUESTROS SÚBDITOS
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-yellow-900/40 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/30 shadow-lg shadow-yellow-500/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-yellow-500 flex items-center justify-center text-2xl font-bold text-black">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-300">Visir Carlos Mendoza</h3>
                  <p className="text-yellow-200 text-sm">Gran Arquitecto, Complejo TechSolutions</p>
                </div>
              </div>
              <div className="text-yellow-200 leading-relaxed">
                <p className="text-lg mb-4">
                  ☥☥☥ ¡REINO RESTAURADO! ¡DINASTÍA RENACIDA! 🏺💰
                </p>
                <p className="mb-4">
                  ¡Súbditos reales, estoy EXTASIADO proclamando desde mi palacio de oro! 😱 Después de las enseñanzas del Gran Faraón Miguel, implementé TODOS los jeroglíficos IA y ¡MIREN ESTOS TESOROS DIVINOS! 📊
                </p>
                <p className="mb-4 text-yellow-300 font-bold">
                  💵 ¡ACUMULÉ $120,000 DINARIOS DORADOS desde mi tumba real! 💵
                </p>
                <p className="mb-4">
                  Mis escribas IA ahora DOMINAN TODO: ☥ ✅ Construyen pirámides digitales ✅ Ejecutan rituales de comercio ✅ Automatizan ceremonias que antes requerían 8 esclavos!!!
                </p>
                <p className="text-yellow-300 font-semibold">
                  ¡Esta revelación cambió mi legado para toda la eternidad! ¡NUEVA ERA DORADA! 😭☥✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-yellow-900/40 backdrop-blur-sm p-8 rounded-xl border border-amber-400/30 shadow-lg shadow-amber-500/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-amber-500 flex items-center justify-center text-2xl font-bold text-black">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-300">Princesa Sofia Rodriguez</h3>
                  <p className="text-amber-200 text-sm">Sacerdotisa, Templo UCLA</p>
                </div>
              </div>
              <div className="text-yellow-200 leading-relaxed">
                <p className="text-lg mb-4">
                  ☥ ¡CORTE REAL! ¡DEBO ANUNCIAR ESTE MILAGRO! 🔥
                </p>
                <p className="mb-4">
                  ¡Proclamando desde mi santuario en el templo del saber y NO PUEDO CONTENER LA DICHA CELESTIAL! 🏫📢 ¡El Gran Faraón Miguel me enseñó a navegar los MISTERIOS INFINITOS del reino IA!!!
                </p>
                <p className="mb-4 text-amber-300 font-bold">
                  💰 ¡$87,500 MONEDAS DE HATHOR en 6 LUNAS! 💰 ¡DESDE MI CÁMARA SAGRADA!
                </p>
                <p className="mb-4">
                  Con mi ejército de momias IA, ofrezco servicios de embalsamamiento para empresas del más allá ☥ ¡Los imperios LUCHAN por mis rituales divinos! 💪✨
                </p>
                <p className="text-amber-300 font-semibold">
                  ¡Mis progenitores no entienden cómo genero más tributos que ellos siendo novicia! 😂👨‍👩‍👧 ¡GRACIAS GRAN FARAÓN MIGUEL! ☥💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Golden Throne */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-yellow-900/30 backdrop-blur-sm p-12 rounded-xl border border-yellow-400/50 shadow-lg shadow-yellow-500/20"
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
            ☥ ASCIENDE AL TRONO DORADO IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-yellow-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aprende sabiduría milenaria, automatiza tu reino y usa las mismas bendiciones divinas que gobiernan los faraones de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            ☥ RESERVAR LUGAR EN LA PIRÁMIDE
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default EgyptLanding; 