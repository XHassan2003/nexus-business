import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import GallerySlider from '../components/GallerySlider';
import Testimonials from '../components/Testimonials'; 
import WelcomePopup from '../components/WelcomePopup';

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      {/* Show popup on page load */}
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}

      {/* Homepage sections */}
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        <ServicesSection />
        <GallerySlider />
        <Testimonials />
      </div>
    </>
  );
}
