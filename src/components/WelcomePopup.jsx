import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomePopup({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Show popup after component mounts
    setTimeout(() => setIsVisible(true), 100);
    
    // Animated sequence for steps
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => prev < 3 ? prev + 1 : prev);
    }, 600);

    return () => clearInterval(stepTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 800); // Wait for exit animation
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.6, ease: "easeIn" }
    }
  };

  const cardVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0,
      rotateY: -15
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.8
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      rotateY: 10,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0.8],
      transition: {
        delay: i * 0.1,
        duration: 1.2,
        ease: "easeOut"
      }
    })
  };

  const glowVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1.2,
      opacity: 0.4,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Animated Background Gradient - Green Theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-900 to-teal-900">
            {/* Animated Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400 rounded-full blur-sm"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                variants={particleVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              />
            ))}
            
            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.5, 1, 1.5],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          {/* Main Card */}
          <motion.div
            className="relative max-w-lg w-full mx-4"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
                  />
                ))}
              </div>

              {/* CTA Section - Green Theme */}
              <div className="p-8">
                <motion.button
                  onClick={handleClose}
                  className="relative w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 
                  text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 
                  transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 
                  shadow-2xl overflow-hidden group"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  {/* Button Pulse Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-white/10 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Button Text */}
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                </motion.button>

                {/* Secondary Action */}
                <motion.button
                  onClick={handleClose}
                  className="w-full mt-4 text-green-200/70 hover:text-white font-medium py-3 rounded-2xl 
                  transition-all duration-300 hover:bg-white/5 border border-white/10 hover:border-white/20"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3.5}
                >
                  Explore Features
                </motion.button>
                
                {/* Additional Info */}
                <motion.p 
                  className="text-center text-green-200/50 text-sm mt-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  Join 10,000+ innovators already shaping the future
                </motion.p>
              </div>
            </div>

            {/* Floating Elements - Green */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-400 rounded-full blur-sm"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-400 rounded-full blur-sm"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>

          {/* Close Button */}
          <motion.button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl p-2 rounded-full hover:bg-white/10 transition-all duration-300 z-10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}