// PremiumServicesSection.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  Rocket,
  LineChart,
  Handshake,
  ShieldCheck,
  Users2,
  Briefcase,
} from "lucide-react";

/**
 * Usage:
 * - Place this file in your components folder and import <PremiumServicesSection />
 * - Install lucide-react: npm i lucide-react
 * - Tailwind: this uses standard utility classes; add line-clamp plugin if you want
 */

/* ------------------ Data ------------------ */
const newsLogos = [
  { alt: "CNN", src: "/CNN.svg" },
  { alt: "BBC", src: "/BBC.svg" },
  { alt: "Al Jazeera", src: "/Al Jazeera.svg" },
  { alt: "Reuters", src: "/Reuters.svg" },
  { alt: "CNBC", src: "/CNBC.svg" },
  { alt: "Entrepreneur", src: "/Entrepreneur.svg" },
];

const services = [
  {
    name: "Startup Support",
    description:
      "End-to-end guidance for early-stage startups, including pitch deck help and business model validation.",
    icon: Rocket,
  },
  {
    name: "Investment Opportunities",
    description:
      "Gain access to verified investors seeking innovative and high-growth startups.",
    icon: LineChart,
  },
  {
    name: "Strategic Matching",
    description:
      "Connect startups and investors using intelligent matching algorithms and sector-based targeting.",
    icon: Handshake,
  },
  {
    name: "Data Security & Compliance",
    description:
      "Enterprise-grade security, role-based access, and compliance measures for safe collaboration.",
    icon: ShieldCheck,
  },
  {
    name: "Investor Relations",
    description:
      "Manage investor communications, data rooms, and fundraising progress in one place.",
    icon: Users2,
  },
  {
    name: "Portfolio Management",
    description:
      "Investors can track their startup portfolios, KPIs, milestones, and exit potential.",
    icon: Briefcase,
  },
];

/* ------------------ Premium Badge ------------------ */
const PremiumBadge = () => (
  <div className="absolute -top-3 -left-3 bg-gradient-to-r from-amber-400 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:scale-110 hover:rotate-12 transition-transform duration-300 z-20 group-hover:from-amber-300 group-hover:to-rose-400">
    PREMIUM
  </div>
);

/* ------------------ Scroll Animation Hook ------------------ */
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '-50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

/* ------------------ Animated Section Wrapper ------------------ */
const AnimatedSection = ({ children, delay = 0, threshold = 0.1, className = "" }) => {
  const [ref, isVisible] = useScrollAnimation(threshold);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
};

