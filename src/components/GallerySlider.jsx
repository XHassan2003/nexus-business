import React from 'react';

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-green-600">Success Stories</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover how startups achieved their goals through our platform
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-6 pb-4 snap-x snap-mandatory">
              {successStories.map((story, idx) => (
                <div
                  key={idx}
                  className="min-w-[300px] md:min-w-[400px] snap-center shrink-0 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600">
                      {story.description}
                    </p>
                  </div>
                </div>
              ))}
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
      </div>
    </section>
  );
}