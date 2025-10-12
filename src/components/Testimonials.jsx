// Testimonials.jsx
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

crev}
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
