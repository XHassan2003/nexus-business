import React, { useEffect, useState } from "react";

export default function WelcomePopup({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate popup after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400); // wait for animation to finish
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`
          bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden 
          transform transition-all duration-500 ease-out
          ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
      >
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mb-6 animate-bounce">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:rotate-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-green-800 mb-4 tracking-tight">
            Welcome to Nexus Website
          </h2>

          {/* Subheading */}
          <p className="text-green-700 mb-8 text-lg leading-relaxed italic">
            Start your journey with us and explore endless possibilities.
          </p>

          {/* Button */}
          <button
            onClick={handleClose}
            className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 
            text-white font-semibold py-3 px-10 rounded-xl transition-all duration-300 
            transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 
            shadow-md hover:shadow-2xl relative overflow-hidden"
          >
            <span className="relative z-10">Begin Journey</span>
            <span className="absolute inset-0 bg-green-400 opacity-20 blur-xl rounded-xl animate-pulse"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
