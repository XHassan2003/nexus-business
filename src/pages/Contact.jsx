import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-gradient-to-tr from-white to-gray-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <MessageSquare className="h-12 w-12 mx-auto text-green-600 mb-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Contact <span className="text-green-600">Nexus</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          We’d love to hear from you. Whether you're a startup, investor, or just curious—let's talk.
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200">
        <div className="px-8 py-12 sm:p-12">
          {isSubmitted && (
            <div className="mb-6 rounded-md border border-green-300 bg-green-50 p-4 animate-fade-in-down">
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-green-800 font-medium">Your message was sent successfully!</p>
                  <p className="text-green-700 text-sm">We'll respond shortly.</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Alex Founder"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="alex@startup.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Choose a topic</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Startup Support">Startup Support</option>
                  <option value="Investor Support">Investor Support</option>
                  <option value="Partnership">Partnership Opportunities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tell us how we can help..."
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-white text-lg font-medium rounded-xl bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
