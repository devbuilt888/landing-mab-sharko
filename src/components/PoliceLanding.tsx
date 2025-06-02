import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheckIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PoliceBeacons = () => {
  const [beacons, setBeacons] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const createBeacons = () => {
      const newBeacons = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5
      }));
      setBeacons(newBeacons);
    };

    createBeacons();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {beacons.map((beacon) => (
        <motion.div
          key={beacon.id}
          className="absolute"
          style={{
            left: `${beacon.x}%`,
            top: `${beacon.y}%`,
            width: `${beacon.size}px`,
            height: `${beacon.size}px`,
            backgroundColor: '#3b82f6',
            borderRadius: '50%',
            boxShadow: '0 0 12px #3b82f6',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0, 1, 0],
            scale: [0, 1, 0.5, 1, 0],
            backgroundColor: ['#3b82f6', '#dc2626', '#3b82f6'],
          }}
          transition={{
            duration: 8,
            delay: beacon.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const PatrolCars = () => {
  const [cars, setCars] = useState<{ id: number; x: number; y: number; size: number; delay: number; direction: number }[]>([]);

  useEffect(() => {
    const createCars = () => {
      const newCars = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 25,
        delay: Math.random() * 7,
        direction: Math.random() > 0.5 ? 1 : -1
      }));
      setCars(newCars);
    };

    createCars();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {cars.map((car) => (
        <motion.div
          key={car.id}
          className="absolute"
          style={{
            left: `${car.x}%`,
            top: `${car.y}%`,
            fontSize: `${car.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0.8, 0],
            scale: [0, 1, 1.2, 1, 0],
            x: [0, 60 * car.direction, -30 * car.direction, 0],
          }}
          transition={{
            duration: 20,
            delay: car.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚔
        </motion.div>
      ))}
    </div>
  );
};

const PoliceRadio = () => {
  return (
    <div className="absolute right-8 top-1/4 z-40">
      <div className="bg-blue-900/60 backdrop-blur-sm p-4 rounded border border-blue-400/50 shadow-xl shadow-blue-500/20">
        <p className="text-lg font-bold text-blue-300">
          📻 RADIO POLICÍA
        </p>
        <p className="text-blue-200 text-xs mt-1">
          Código IA 2025
        </p>
      </div>
    </div>
  );
};

const EmergencyAlert = () => {
  return (
    <div className="absolute left-8 bottom-1/4 z-40">
      <div className="bg-red-900/60 backdrop-blur-sm p-4 rounded border border-red-400/50 shadow-xl shadow-red-500/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full"></div>
          <span className="text-red-300 text-xs font-medium">CÓDIGO ROJO</span>
        </div>
        <p className="text-lg font-bold text-red-300">
          ¡RESPONDER YA!
        </p>
        <p className="text-red-200 text-xs mt-1">
          emergencia en curso
        </p>
      </div>
    </div>
  );
};

const WarrantModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            className="relative bg-blue-900/80 backdrop-blur-md p-8 rounded border-2 border-blue-400 shadow-2xl shadow-blue-500/30 max-w-lg w-full mx-4"
            style={{
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 0 50px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-blue-300 hover:text-blue-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-blue-300">
                🚔 ¡ÚLTIMAS PLAZAS EN LA ACADEMIA!
              </h3>
              <p className="text-blue-200">
                No te quedes sin placa mientras otros oficiales patrullan el territorio empresarial con IA
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-blue-200">
                <ShieldCheckIcon className="w-5 h-5 text-blue-300" />
                <p>Entrenamiento IA GRATUITO vs. cursos costosos de los federales</p>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                <p>Más arrestos, más justicia, más recompensas $$$</p>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <MagnifyingGlassIcon className="w-5 h-5 text-yellow-400" />
                <p>Automatización de patrullaje para investigaciones repetitivas</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25">
              🚔 REPORTARSE AL CUARTEL
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PoliceLanding = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #1e3a8a 100%)' }}>
      {/* Chief Profile */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-12 h-12 rounded border-2 border-blue-400 shadow-lg shadow-blue-500/50">
          <img
            src="/images/profile.jpeg"
            alt="Jefe Miguel Beas"
            className="object-cover w-full h-full rounded"
            style={{ filter: 'brightness(0.9) contrast(1.2) hue-rotate(200deg)' }}
          />
        </div>
        <span className="text-sm font-medium bg-blue-900/60 backdrop-blur-sm px-3 py-1 rounded border border-blue-400">
          👮 Jefe Miguel Beas
        </span>
      </motion.div>

      {/* Police Radio */}
      <PoliceRadio />

      {/* Emergency Alert */}
      <EmergencyAlert />

      {/* Warrant Modal */}
      <WarrantModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Station Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-blue-900/30"></div>
        
        {/* Emergency lights */}
        <motion.div
          className="absolute top-0 left-1/4 w-16 h-full bg-gradient-to-b from-blue-500/30 to-transparent"
          animate={{
            opacity: [0, 1, 0],
            backgroundColor: ['#3b82f6', '#dc2626', '#3b82f6'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-16 h-full bg-gradient-to-b from-red-500/30 to-transparent"
          animate={{
            opacity: [1, 0, 1],
            backgroundColor: ['#dc2626', '#3b82f6', '#dc2626'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <PoliceBeacons />
        <PatrolCars />
      </div>

      {/* Investigation Report Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md-text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🚔 OPERACIÓN: IA JUSTICE
          </motion.h1>
          
          <motion.div
            className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="text-lg font-semibold text-green-300 mb-2">
              👮 ENTRENAMIENTO ESPECIAL - 30 MINUTOS DE CAPACITACIÓN ÉLITE
            </p>
            <p className="text-sm text-green-200">
              Técnicas avanzadas de investigación IA que convertirán tu fuerza de seguridad en la más efectiva del sector empresarial
            </p>
          </motion.div>
          
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg font-semibold text-red-300 mb-2">
              🚨 CRIMEN EN AUMENTO: Empresas Latinoamericanas Bajo Ataque
            </p>
            <p className="text-sm text-red-200">
              Mientras departamentos estadounidenses usan IA para prevenir 99% de los crímenes empresariales, nuestras fuerzas siguen con métodos obsoletos
            </p>
          </motion.div>

          <motion.p 
            className="text-xl md-text-2xl mb-8 text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre las técnicas de investigación que usan las fuerzas élite de Silicon Valley y protege tu territorio comercial
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🚔 INGRESAR A LA ACADEMIA
          </motion.button>
        </motion.div>
      </div>

      {/* Law Enforcement Arsenal Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid md-grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <ShieldCheckIcon className="w-12 h-12 text-blue-300" />,
              title: "PROTECCIÓN GRATIS VS SEGURIDAD COSTOSA",
              description: "Muchos sistemas de seguridad IA que las corporaciones pagan por miles de dólares, los implementas GRATIS en tu jurisdicción usando protocolos de la academia"
            },
            {
              icon: <ExclamationTriangleIcon className="w-12 h-12 text-red-400" />,
              title: "PREVENCIÓN 99% MÁS EFECTIVA",
              description: "La IA puede prevenir problemas empresariales 99% mejor que métodos tradicionales. Nunca antes la seguridad había sido tan predecible"
            },
            {
              icon: <MagnifyingGlassIcon className="w-12 h-12 text-yellow-400" />,
              title: "PATRULLAJE AUTOMATIZADO",
              description: "Muchas rondas repetitivas que quitan tiempo de las investigaciones principales pueden ser realizadas por oficiales IA especializados"
            }
          ].map((equipment, index) => (
            <motion.div
              key={index}
              className="bg-blue-900/30 backdrop-blur-sm p-8 rounded border border-blue-400/30 hover:border-indigo-400/50 transition-colors shadow-lg shadow-blue-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{equipment.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">
                {equipment.title}
              </h3>
              <p className="text-blue-200">
                {equipment.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Crime Wave Warning */}
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
            🚨 ALERTA MÁXIMA: NO PUEDES ESTAR DESPROTEGIDO
          </motion.h2>
          <motion.p 
            className="text-xl mb-6 text-red-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La IA evoluciona más rápido que cualquier persecución en alta velocidad. Quedarse sin protección hoy significa ser víctima del crimen empresarial para siempre. <span className="font-bold text-blue-300">La IA es el escudo #1 que necesitas en 2025</span>.
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            🚔 SOLICITAR REFUERZOS YA
          </motion.button>
        </motion.div>
      </div>

      {/* Officer Testimonials */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-12 text-center text-blue-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            👮 TESTIMONIOS DE NUESTROS OFICIALES
          </motion.h2>
          
          <div className="grid md-grid-cols-2 gap-8">
            <motion.div
              className="bg-blue-900/40 backdrop-blur-sm p-8 rounded border border-blue-400/30 shadow-lg shadow-blue-500/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-blue-500 flex items-center justify-center text-2xl font-bold text-white">
                  CM
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-300">Carlos "El Detective" Mendoza</h3>
                  <p className="text-blue-200 text-sm">Sargento, Precinto TechSolutions</p>
                </div>
              </div>
              <div className="text-blue-200 leading-relaxed">
                <p className="text-lg mb-4">
                  🚔🚔🚔 ¡CASO CERRADO! ¡JUSTICIA SERVIDA! 👮💰
                </p>
                <p className="mb-4">
                  ¡Compañeros oficiales, estoy ORGULLOSO reportando desde mi estación! 😱 Después del entrenamiento con el Jefe Miguel, resolví TODOS los casos IA y ¡MIREN ESTOS RESULTADOS DE INVESTIGACIÓN! 📊
                </p>
                <p className="mb-4 text-blue-300 font-bold">
                  💵 ¡RECUPERÉ $120,000 DÓLARES EN EVIDENCIA cada mes! 💵
                </p>
                <p className="mb-4">
                  Mi unidad de investigación IA ahora RESUELVE TODO: 🚔 ✅ Analiza evidencia digital ✅ Ejecuta operaciones encubiertas ✅ Automatiza patrullajes que antes requerían 8 oficiales!!!
                </p>
                <p className="text-blue-300 font-semibold">
                  ¡Esta operación cambió mi carrera para toda la vida! ¡SOY EL DETECTIVE #1! 😭🚔✨
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-blue-900/40 backdrop-blur-sm p-8 rounded border border-indigo-400/30 shadow-lg shadow-indigo-500/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded bg-indigo-500 flex items-center justify-center text-2xl font-bold text-white">
                  SR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-300">Sofia "La Oficial" Rodriguez</h3>
                  <p className="text-indigo-200 text-sm">Cadete, Academia UCLA</p>
                </div>
              </div>
              <div className="text-blue-200 leading-relaxed">
                <p className="text-lg mb-4">
                  👮 ¡CÓDIGO 10-4! ¡TENGO QUE REPORTAR ESTO! 🔥
                </p>
                <p className="mb-4">
                  ¡Transmitiendo desde mi patrulla en el campus y NO PUEDO PARAR DE HACER ARRESTOS EXITOSOS! 🏫📢 ¡El Jefe Miguel me enseñó a navegar las CALLES INFINITAS del patrullaje IA!!!
                </p>
                <p className="mb-4 text-indigo-300 font-bold">
                  💰 ¡$87,500 DÓLARES EN MULTAS RECUPERADAS en 6 OPERATIVOS! 💰 ¡DESDE MI VEHÍCULO ESTUDIANTIL!
                </p>
                <p className="mb-4">
                  Con mi escuadrón de oficiales IA, ofrezco servicios de seguridad para empresas corporativas 🚔 ¡Los clientes CONFÍAN completamente en mi protección! 💪✨
                </p>
                <p className="text-indigo-300 font-semibold">
                  ¡Mis padres no entienden cómo tengo más arrestos que ellos siendo rookie! 😂👨‍👩‍👧 ¡GRACIAS JEFE MIGUEL! 👮💕
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Hall of Justice */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-blue-900/30 backdrop-blur-sm p-12 rounded border border-blue-400/50 shadow-lg shadow-blue-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md-text-4xl font-bold mb-6 text-blue-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🚔 ÚNETE A LA FUERZA ÉLITE IA 2025
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Domina las técnicas más avanzadas, automatiza tu patrullaje y usa las mismas estrategias que protegen los imperios de Estados Unidos
          </motion.p>
          <motion.button 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            👮 OBTENER PLACA DE HONOR
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default PoliceLanding; 