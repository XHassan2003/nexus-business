// Testimonials.jsx
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Founder, TechHealth Solutions',
    quote: 'Nexus Business helped us find the perfect investors who shared our vision for revolutionizing healthcare technology.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Angel Investor',
    quote: "The platform's matching algorithm is exceptional. I discovered startups perfectly aligned with my strategy.",
    rating: 5,
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
  },
  {
    name: 'Emily Zhang',
    role: 'CEO, GreenTech Innovations',
    quote: 'Thanks to Nexus Business, we connected with green investors who truly believed in our energy solution.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
  },
  {
    name: 'David Park',
    role: 'Venture Capitalist',
    quote: 'Nexus streamlined the whole process. The quality and data-rich profiles made due diligence simple.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 0: right, 1: left

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(0);
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setDirection(1);
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const handleNext = () => {
    setDirection(0);
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  // Animation variants (fixed: removed TypeScript type)
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    })
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white via-[#f0fdfa] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-emerald-50/70 to-transparent -z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-emerald-50/70 to-transparent -z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-56 h-56 rounded-full bg-emerald-200/30 blur-3xl -z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-teal-200/30 blur-3xl -z-0"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500">
              Voices of Success
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real voices from founders and investors in our network.
          </p>
        </motion.div>

        <div className="relative h-[500px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex justify-center"
            >
              <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden relative">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                <div className="absolute top-8 -left-8 w-16 h-16 rounded-full bg-emerald-100/50 -z-10"></div>
                <div className="absolute bottom-8 -right-8 w-16 h-16 rounded-full bg-teal-100/50 -z-10"></div>
                
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        className="relative"
                      >
                        <img
                          src={testimonials[current].image}
                          alt={testimonials[current].name}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-600 to-teal-500 p-2 rounded-full">
                          <Quote className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                        <span className="text-emerald-700 font-bold">
                          {testimonials[current].rating}.0
                        </span>
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-3">
                        {[...Array(testimonials[current].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-900">{testimonials[current].name}</h3>
                        <p className="text-emerald-600 font-medium mb-4">{testimonials[current].role}</p>
                        <div className="relative">
                          <Quote className="absolute -top-6 -left-2 text-emerald-100 w-12 h-12" />
                          <p className="text-lg text-gray-700 italic leading-relaxed relative">
                            "{testimonials[current].quote}"
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#0d9488' }}
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-600 p-3 rounded-full shadow-lg z-20"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#0d9488' }}
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-600 p-3 rounded-full shadow-lg z-20"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </motion.button>

          {/* Progress */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 0 : 1);
                    setCurrent(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    current === idx
                      ? 'w-8 bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'w-4 bg-emerald-200'
                  }`}
                  whileHover={{ scaleY: 1.5 }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Branding */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-100 shadow-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-emerald-700 font-medium">Rated 5.0 by 500+ professionals</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
