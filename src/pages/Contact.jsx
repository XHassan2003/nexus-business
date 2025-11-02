// Contact.jsx
import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Check,
  X,
  Mail,
  User,
  FileText,
  ArrowRight,
} from "lucide-react";
import {  AnimatePresence, motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ setIsFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Focus animations
  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  // ✅ Close popup
  const closePopup = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center py-8">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-emerald-100 mt-2">
            We’d love to hear from you — let’s talk!
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-12 sm:p-12 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Name */}
              <div className="relative">
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 text-emerald-600 mr-2" />
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="flex items-center mb-2">
                  <Mail className="h-4 w-4 text-emerald-600 mr-2" />
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Subject */}
              <div className="sm:col-span-2 relative">
                <div className="flex items-center mb-2">
                  <FileText className="h-4 w-4 text-emerald-600 mr-2" />
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-slate-700"
                  >
                    Subject
                  </label>
                </div>
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus("subject")}
                  onBlur={() => handleBlur("subject")}
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
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div className="sm:col-span-2 relative">
                <div className="flex items-center mb-2">
                  <MessageSquare className="h-4 w-4 text-emerald-600 mr-2" />
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-700"
                  >
                    Your Message
                  </label>
                </div>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-transparent text-white text-lg font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-lg shadow-emerald-500/20 relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
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

      {/* ✅ Thank You Popup */}
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

              {/* Popup Content */}
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    damping: 10,
                    stiffness: 200,
                  }}
                  className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="h-10 w-10 text-emerald-600" strokeWidth={3} />
                </motion.div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Message Sent Successfully!
                </h2>
                <p className="text-slate-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
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

              {/* Decorative line */}
              <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
