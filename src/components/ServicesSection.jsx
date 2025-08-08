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
  <div className="absolute -top-3 -left-3 bg-gradient-to-r from-amber-400 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
    PREMIUM
  </div>
);

/* ------------------ Single Service Card ------------------ */
const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  const ref = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
  });

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2; // -1..1
    const py = (y / rect.height - 0.5) * -2; // -1..1 (invert)
    const rotateY = px * 6; // degrees
    const rotateX = py * 6;
    setTransformStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
      transition: "transform 0s",
    });
  }

  function handleLeave() {
    setTransformStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 450ms cubic-bezier(.2,.9,.2,1)",
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-72 md:w-80 flex-shrink-0 rounded-2xl p-5 bg-white/90 backdrop-blur-sm border border-transparent hover:border-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-300"
      style={transformStyle}
    >
      <PremiumBadge />
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-white">
          <Icon className="w-7 h-7 text-emerald-600" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{service.name}</h4>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{service.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500">Trusted • Secure • Fast</div>
        <button className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md hover:scale-105 transition-transform">
          Get Access
        </button>
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
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900">Handpicked for Growth</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            A premium suite of tools and services that helps founders and investors move faster —
            thoughtfully designed, deeply secure.
          </p>
        </div>

        {/* ---------------- Auto-run card row ---------------- */}
        <div className="relative overflow-hidden py-6">
          <div
            className={`flex gap-6 px-2 will-change-transform transition-transform duration-500`}
            // If user pauses (hover) we freeze transforms via CSS below.
          >
            {[...services, ...services].map((s, i) => (
              <ServiceCard key={i} service={s} />
            ))}
          </div>

          {/* left/right gradient fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/100 to-white/0"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/100 to-white/0"></div>
        </div>

        {/* ---------------- News logos marquee ---------------- */}
        <div className="mt-10 bg-white rounded-3xl p-4 shadow-md border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Featured In</h3>

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
                  className="flex flex-col items-center w-36 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <img src={logo.src} alt={logo.alt} className="h-10 object-contain mb-1" />
                  <span className="text-xs font-semibold text-gray-600">{logo.alt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- Tools grid ---------------- */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <img src="/investor 1.png" alt="MarketSurge" className="mb-4 rounded-lg w-full object-cover h-40" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">MarketSurge</h4>
            <p className="text-gray-600 mb-4">
              Make your stock research more efficient. Get all the tools you need to find opportunities and act with confidence.
            </p>
            <a className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow" href="Marketsurge">
              Try Now
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <img src="/Leaderboard.png" alt="Leaderboard" className="mb-4 rounded-lg w-full object-cover h-40" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Leaderboard</h4>
            <p className="text-gray-600 mb-4">
              Expert-selected model portfolios and step-by-step trading plans built for real results.
            </p>
            <a className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow" href="#">
              Try Now
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <img src="/MarketDiem.png" alt="MarketDiem" className="mb-4 rounded-lg w-full object-cover h-40" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">MarketDiem</h4>
            <p className="text-gray-600 mb-4">Daily trade ideas and market analysis in a quick, consumable format.</p>
            <a className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow" href="#">
              Try Now
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- Scoped styles (Tailwind + keyframes) ---------------- */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 16s;
          }
        }
      `}</style>
    </section>
  );
}
