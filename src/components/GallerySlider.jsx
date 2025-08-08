import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GallerySlider() {
  const successStories = [
    {
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      title: 'Tech Startup Success',
      description: 'AI-driven healthcare solution secured $2M funding'
    },
    {
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
      title: 'Green Innovation',
      description: 'Sustainable energy startup partnered with major investors'
    },
    {
      image: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg',
      title: 'FinTech Revolution',
      description: 'Digital banking platform raised Series A funding'
    },
    {
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
      title: 'E-commerce Growth',
      description: 'D2C brand secured strategic investment'
    },
    {
      image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg',
      title: 'EdTech Innovation',
      description: 'Online learning platform expanded globally'
    }
  ];

  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.querySelector('.gallery-card')?.offsetWidth || 300;
      const gap = 32;
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      setActiveIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;
    
    const card = container.querySelectorAll('.gallery-card')[index];
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const gap = 32;
    const scrollPosition = index * (cardWidth + gap);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-50 to-transparent opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700">
              Success Stories
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Discover how startups achieved their goals through our platform
          </motion.p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          {/* Navigation arrows */}
          {showArrows && (
            <>
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all transform -translate-x-2 opacity-0 animate-fade-in"
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all transform translate-x-2 opacity-0 animate-fade-in"
                onClick={() => scrollToIndex(Math.min(successStories.length - 1, activeIndex + 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Gallery slider */}
          <div 
            ref={containerRef}
            className="overflow-x-auto hide-scrollbar py-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex gap-8 pb-6 px-4">
              {successStories.map((story, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  className="gallery-card min-w-[300px] md:min-w-[400px] bg-white rounded-2xl overflow-hidden shadow-xl relative group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-56 md:h-64 object-cover"
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: isHovering ? 1.05 : 1 
                      }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  </div>
                  
                  <div className="p-6 relative z-10">
                    <motion.div 
                      className="absolute -top-5 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Featured
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {story.description}
                    </p>
                    
                    <motion.div 
                      className="mt-4 flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Read full story
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {successStories.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeIndex 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 w-8' 
                  : 'bg-gray-300'
              }`}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s forwards;
        }
      `}</style>
    </section>
  );
}