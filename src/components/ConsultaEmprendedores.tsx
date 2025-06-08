import React, { useState } from 'react';

const ConsultaEmprendedores: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Por favor ingresa tu email');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate brief loading then redirect to PayPal
    setTimeout(() => {
      window.open('https://www.paypal.com/ncp/payment/5NKTYAQCG7ZCC', '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Lightweight Floating Orbs Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full w-full p-8">
          {Array.from({ length: 144 }, (_, i) => (
            <div 
              key={i} 
              className="border border-white/10 rounded animate-pulse"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                🚀 CONSULTORÍA EXCLUSIVA
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                IA personalizada
              </span>
              <br />
              <span className="text-white">
                para emprendedores
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre exactamente cómo la <strong className="text-blue-400">Inteligencia Artificial</strong> puede 
              transformar tu empresa con una consultoría 1-on-1 completamente personalizada.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">Estrategia Específica</h3>
              <p className="text-gray-300 text-sm">Soluciones de IA adaptadas específicamente a tu industria y necesidades</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Implementación Práctica</h3>
              <p className="text-gray-300 text-sm">Plan paso a paso para integrar IA en tus procesos actuales</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-semibold text-white mb-2">ROI Medible</h3>
              <p className="text-gray-300 text-sm">Proyecciones claras del retorno de inversión de cada solución</p>
            </div>
          </div>

          {/* Pricing & Form Section */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl text-gray-400 line-through">$199.99</span>
                <span className="text-5xl font-bold text-white">$49.99</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">75% OFF</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Consultoría AI 1-on-1 Personalizada
              </h2>
              
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Una sesión completa donde analizamos tu negocio y desarrollamos un plan específico 
                de implementación de IA que puede generar <strong className="text-green-400">ahorros de miles de dólares</strong> anuales.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-6">
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Ingresa tu email para continuar al pago:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Redirigiendo...</span>
                  </div>
                ) : (
                  <>
                    <span className="text-lg">Continuar al Pago →</span>
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-400 mt-4">
                Al hacer clic, serás redirigido a PayPal para completar el pago de $49.99 USD de forma segura.
                <br />
                <strong>No se realizará ningún cargo hasta confirmar en PayPal.</strong>
              </p>
            </form>
          </div>

          {/* What's Included */}
          <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                ✅ Lo que incluye tu consultoría:
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Análisis completo de tu modelo de negocio</li>
                <li>• Identificación de oportunidades de IA específicas</li>
                <li>• Estimación de costos y ROI</li>
                <li>• Recomendaciones de herramientas y plataformas</li>
              </ul>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                🎁 Bonos incluidos:
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Documento PDF con plan personalizado</li>
                <li>• Lista de recursos y herramientas recomendadas</li>
                <li>• Template de prompts de IA para tu industria</li>
              </ul>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">🔒</span>
              <span className="text-sm">Pago 100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">💳</span>
              <span className="text-sm">PayPal Verificado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm">Garantía de Satisfacción</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) translateX(0px) rotate(0deg);
              opacity: 0.3;
            }
            25% {
              transform: translateY(-20px) translateX(10px) rotate(5deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-10px) translateX(-5px) rotate(-3deg);
              opacity: 0.4;
            }
            75% {
              transform: translateY(-30px) translateX(15px) rotate(8deg);
              opacity: 0.7;
            }
          }
          
          .animate-float {
            animation: float ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.3;
            }
          }
        `
      }} />
    </div>
  );
};

export default ConsultaEmprendedores; 