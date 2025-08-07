import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cards = [
  {
    title: 'Startup Journey',
    iconColor: 'from-emerald-400 to-emerald-600',
    iconPath:
      'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    description:
      'Pitch your startup with elegance, connect with investors who see your vision, and accelerate your growth with style.',
  },
  {
    title: 'Investment Opportunities',
    iconColor: 'from-teal-400 to-teal-600',
    iconPath:
      'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    description:
      'Explore vetted startups, monitor growth KPIs, and invest with confidence in your future unicorns.',
  },
  {
    title: 'Smart Matching',
    iconColor: 'from-blue-500 to-indigo-600',
    iconPath:
      'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
    description:
      'Let our AI find the best-fit investor or startup — no more endless searching, just ideal alignment.',
  },
];

const AnimatedText = ({ text, className }) => {
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
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
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

const Home = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-white overflow-hidden">

      {/* Premium Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0">
          {/* Subtle Diamond Grid */}
          <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <div className="absolute inset-0 [background-size:80px_80px] [background-image:linear-gradient(to_right,transparent_50%,#000_50%),linear-gradient(to_bottom,transparent_50%,#000_50%)] rotate-45"></div>
          </div>
          
          {/* Geometric Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-50/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl"></div>
          
          {/* Metallic Accents */}
          <div className="absolute top-1/3 right-20 w-32 h-32 border-2 border-emerald-100 rounded-full rotate-45"></div>
          <div className="absolute bottom-1/4 left-20 w-24 h-24 border-2 border-blue-100 rounded-full rotate-12"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 flex flex-col items-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-3 rounded-full border border-slate-200 shadow-sm">
              <span className="h-2 w-2 bg-emerald-400 rounded-full mr-3"></span>
              <span className="text-slate-700 font-medium tracking-wider"> INVESTMENT PLATFORM</span>
            </div>
          </motion.div>

          {/* Animated Headline */}
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
              <div className="overflow-hidden">
                <AnimatedText 
                  text="Where Vision Meets" 
                  className="block font-light"
                />
              </div>
              <div className="overflow-hidden mt-4">
                <AnimatedText 
                  text="Strategic Capital" 
                  className="block bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent"
                />
              </div>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12"
            >
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                The exclusive platform connecting visionary startups with discerning investors for transformative growth
              </p>
            </motion.div>
          </div>

          {/* Premium Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-100 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { value: "$4.8B+", label: "Capital Deployed", accent: "text-emerald-500" },
              { value: "98%", label: "Success Rate", accent: "text-teal-500" },
              { value: "300+", label: "Premium Startups", accent: "text-blue-500" },
              { value: "120+", label: "Investor Network", accent: "text-indigo-500" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${stat.accent} mb-2`}>{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Exclusive CTA */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg shadow-lg transition-all group"
            >
              <div className="flex items-center gap-3">
                <span>Apply as Startup</span>
                <svg 
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(15, 118, 110, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg shadow-lg transition-all group"
            >
              <div className="flex items-center gap-3">
                <span>Become an Investor</span>
                <svg 
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Luxury Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>
      </div>

      {/* Premium Cards Section */}
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
              <div className="inline-block bg-slate-800 text-slate-200 px-4 py-1.5 rounded-full text-sm mb-6">
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
          
          {/* Premium Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -15 }}
                className="relative bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 group"
              >
                {/* Card Glow */}
              
                
                {/* Icon with Luxury Border */}
                <div className="mb-8">
                  <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.iconColor} flex items-center justify-center`}>
                      <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={card.iconPath} />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Luxury Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6"></div>

                {/* Learn More */}
                <div className="flex items-center text-emerald-600 font-medium group">
                 
                
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-16 h-16 rotate-45 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Premium CTA */}
          <motion.div
            className="mt-24 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Join Our Exclusive Network?
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-10">
              Apply today to become part of the premier investment ecosystem connecting exceptional startups with visionary investors.
            </p>
            <div className="flex justify-center">
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

      {/* Luxury Footer */}
     
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
         
         
        </div>
      </div>
    
  );
};

export default Home;