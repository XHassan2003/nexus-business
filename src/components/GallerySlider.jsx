import React from 'react';
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

  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              Success Stories
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Discover how startups achieved their goals through our platform
          </p>
        </div>

        <div className="relative">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 pb-4 snap-x snap-mandatory px-2">
              {successStories.map((story, idx) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  key={idx}
                  className="min-w-[300px] md:min-w-[400px] snap-center shrink-0 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-t-2xl"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition duration-300">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{story.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
      `}</style>
    </section>
  );
}
