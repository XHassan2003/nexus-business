import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import GallerySlider from '../components/GallerySlider';
import Testimonials from '../components/Testimonials'; 

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <GallerySlider />
      <Testimonials />
    </div>
  );
}
