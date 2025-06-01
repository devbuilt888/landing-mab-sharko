import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface MailchimpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
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
    buttonGradient: string;
    buttonHoverGradient: string;
    successColor: string;
    iconColors: {
      close: string;
      success: string;
    };
  };
}

const MailchimpModal: React.FC<MailchimpModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  buttonText,
  features,
  theme
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('b_4f2697fcbc9f8348c8c55db6d_3f735d2649', ''); // honeypot field

      await fetch('https://bbglobalsolutions.us14.list-manage.com/subscribe/post?u=4f2697fcbc9f8348c8c55db6d&id=3f735d2649&f_id=007e91e1f0', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Mailchimp
      });

      // Since mode is 'no-cors', we can't read the response, so we assume success
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setEmail('');
        setSubmitStatus('idle');
      }, 2000);

    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className={`relative backdrop-blur-md p-8 rounded-xl border-2 shadow-2xl max-w-lg w-full mx-4 ${theme.background} ${theme.borderColor}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              boxShadow: `0 0 50px ${theme.borderColor}40, inset 0 0 20px ${theme.borderColor}10`
            }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 ${theme.iconColors.close} hover:opacity-75 transition-colors`}
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

            <div className="space-y-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className={`flex items-center gap-3 ${theme.textColor}`}>
                  {feature.icon}
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className={`${theme.iconColors.success} text-4xl mb-4`}>✓</div>
                <h4 className={`text-xl font-bold ${theme.successColor} mb-2`}>¡Registro Exitoso!</h4>
                <p className={theme.textColor}>Te hemos enviado la información del webinar a tu email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${theme.textColor} mb-2`}>
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="tu@email.com"
                    disabled={isSubmitting}
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm text-center">
                    Hubo un error. Por favor intenta nuevamente.
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={`w-full ${theme.buttonGradient} hover:${theme.buttonHoverGradient} disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded text-lg transition-all transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registrando...
                    </div>
                  ) : (
                    buttonText
                  )}
                </button>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="b_4f2697fcbc9f8348c8c55db6d_3f735d2649"
                  tabIndex={-1}
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden="true"
                />
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MailchimpModal; 