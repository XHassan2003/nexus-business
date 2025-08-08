import React, { useState } from 'react';
import { MessageSquare, Send, Check, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  // Floating animation variants
  const floatingVariants = {
    float: {
      y: ["0%", "-5%", "0%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 
                  ? '#10b981' 
                  : i % 3 === 1 
                    ? '#0ea5e9' 
                    : '#8b5cf6'
              }, transparent)`,
            }}
            variants={floatingVariants}
            animate="float"
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <div className="absolute inset-0 [background-size:80px_80px] [background-image:linear-gradient(to_right,transparent_50%,#000_50%),linear-gradient(to_bottom,transparent_50%,#000_50%)] rotate-45"></div>
        </div>
      </div>

      {/* Header */}
      <motion.div 
        className="max-w-2xl mx-auto text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 border border-slate-200 shadow-sm mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <MessageSquare className="h-10 w-10 text-emerald-600" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Contact <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Nexus</span>
        </motion.h1>
        
        <motion.p 
          className="mt-4 text-gray-600 text-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          We'd love to hear from you. Whether you're a startup, investor, or just curious—let's start a conversation.
        </motion.p>
      </motion.div>

      {/* Form Section */}
      <motion.div 
        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ y: -5 }}
      >
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 rotate-45 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
        </div>

        <div className="px-8 py-12 sm:p-12 relative z-10">
          {isSubmitted && (
            <motion.div 
              className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4 flex items-center space-x-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-emerald-800 font-medium">Your message was sent successfully!</p>
                <p className="text-emerald-700 text-sm">We'll respond within 24 hours.</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="name" 
                  className={`absolute left-5 transition-all duration-300 ease-in-out transform ${
                    isFocused.name || formData.name 
                      ? 'top-1 text-xs text-emerald-600 -translate-y-2' 
                      : 'top-4 text-gray-500'
                  } bg-white px-1 peer-focus:top-1 peer-focus:text-xs peer-focus:text-emerald-600 peer-focus:-translate-y-2`}
                >
                  Full Name
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 peer-focus:w-full"></div>
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className={`absolute left-5 transition-all duration-300 ease-in-out transform ${
                    isFocused.email || formData.email 
                      ? 'top-1 text-xs text-emerald-600 -translate-y-2' 
                      : 'top-4 text-gray-500'
                  } bg-white px-1 peer-focus:top-1 peer-focus:text-xs peer-focus:text-emerald-600 peer-focus:-translate-y-2`}
                >
                  Email Address
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 peer-focus:w-full"></div>
              </div>
              
              <div className="sm:col-span-2 relative">
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={() => handleBlur('subject')}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent peer"
                >
                  <option value=""> </option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Startup Support">Startup Support</option>
                  <option value="Investor Support">Investor Support</option>
                  <option value="Partnership">Partnership Opportunities</option>
                  <option value="Other">Other</option>
                </select>
                <label 
                  htmlFor="subject" 
                  className={`absolute left-5 transition-all duration-300 ease-in-out transform ${
                    isFocused.subject || formData.subject 
                      ? 'top-1 text-xs text-emerald-600 -translate-y-2' 
                      : 'top-4 text-gray-500'
                  } bg-white px-1 peer-focus:top-1 peer-focus:text-xs peer-focus:text-emerald-600 peer-focus:-translate-y-2`}
                >
                  Subject
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 peer-focus:w-full"></div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="sm:col-span-2 relative">
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent peer resize-none"
                  placeholder=" "
                ></textarea>
                <label 
                  htmlFor="message" 
                  className={`absolute left-5 transition-all duration-300 ease-in-out transform ${
                    isFocused.message || formData.message 
                      ? 'top-1 text-xs text-emerald-600 -translate-y-2' 
                      : 'top-4 text-gray-500'
                  } bg-white px-1 peer-focus:top-1 peer-focus:text-xs peer-focus:text-emerald-600 peer-focus:-translate-y-2`}
                >
                  Your Message
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 peer-focus:w-full"></div>
              </div>
            </div>

            <div className="text-center">
              <motion.button
                type="submit"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-transparent text-white text-lg font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-lg shadow-emerald-500/20 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Send Message</span>
                <Send className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      
    </div>
  );
};

export default Contact;