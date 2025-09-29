import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedText = ({ text, className, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Array of professional images with transparent backgrounds
const professionalImages = [
  {
    id: 1,
    url: "https://unifato.com/finazze/assets/img/all-images/hero/hero-img1.png",
    alt: "Professional Financial Consultant"
  }
];

// Plant/Leaf SVG components for the rotating background
const PlantIcon = ({ className, delay = 0 }) => (
  <motion.svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ 
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 360],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay: delay,
      ease: "linear",
      rotate: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }}
  >
    <path
      d="M12 2C8 2 5 5 5 9c0 2.5 1.5 4.5 3.5 5.5-1 1.5-1.5 3.5-1.5 5.5h3c0-2 0-3.5 1-5-0.5-0.5-1-1-1-2 0-1.5 1-2.5 2-2.5s2 1 2 2.5c0 1-0.5 1.5-1 2 1 1.5 1 3 1 5h3c0-2-0.5-4-1.5-5.5 2-1 3.5-3 3.5-5.5 0-4-3-7-7-7z"
      fill="currentColor"
    />
  </motion.svg>
);

const LeafIcon = ({ className, delay = 0 }) => (
  <motion.svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0, rotate: 180 }}
    animate={{ 
      scale: [0.6, 1.1, 0.6],
      rotate: [0, -360],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay: delay,
      ease: "linear",
      rotate: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }}
  >
    <path
      d="M17 8C8 10 5.9 16.2 5.9 16.2S4 18 4 21c3 0 4.9-1.9 4.9-1.9S12 20 20 17c0-6-3-9-3-9z"
      fill="currentColor"
    />
  </motion.svg>
);

const FinancialChartIcon = ({ className, delay = 0 }) => (
  <motion.svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0 }}
    animate={{ 
      scale: [0.7, 1.3, 0.7],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      delay: delay,
      ease: "linear",
      rotate: {
        duration: 18,
        repeat: Infinity,
        ease: "linear"
      }
    }}
  >
    <path
      d="M3 3v16a2 2 0 0 0 2 2h16M7 14l3-3 3 3 5-5m0 0h-3m3 0v3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </motion.svg>
);

const RotatingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large rotating plants in background */}
      <PlantIcon className="absolute top-1/4 left-1/4 w-20 h-20 text-emerald-200/40" delay={0} />
      <LeafIcon className="absolute top-1/3 right-1/4 w-16 h-16 text-blue-200/40" delay={2} />
      <FinancialChartIcon className="absolute bottom-1/4 left-1/3 w-24 h-24 text-emerald-300/30" delay={4} />
      <PlantIcon className="absolute bottom-1/3 right-1/3 w-18 h-18 text-blue-300/30" delay={6} />
      
      {/* Medium rotating plants */}
      <LeafIcon className="absolute top-1/5 right-1/5 w-12 h-12 text-emerald-300/50" delay={1} />
      <PlantIcon className="absolute bottom-1/5 left-1/5 w-14 h-14 text-blue-300/50" delay={3} />
      <FinancialChartIcon className="absolute top-2/3 left-1/5 w-10 h-10 text-emerald-200/60" delay={5} />
      <LeafIcon className="absolute bottom-2/3 right-1/5 w-8 h-8 text-blue-200/60" delay={7} />
      
      {/* Small rotating elements */}
      <PlantIcon className="absolute top-3/4 left-2/3 w-6 h-6 text-emerald-400/70" delay={0.5} />
      <LeafIcon className="absolute top-1/2 left-1/2 w-5 h-5 text-blue-400/70" delay={2.5} />
      <FinancialChartIcon className="absolute top-1/4 right-1/2 w-7 h-7 text-emerald-400/60" delay={4.5} />
      <PlantIcon className="absolute bottom-1/4 left-1/2 w-4 h-4 text-blue-400/60" delay={6.5} />
      
      {/* Circular motion paths */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-emerald-200/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-blue-200/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-emerald-300/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const ProfessionalImageWithStats = () => {
  return (
    <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
      {/* Animated Background */}
      <RotatingBackground />
      
      {/* Main Professional Image Container */}
      <motion.div
        className="relative w-80 h-96 lg:w-96 lg:h-[500px] z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1.2, 
          delay: 0.6,
          ease: "easeOut",
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 100
          }
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0 }
        }}
      >
        {/* Professional Person Image from array */}
        {professionalImages.map((image) => (
          <motion.img 
            key={image.id}
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{ 
              filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.2))',
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 1.5,
              delay: 0.8,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Floating stats elements */}
        <motion.div
          className="absolute -top-2 left-6 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100 z-20 min-w-[120px]"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-xs text-gray-500 font-medium">Earnings</div>
          <div className="text-sm font-bold text-emerald-600">$350.40</div>
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-100 z-20 min-w-[100px] text-center"
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="text-xl font-bold text-blue-600">$6,662</div>
        </motion.div>
        
        <motion.div
          className="absolute -bottom-4 right-8 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100 z-20 min-w-[120px]"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="text-xs text-gray-500 font-medium">New clients</div>
          <div className="text-sm font-bold text-blue-600">321</div>
        </motion.div>
        
        {/* Subtle background effect */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-100/20 to-emerald-100/20 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-10 right-10 w-6 h-6 bg-blue-400/30 rounded-full z-0"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-8 w-4 h-4 bg-emerald-400/30 rounded-full z-0"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

// Enhanced Professional Card Component
const ProfessionalCard = ({ card, index }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: index * 0.2,
        duration: 0.8
      }
    },
    hover: {
      y: -20,
      scale: 1.02,
      rotateY: 5,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: index * 0.2 + 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const backgroundVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: index * 0.2 + 0.1 }
    },
    hover: {
      scale: 1.1,
      opacity: 0.8,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      key={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 border border-gray-100 group overflow-hidden cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        variants={backgroundVariants}
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50 z-0"
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              scale: 0
            }}
            whileHover={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.6, 0],
              transition: {
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity
              }
            }}
          />
        ))}
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0" />

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 blur-md" />
      <div className="absolute inset-[1px] rounded-2xl bg-white z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Icon Container */}
        <motion.div
          variants={iconVariants}
          className="relative mb-8"
        >
          <div className="relative inline-block">
            {/* Icon Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-60"
              whileHover={{
                scale: 1.3,
                transition: { duration: 0.4 }
              }}
            />
            
            {/* Icon Container */}
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-2xl border border-slate-200 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.iconColor} flex items-center justify-center shadow-inner relative overflow-hidden`}>
                {/* Icon Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <svg
                  className="h-8 w-8 text-white relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={card.iconPath} />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={contentVariants}
          className="relative z-10"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
            {card.title}
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6 text-lg">
            {card.description}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mb-6 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
            animate={{
              x: [-100, 100]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          />
        </motion.div>

        {/* Learn More Link */}
        <motion.div
          className="flex items-center text-slate-700 group-hover:text-blue-600 transition-colors duration-300 font-semibold"
          whileHover={{ x: 5 }}
        >
          <span className="text-lg">Discover More</span>
          <motion.svg 
            className="h-5 w-5 ml-3"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-20 h-20 rotate-45 bg-gradient-to-r from-blue-400 to-emerald-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-20 h-20 rotate-45 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Professional Banner Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        
        {/* Floating Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-20">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="block">STRATEGIC SOLUTIONS</span>
                  <span className="block mt-2 bg-gradient-to-r from-green-800 to-green-400 bg-clip-text text-transparent">
                    FOR FINANCIAL GROWTH
                  </span>
                </h1>
              </motion.div>
              
              {/* Subheadline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-xl md:text-2xl text-gray-700 font-medium">
                  Navigate Complex Financial Challenges With Confidence
                </p>
              </motion.div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  We provide expert financial consulting services designed to help businesses of all sizes achieve their goals, whether you're looking to optimize operations, secure funding, or plan for sustainable growth.
                </p>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all"
                >
                  EXPLORE OUR SERVICES
                </motion.button>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg transition-all"
                >
                  JOIN US TODAY
                </motion.button>
              </motion.div>
            </div>
            
            {/* Right Visual - Professional Image with Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex justify-center lg:justify-end"
            >
              <ProfessionalImageWithStats />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Additional Content Sections */}
      <div className="relative py-36 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-slate-800 text-slate-200 px-4 py-1.5 rounded-full text-sm mb-6 font-medium tracking-wide">
                OUR VALUE PROPOSITION
              </div>
              <h2 className="text-4xl font-bold text-slate-900">
                <span className="block">Exclusive </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">Investment Ecosystem</span>
              </h2>
              <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
                A curated platform designed for discerning investors and exceptional startups
              </p>
            </motion.div>
          </div>
          
          {/* Enhanced Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Startup Journey',
                iconColor: 'from-blue-500 to-blue-600',
                iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                description: 'Pitch your startup with elegance, connect with investors who see your vision, and accelerate your growth with style.',
              },
              {
                title: 'Investment Opportunities',
                iconColor: 'from-emerald-500 to-emerald-600',
                iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                description: 'Explore vetted startups, monitor growth KPIs, and invest with confidence in your future unicorns.',
              },
              {
                title: 'Smart Matching',
                iconColor: 'from-purple-500 to-purple-600',
                iconPath: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
                description: 'Let our AI find the best-fit investor or startup — no more endless searching, just ideal alignment.',
              }
            ].map((card, index) => (
              <ProfessionalCard key={index} card={card} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-24 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
              <div className="absolute inset-0 [background-size:80px_80px] [background-image:linear-gradient(to_right,transparent_50%,#000_50%),linear-gradient(to_bottom,transparent_50%,#000_50%)] rotate-45"></div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
              Ready to Join Our Exclusive Network?
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-10 relative z-10">
              Apply today to become part of the premier investment ecosystem connecting exceptional startups with visionary investors.
            </p>
            <div className="flex justify-center relative z-10">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg shadow-lg transition-all"
              >
                Request Access
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;