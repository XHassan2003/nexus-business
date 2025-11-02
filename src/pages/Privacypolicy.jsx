import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Shield,
  Database,
  BarChart3,
  Cookie,
  Lock,
  Users,
  Mail,
  FileText,
  UserCheck,
} from 'lucide-react';

const PrivacyPolicy = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: <FileText size={18} /> },
    { id: 'data-collection', title: 'Data Collection', icon: <Database size={18} /> },
    { id: 'data-usage', title: 'How We Use Data', icon: <BarChart3 size={18} /> },
    { id: 'cookies', title: 'Cookies', icon: <Cookie size={18} /> },
    { id: 'data-security', title: 'Data Security', icon: <Lock size={18} /> },
    { id: 'third-party', title: 'Third-Party Services', icon: <Users size={18} /> },
    { id: 'user-rights', title: 'User Rights', icon: <UserCheck size={18} /> },
    { id: 'contact', title: 'Contact Information', icon: <Mail size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </button>

            <div
              className={`transition-opacity duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h1 className="text-xl font-bold text-gray-800">Privacy Policy</h1>
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-28 bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <ChevronRight className="h-5 w-5 text-emerald-600" />
                </span>
                Table of Contents
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-emerald-50 text-emerald-700 font-medium border-l-4 border-emerald-600'
                        : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <span className="mr-3 opacity-70">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Sections */}
          <section className="lg:w-3/4 space-y-8 bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
            {/* Introduction */}
            <div id="introduction" className="p-8 border-b border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="text-emerald-600 mr-2" size={24} /> Introduction
              </h2>
              <p className="text-gray-700 mb-3">
                At Nexus, we are committed to protecting your privacy and ensuring the security of
                your personal information.
              </p>
              <p className="text-gray-700">
                This policy explains how we collect, use, disclose, and protect your data when using
                our services.
              </p>
            </div>

            {/* Data Collection */}
            <div id="data-collection" className="p-8 border-b border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="text-emerald-600 mr-2" size={24} /> Data Collection
              </h2>
              <p className="text-gray-700">
                We collect both personal and non-personal data to provide better services and
                experiences.
              </p>
            </div>

            {/* Cookies */}
            <div id="cookies" className="p-8 border-b border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Cookie className="text-emerald-600 mr-2" size={24} /> Cookies
              </h2>
              <p className="text-gray-700 mb-4">
                We use cookies and tracking technologies to improve your browsing experience.
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-6">
                <h3 className="font-semibold text-amber-800 mb-2">Types of Cookies</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>Essential Cookies – enable core functionality</li>
                  <li>Analytics Cookies – help us understand site usage</li>
                  <li>Preference Cookies – store your settings</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div id="data-security" className="p-8 border-b border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="text-emerald-600 mr-2" size={24} /> Data Security
              </h2>
              <p className="text-gray-700">
                We implement advanced encryption, access controls, and secure storage to protect
                your information.
              </p>
            </div>

            {/* Contact */}
            <div id="contact" className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="text-emerald-600 mr-2" size={24} /> Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, you can contact us at:{' '}
                <span className="text-emerald-600 font-medium">support@nexus.com</span>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
