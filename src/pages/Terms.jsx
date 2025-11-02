import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Scale,
  Shield,
  FileText,
  Globe,
  Mail,
  Clock,
  CheckCircle,
} from 'lucide-react';

const TermsOfService = () => {
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

  // Sidebar navigation
  const sections = [
    { id: 'introduction', title: 'Introduction', icon: <FileText size={18} /> },
    { id: 'terms', title: 'Terms & Conditions', icon: <Scale size={18} /> },
    { id: 'privacy', title: 'Privacy & Security', icon: <Shield size={18} /> },
    { id: 'updates', title: 'Changes to Terms', icon: <Clock size={18} /> },
    { id: 'contact', title: 'Contact Information', icon: <Mail size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex gap-10">
        {/* Sidebar */}
        <aside
          className={`hidden lg:block w-64 sticky top-24 h-fit bg-white shadow-sm border border-gray-100 rounded-xl p-5 transition-all duration-300 ${
            isScrolled ? 'shadow-md' : ''
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 text-emerald-700">
            Table of Contents
          </h3>
          <ul className="space-y-3">
            {sections.map((section) => (
              <li
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-emerald-100 text-emerald-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
                <ChevronRight
                  size={16}
                  className={`ml-auto transition-transform ${
                    activeSection === section.id ? 'translate-x-1' : ''
                  }`}
                />
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-12">
          {/* Introduction */}
          <section id="introduction" className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                <FileText className="text-emerald-600" size={24} />
              </span>
              Introduction
            </h2>
            <p className="text-gray-700">
              Welcome to Nexus. By accessing or using our platform, you agree to comply with these Terms of Service.
            </p>
          </section>

          {/* Terms & Conditions */}
          <section id="terms" className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                <Scale className="text-emerald-600" size={24} />
              </span>
              Terms & Conditions
            </h2>
            <p className="text-gray-700">
              By using our services, you agree not to misuse our platform or violate applicable laws.
            </p>
          </section>

          {/* Privacy & Security */}
          <section id="privacy" className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                <Shield className="text-emerald-600" size={24} />
              </span>
              Privacy & Security
            </h2>
            <p className="text-gray-700">
              We prioritize your privacy and employ robust security measures to protect your personal information.
            </p>
          </section>

          {/* Changes to Terms */}
          <section id="updates" className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                <Clock className="text-emerald-600" size={24} />
              </span>
              Changes to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide
              at least 30 days' notice before the new terms take effect.
            </p>
          </section>

          {/* Contact Information */}
          <section id="contact" className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                <Mail className="text-emerald-600" size={24} />
              </span>
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
              <p className="text-gray-700 mb-2 font-medium">Nexus Legal Department</p>
              <p className="text-gray-700 mb-2 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-emerald-600" />
                Email: legal@nexus.example
              </p>
              <p className="text-gray-700 flex items-center">
                <Globe className="h-4 w-4 mr-2 text-emerald-600" />
                Address: 123 Business Avenue, Suite 100, Wilmington, DE 19801
              </p>
            </div>
          </section>

          {/* Acceptance Section */}
          <div className="mt-8 p-8 bg-emerald-50 rounded-2xl text-center border border-emerald-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Acceptance of Terms
            </h3>
            <p className="text-gray-700 mb-6">
              By using our website and services, you acknowledge that you have read, understood, and agree to these Terms of Service.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Back to Top
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
