import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          <span className="text-green-600">What Our Users Say</span>
        </h2>
        <p className="text-gray-500 text-lg mb-12">
          Real voices from founders and investors in our network.
        </p>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="bg-white/30 backdrop-blur-xl border border-green-100 rounded-3xl shadow-2xl px-6 py-10 md:p-12 mx-auto max-w-2xl"
            >
              <div className="flex flex-col items-center">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-white hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{testimonials[current].name}</h3>
                <p className="text-green-600 text-sm">{testimonials[current].role}</p>

                <div className="flex my-3">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-lg text-gray-700 italic leading-relaxed">"{testimonials[current].quote}"</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-green-100 hover:scale-105 transition"
          >
            <ChevronLeft className="text-green-600 w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-green-100 hover:scale-105 transition"
          >
            <ChevronRight className="text-green-600 w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === idx ? 'bg-green-600 scale-110' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
