import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';  // ✅ Add this line back
import { Github, Twitter, Linkedin, Mail, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media data with animations
  const socialLinks = [
    { 
      icon: <Github className="h-5 w-5" />, 
      url: "https://github.com", 
      color: "from-gray-700 to-gray-900",
      hover: "hover:shadow-gray-500/20"
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      url: "https://twitter.com", 
      color: "from-blue-400 to-blue-600",
      hover: "hover:shadow-blue-500/20"
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      url: "https://linkedin.com", 
      color: "from-blue-600 to-blue-800",
      hover: "hover:shadow-blue-500/20"
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      url: "mailto:contact@nexus.com", 
      color: "from-emerald-500 to-teal-600",
      hover: "hover:shadow-emerald-500/20"
    }
  ];

  // Footer navigation data
  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Press", path: "/press" }
  ];

  const resourceLinks = [
    { name: "Blog", path: "/blog" },
    { name: "Help Center", path: "/contact" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacypolicy" }
  ];

  const animateItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-b from-slate-50 to-white border-t border-slate-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 
                  ? '#10b981' 
                  : i % 3 === 1 
                  ? '#0ea5e9' 
                  : '#8b5cf6'
              }, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-5%", "0%"],
              x: ["0%", "3%", "0%"]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <div className="absolute inset-0 [background-size:80px_80px] [background-image:linear-gradient(to_right,transparent_50%,#000_50%),linear-gradient(to_bottom,transparent_50%,#000_50%)] rotate-45"></div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <motion.div 
            className="space-y-6"
            variants={animateItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                Nexus
              </span>
            </Link>
            
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Connecting innovative startups with visionary investors to build the future of business.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br ${social.color} text-white shadow-md ${social.hover} transition-all`}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Company links */}
          <motion.div
            variants={animateItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-5 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-teal-600">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  variants={animateItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-slate-600 hover:text-emerald-600 flex items-center group transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Resources links */}
          <motion.div
            variants={animateItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-5 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-teal-600">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  variants={animateItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-slate-600 hover:text-emerald-600 flex items-center group transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div
            variants={animateItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-5 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-teal-600">
              Newsletter
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Stay updated with the latest investment opportunities and startup insights.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent peer"
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 peer-focus:w-full"></div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        {/* Copyright section */}
        <motion.div 
          className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-center text-slate-500 text-sm mb-4 md:mb-0">
            © {currentYear} Nexus Business. All rights reserved.
          </p>
          <div className="flex items-center">
            <span className="text-slate-500 text-sm mr-2">Made with</span>
            <Heart className="h-4 w-4 text-rose-500 fill-current" />
            <span className="text-slate-500 text-sm ml-2">for innovators</span>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
    </motion.footer>
  );
};

export default Footer;
