// Testimonials.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Interior Designer',
    text: 'Homestyler completely transformed how I present my work. The interface is intuitive and the gallery features are stunning!',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Michael Brown',
    role: 'Architect',
    text: 'The design experience is seamless. I can showcase projects with elegance and receive client feedback instantly.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Emily Davis',
    role: 'Home Stylist',
    text: 'The platform makes my designs stand out. It’s modern, creative, and easy to use. Highly recommended!',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-emerald-50 to-white py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-emerald-700 mb-12"
        >
          What Our Clients Say
        </motion.h2>

        {/* Testimonial Card */}
        <div className="relative w-full max-w-3xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-10 rounded-3xl shadow-xl relative"
            >
              <Quote className="absolute top-6 left-6 text-emerald-300 w-10 h-10 opacity-60" />
              <div className="flex flex-col items-center mt-8">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-24 h-24 rounded-full border-4 border-emerald-100 shadow-md mb-4"
                />
                <p className="text-gray-600 italic mb-6 max-w-md">
                  “{testimonials[current].text}”
                </p>
                <h3 className="text-lg font-semibold text-emerald-700">
                  {testimonials[current].name}
                </h3>
                <p className="text-sm text-emerald-500">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
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

          {/* Progress Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1);
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

        {/* Branding / Rating */}
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
            <span className="text-emerald-700 font-medium">
              Rated 5.0 by 500+ professionals
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
