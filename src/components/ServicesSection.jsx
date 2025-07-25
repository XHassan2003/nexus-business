import React from 'react';
import {
  Rocket,
  LineChart,
  Handshake,
  ShieldCheck,
  Users2,
  Briefcase,
} from 'lucide-react';

const newsLogos = [
  {
    alt: 'CNN',
    src: '/CNN.svg',
  },
  {
    alt: 'BBC',
    src: '/BBC.svg',
  },
  {
    alt: 'Al Jazeera',
    src: '/Al Jazeera.svg',
  },
  {
    alt: 'Reuters',
    src: '/Reuters.svg',
  },
  {
    alt: 'CNBC',
    src: '/CNBC.svg',
  },
  {
    alt: 'Entrepreneur',
    src: '/Entrepreneur.svg',
  },
];

const services = [
  {
    name: 'Startup Support',
    description:
      'End-to-end guidance for early-stage startups, including pitch deck help and business model validation.',
    icon: Rocket,
  },
  {
    name: 'Investment Opportunities',
    description:
      'Gain access to verified investors seeking innovative and high-growth startups.',
    icon: LineChart,
  },
  {
    name: 'Strategic Matching',
    description:
      'Connect startups and investors using intelligent matching algorithms and sector-based targeting.',
    icon: Handshake,
  },
  {
    name: 'Data Security & Compliance',
    description:
      'Enterprise-grade security, role-based access, and compliance measures for safe collaboration.',
    icon: ShieldCheck,
  },
  {
    name: 'Investor Relations',
    description:
      'Manage investor communications, data rooms, and fundraising progress in one place.',
    icon: Users2,
  },
  {
    name: 'Portfolio Management',
    description:
      'Investors can track their startup portfolios, KPIs, milestones, and exit potential.',
    icon: Briefcase,
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-white">
      {/* === Services === */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-green-600 mb-4">
          Our Services
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We offer secure and smart tools that help startups and investors find alignment, build relationships, and grow together.
        </p>

        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4 md:pb-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="min-w-[250px] md:min-w-[280px] rounded-xl bg-white text-green-800 border border-green-200 shadow-sm hover:shadow-[0_8px_24px_rgba(34,197,94,0.2)] hover:bg-green-50 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-sm text-green-700">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* === News Logos === */}
      <div className="py-12 bg-white border-t border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-8">
          Find us in the news
        </h2>
        <div className="overflow-hidden relative group">
          <div className="flex space-x-12 animate-[scroll_25s_linear_infinite] group-hover:[animation-play-state:paused]">
            {newsLogos.concat(newsLogos).map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center flex-shrink-0 w-36 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-auto object-contain mb-2"
                />
                <span className="text-green-700 font-bold text-sm text-center">{logo.alt}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* === Investment Tools Section === */}
      <div className="py-16 bg-green-50 border-t border-green-200">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          Tools to Suit Your Investing Style
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
          {/* MarketSurge */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <img src="/investor 1.png" alt="MarketSurge" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">MarketSurge</h3>
            <p className="text-green-800 mb-4">
              Make your stock research more efficient. Get all the tools you need to find stocks, research their potential, and decide when to buy and sell.
            </p>
            <a href="/marketsurge" className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md inline-block text-sm font-medium">
              Try Now
            </a>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <img src="/Leaderboard.png" alt="Leaderboard" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">Leaderboard</h3>
            <p className="text-green-800 mb-4">
              With Leaderboard, IBD’s experts give you a model portfolio of the best 10–15 stocks to buy, plus full trading plans for each pick.
            </p>
            <a href="/leaderboard" className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md inline-block text-sm font-medium">
              Try Now
            </a>
          </div>

          {/* MarketDiem */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <img src="/MarketDiem.png" alt="MarketDiem" className="mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">MarketDiem</h3>
            <p className="text-green-800 mb-4">
              MarketDiem is a daily newsletter that gives you trade ideas for stocks and options plus market analysis, all in a 5-minute read.
            </p>
            <a href="/marketdiem" className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md inline-block text-sm font-medium">
              Try Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
