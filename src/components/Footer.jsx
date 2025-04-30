import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-green-600 font-bold text-lg">Nexus Business</h3>
            <p className="text-gray-500 text-sm">
              Connecting innovative startups with visionary investors.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-gray-700">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-gray-700">Contact</Link>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">Careers</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-500 text-sm mb-4">
              Stay updated with the latest in startup investments.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Nexus Business. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;