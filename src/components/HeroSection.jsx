import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Startup Journey',
    iconColor: 'from-green-400 to-emerald-600',
    iconPath:
      'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    description:
      'Pitch your startup with elegance, connect with investors who see your vision, and accelerate your growth with style.',
  },
  {
    title: 'Investment Opportunities',
    iconColor: 'from-blue-400 to-blue-600',
    iconPath:
      'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    description:
      'Explore vetted startups, monitor growth KPIs, and invest with confidence in your future unicorns.',
  },
  {
    title: 'Smart Matching',
    iconColor: 'from-purple-500 to-indigo-600',
    iconPath:
      'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
    description:
      'Let our AI find the best-fit investor or startup — no more endless searching, just ideal alignment.',
  },
];

const Home = () => {
  return (
    <div className="relative py-24 bg-gradient-to-b from-white via-green-50 to-white overflow-hidden">
      {/* Glow background */}
      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[80vw] h-[80vw] bg-green-200/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base font-semibold text-green-600 uppercase tracking-wider"
          >
            Welcome to Nexus Business
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            <span className="block">Where Vision</span>
            <span className="text-green-600">Meets Investment</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Empower startups and investors to connect, collaborate, and build the future together.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative group bg-white/60 backdrop-blur-xl border border-green-100 rounded-3xl p-8 shadow-xl transition duration-300 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="absolute -top-6 left-6">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${card.iconColor} flex items-center justify-center shadow-md ring-4 ring-white`}>
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.iconPath} />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition">
                  {card.title}
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-green-400 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
