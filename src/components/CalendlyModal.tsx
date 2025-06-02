import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  features: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  theme: {
    background: string;
    borderColor: string;
    titleColor: string;
    subtitleColor: string;
    textColor: string;
    iconColors: {
      close: string;
    };
  };
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  features,
  theme
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
            className={`relative backdrop-blur-md p-6 rounded-xl border-2 shadow-2xl w-full mx-4 h-[95vh] overflow-y-auto ${theme.background} ${theme.borderColor}`}
            style={{ 
              maxWidth: '1000px',
              boxShadow: `0 0 50px ${theme.borderColor}40, inset 0 0 20px ${theme.borderColor}10`
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 ${theme.iconColors.close} hover:opacity-75 transition-colors`}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold mb-2 ${theme.titleColor}`}>
                {title}
              </h3>
              <p className={theme.subtitleColor}>
                {subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h4 className={`text-lg font-semibold ${theme.textColor}`}>
                  Lo que aprenderás:
                </h4>
                {features.map((feature, index) => (
                  <div key={index} className={`flex items-center gap-3 ${theme.textColor}`}>
                    {feature.icon}
                    <p className="text-sm">{feature.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col justify-center">
                <div className={`text-center p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30`}>
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-lg font-bold text-green-300 mb-2">Webinar GRATUITO</h4>
                  <p className="text-sm text-gray-300">
                    30 minutos que cambiarán tu perspectiva sobre la IA
                  </p>
                </div>
              </div>
            </div>

            {/* Calendly Iframe */}
            <div className="relative bg-white rounded-lg overflow-hidden">
              <iframe 
                src="https://calendly.com/pmteamwinners/bb-global-solutions-ai-webinar?embed_domain=localhost&embed_type=Inline"
                width="100%"
                height="700"
                frameBorder="0"
                scrolling="no"
                title="Calendario de Reservas"
                style={{ border: 'none', borderRadius: '8px' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Extend Window interface for Calendly
declare global {
  interface Window {
    Calendly: any;
  }
}

export default CalendlyModal; 