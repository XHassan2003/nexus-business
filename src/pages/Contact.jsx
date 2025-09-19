import React, { useState } from 'react';
import { MessageSquare, Send, Check, X, Mail, User, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const closePopup = () => {
    setIsSubmitted(false);
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
            animate={{
              y: ["0%", "-10%", "0%"],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[size:80px_80px] bg-[linear-gradient(to_right,transparent_50%,#000_50%),linear-gradient(to_bottom,transparent_50%,#000_50%)] rotate-45"></div>
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
          className="mt-4 text-slate-600 text-lg max-w-xl mx-auto"
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
      >
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 rotate-45 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
        </div>

        <div className="px-8 py-12 sm:p-12 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="relative">
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 text-emerald-600 mr-2" />
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              
              {/* Email Field */}
              <div className="relative">
                <div className="flex items-center mb-2">
                  <Mail className="h-4 w-4 text-emerald-600 mr-2" />
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>
              
              {/* Subject Field */}
              <div className="sm:col-span-2 relative">
                <div className="flex items-center mb-2">
                  <FileText className="h-4 w-4 text-emerald-600 mr-2" />
                  <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                    Subject
                  </label>
                </div>
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={() => handleBlur('subject')}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Startup Support">Startup Support</option>
                  <option value="Investor Support">Investor Support</option>
                  <option value="Partnership">Partnership Opportunities</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Message Field */}
              <div className="sm:col-span-2 relative">
                <div className="flex items-center mb-2">
                  <MessageSquare className="h-4 w-4 text-emerald-600 mr-2" />
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Your Message
                  </label>
                </div>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Type your message here..."
                ></textarea>
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

      {/* Thank You Popup */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Animated Checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 10, stiffness: 200 }}
                  className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                  >
                    <Check className="h-10 w-10 text-emerald-600" strokeWidth={3} />
                  </motion.div>
                </motion.div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h2>
                <p className="text-slate-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>

                <motion.button
                  onClick={closePopup}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Continue Browsing
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Decorative Bottom */}
              <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;