/* ------------------ Single Service Card ------------------ */
const ServiceCard = ({ service}) => {
  const Icon = service.icon;
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Premium 3D tilt with depth effect
  const tiltStyle = {
    transform: isHovered 
      ? `perspective(1000px) rotateX(${mousePosition.y * 6}deg) rotateY(${mousePosition.x * 6}deg) scale3d(1.05, 1.05, 1.05) translateZ(20px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)',
    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  // Dynamic gradient that follows mouse
  const glowStyle = {
    background: isHovered 
      ? `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.08) 40%, transparent 70%)`
      : 'transparent',
    transition: 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  // Floating shadow effect
  const shadowStyle = {
    boxShadow: isHovered 
      ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 
         ${mousePosition.x * 10}px ${mousePosition.y * 10}px 30px rgba(16, 185, 129, 0.15)`
      : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  };

  return (
    <div
      ref={cardRef}
      className="relative w-72 md:w-80 flex-shrink-0 rounded-2xl p-5 bg-white/95 backdrop-blur-sm border border-emerald-100 overflow-hidden group cursor-pointer"
      style={{ ...tiltStyle, ...shadowStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient overlay that follows mouse */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        style={glowStyle}
      />
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-green-500/15 to-teal-400/20 rounded-2xl" />
        <div className="absolute inset-[1px] rounded-2xl bg-white/95 backdrop-blur-sm" />
      </div>
      
      {/* Subtle particle effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-1000" />
        <div className="absolute bottom-4 left-3 w-1 h-1 bg-green-400 rounded-full group-hover:scale-200 transition-transform duration-700 delay-200" />
      </div>
      
      <PremiumBadge />
      
      <div className="relative z-10 flex items-start gap-4">
        {/* Enhanced icon container with floating effect */}
        <div className="relative w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-white/80 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <Icon className="w-7 h-7 text-emerald-600 group-hover:text-emerald-700 transition-all duration-500 group-hover:scale-110" />
          {/* Icon glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-200/40 to-green-300/30 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-1">
            {service.name}
          </h4>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3 group-hover:text-gray-700 transition-all duration-300 group-hover:translate-x-1">
            {service.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 group-hover:translate-x-1">
          Trusted • Secure • Fast
        </div>
        
        {/* Enhanced button with magnetic hover effect */}
        <button className="relative overflow-hidden text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md group-hover:shadow-xl transition-all duration-500 hover:scale-105 hover:from-emerald-500 hover:to-green-400">
          <span className="relative z-10 flex items-center gap-1">
            Get Access
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          
          {/* Button pulse effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </button>
      </div>
    </div>
  );
};

/* ------------------ NEW: Image Hover Card for MarketSurge, Leaderboard, MarketDiem ------------------ */
const ImageHoverCard = ({ title, description, image }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    setMousePosition({ x, y });
  };

  // Premium card tilt with depth
  const tiltStyle = {
    transform: isHovered 
      ? `perspective(1000px) rotateX(${mousePosition.y * 4}deg) rotateY(${mousePosition.x * 4}deg) scale3d(1.02, 1.02, 1.02) translateZ(10px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  // Enhanced shadow effect
  const shadowStyle = {
    boxShadow: isHovered 
      ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 
         ${mousePosition.x * 6}px ${mousePosition.y * 6}px 20px rgba(16, 185, 129, 0.1)`
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)',
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-2xl overflow-hidden group cursor-pointer h-80"
      style={{ ...tiltStyle, ...shadowStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110" 
        />
        
        {/* Gradient Overlay - Base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Hover Overlay - Premium Reveal Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/80 to-green-900/90 backdrop-blur-sm transition-all duration-500 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>
          
          {/* Content Container */}
          <div className={`relative z-10 h-full flex flex-col justify-end p-6 text-white transition-all duration-500 ease-out ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <h3 className="text-2xl font-bold mb-3 leading-tight">{title}</h3>
            <p className="text-gray-200 mb-6 leading-relaxed">{description}</p>
            
            {/* Enhanced Button */}
            <button className="relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-900 font-semibold rounded-full transition-all duration-300 hover:bg-emerald-50 hover:scale-105 hover:shadow-lg group/btn overflow-hidden">
              <span className="relative z-10">Explore Feature</span>
              <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
            </button>
          </div>
        </div>
        
        {/* Initial Content (Visible when not hovered) */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 ease-out ${
          isHovered ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-emerald-200 font-medium">Premium Feature</span>
            <div className="flex items-center gap-1 text-xs text-white/80">
              <span>Hover to explore</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Subtle Border Glow */}
        <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-emerald-400/30 via-green-500/20 to-teal-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
          <div className="absolute inset-[2px] rounded-2xl bg-white" />
        </div>
      </div>
    </div>
  );
};

/* ------------------ OLD Tools Grid Card (Keeping for reference but not used) ------------------ */
const ToolsCard = ({ title, description, image, href }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    setMousePosition({ x, y });
  };

  // Premium card tilt with depth
  const tiltStyle = {
    transform: isHovered 
      ? `perspective(1000px) rotateX(${mousePosition.y * 4}deg) rotateY(${mousePosition.x * 4}deg) scale3d(1.04, 1.04, 1.04) translateZ(15px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  // Enhanced shadow effect
  const shadowStyle = {
    boxShadow: isHovered 
      ? `0 20px 40px -10px rgba(0, 0, 0, 0.2), 
         inset 0 1px 0 rgba(255, 255, 255, 0.6),
         ${mousePosition.x * 8}px ${mousePosition.y * 8}px 25px rgba(16, 185, 129, 0.1)`
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)',
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-2xl p-6 border border-emerald-100 overflow-hidden group cursor-pointer"
      style={{ ...tiltStyle, ...shadowStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-green-50/0 to-teal-50/0 group-hover:from-emerald-50/40 group-hover:via-green-50/30 group-hover:to-teal-50/20 transition-all duration-700" />
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-green-500/20 to-teal-400/30 rounded-2xl blur-sm" />
        <div className="absolute inset-[1px] rounded-2xl bg-white" />
      </div>

      <div className="relative z-10">
        {/* Enhanced image container */}
        <div className="relative overflow-hidden rounded-lg mb-4 group-hover:rounded-xl transition-all duration-500">
          <img 
            src={image} 
            alt={title} 
            className="w-full object-cover h-40 group-hover:scale-110 transition-transform duration-700" 
          />
          {/* Image overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/0 via-emerald-900/0 to-emerald-900/0 group-hover:via-emerald-900/10 group-hover:to-emerald-900/20 transition-all duration-500" />
          
          {/* Image shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
        
        {/* Content with subtle hover animations */}
        <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300 group-hover:translate-x-1">
          {title}
        </h4>
        <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300 group-hover:translate-x-1">
          {description}
        </p>
        
        {/* Enhanced button */}
        <a 
          className="relative inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow group-hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:scale-105"
          href={href}
        >
          <span className="relative z-10">Try Now</span>
          
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Button shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
        </a>
      </div>
    </div>
  );
};

/* ------------------ Main Component ------------------ */
export default function PremiumServicesSection() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  // Respect prefers-reduced-motion
  const [reducedMotion] = useState(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    function onEnter() {
      setIsPaused(true);
    }
    function onLeave() {
      setIsPaused(false);
    }
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with enhanced scroll animation */}
        <AnimatedSection delay={0} threshold={0.2}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Handpicked for Growth
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              A premium suite of tools and services that helps founders and investors move faster —
              thoughtfully designed, deeply secure.
            </p>
          </div>
        </AnimatedSection>

        {/* Auto-run card row */}
        <AnimatedSection delay={200} threshold={0.15}>
          <div className="relative overflow-hidden py-6">
            <div className="flex gap-6 px-2 will-change-transform">
              {[...services, ...services].map((s, i) => (
                <ServiceCard key={i} service={s} />
              ))}
            </div>

            {/* Gradient fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/100 via-white/80 to-white/0 z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/100 via-white/80 to-white/0 z-10"></div>
          </div>
        </AnimatedSection>

        {/* News logos marquee */}
        <AnimatedSection delay={400} threshold={0.1}>
          <div className="mt-10 bg-white rounded-3xl p-4 shadow-md border border-gray-100 group/marquee">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Featured In
            </h3>

            <div
              ref={marqueeRef}
              className="relative overflow-hidden rounded-xl"
              aria-label="News logos carousel"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className={`flex gap-8 items-center will-change-transform ${
                  reducedMotion ? "" : "animate-marquee"
                }`}
                style={{ animationPlayState: isPaused ? "paused" : "running" }}
              >
                {[...newsLogos, ...newsLogos].map((logo, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center w-36 flex-shrink-0 opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110 group-hover/marquee:scale-95 group-hover/marquee:hover:scale-110"
                  >
                    <div className="relative p-3 rounded-2xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 transition-all duration-500">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-10 object-contain mb-1 filter grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 mt-1 hover:text-emerald-600 transition-colors duration-300">
                      {logo.alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Tools Grid */}
        <AnimatedSection delay={600} threshold={0.1}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImageHoverCard
              title="MarketSurge"
              description="Make your stock research more efficient. Get all the tools you need to find opportunities and act with confidence."
              image="/investor 1.png"
              href="Marketsurge"
            />
            <ImageHoverCard
              title="Leaderboard"
              description="Expert-selected model portfolios and step-by-step trading plans built for real results."
              image="/Leaderboard.png"
              href="#"
            />
            <ImageHoverCard
              title="MarketDiem"
              description="Daily trade ideas and market analysis in a quick, consumable format."
              image="/MarketDiem.png"
              href="#"
            />
          </div>
        </AnimatedSection>
      </div>

      {/* Scoped Styles */}
<style>{`
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
`}</style>
    </section>
  );
}