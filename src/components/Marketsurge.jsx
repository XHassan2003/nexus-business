import React from "react";
import heroImage from "/investor 1.png";

const HomePage = () => {
  return (
    <div className="font-sans text-white bg-[#0d1117] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative">
        {/* Background SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-[#0d1117]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#111827"
            fillOpacity="1"
            d="M0,160L60,149.3C120,139,240,117,360,117.3C480,117,600,139,720,160C840,181,960,203,1080,186.7C1200,171,1320,117,1380,90.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>

        {/* Hero Text */}
        <div className="relative z-10 pt-40 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Your shortcut to{" "}
            <span className="text-green-400">smart stock research</span>
            <br /> starts here.
          </h1>
          <button className="mt-6 px-6 py-3 bg-green-400 hover:bg-green-500 text-black font-bold rounded-md shadow-md transition-all">
            START YOUR 14-DAY FREE TRIAL
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative z-10 flex justify-center mt-10 sm:mt-14 md:mt-20">
          <img
            src={heroImage}
            alt="MarketSurge Laptop"
            className="w-[260px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto object-contain drop-shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#111827] text-center px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <h3 className="text-green-400 font-bold text-sm mb-3">
              Streamlined & Powerful
            </h3>
            <p className="text-sm text-gray-300">
              With less noise and more signal, your ideas are surfaced faster.
              Everything is purpose-built to help you research smarter.
            </p>
          </div>
          <div>
            <h3 className="text-green-400 font-bold text-sm mb-3">
              The Biggest Time-Saver
            </h3>
            <p className="text-sm text-gray-300">
              Jump straight into top-rated stocks based on proven strategies and
              reduce hours of research time.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#0d1117] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-lg font-semibold text-green-400 mb-2">
            MarketSurge is trusted and recommended by top traders.
          </h2>
          <button className="mb-10 px-6 py-2 bg-green-400 hover:bg-green-500 text-sm text-black font-bold rounded-md shadow-md transition-all">
            START YOUR 14-DAY FREE TRIAL
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Mark Minervini",
                quote:
                  "The research tool I used to win the US Investing Championship twice. MarketSurge gives me ideas lightning fast.",
              },
              {
                name: "Dr. Tom Carr",
                quote:
                  "I save hundreds of hours a year with MarketSurge. It’s simple, powerful and has become my daily research platform.",
              },
              {
                name: "Howard Lindzon",
                quote:
                  "MarketSurge is one of my top go-to resources. It’s powerful, intuitive and helps me move fast in the markets.",
              },
              {
                name: "Brian Shannon",
                quote:
                  "MarketSurge is my best resource for a tech-focused overview. It cuts through noise and shows me key signals quickly.",
              },
              {
                name: "Linda Raschke",
                quote:
                  "I’ve used MarketSurge daily to identify high-potential stocks. It’s saved me countless hours of manual filtering.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white text-black p-6 rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300"
              >
                <p className="text-sm mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-sm text-right">
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1117] text-gray-500 py-6 text-center border-t border-gray-700">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} MarketSurge. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
