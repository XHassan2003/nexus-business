import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Scale, Shield, FileText, Globe, Mail, Clock, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
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
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: <FileText size={18} /> },
    { id: 'user-responsibilities', title: 'User Responsibilities', icon: <Shield size={18} /> },
    { id: 'restrictions', title: 'Restrictions', icon: <Scale size={18} /> },
    { id: 'liability', title: 'Limitation of Liability', icon: <Shield size={18} /> },
    { id: 'governing-law', title: 'Governing Law', icon: <Globe size={18} /> },
    { id: 'changes', title: 'Changes to Terms', icon: <Clock size={18} /> },
    { id: 'contact', title: 'Contact Information', icon: <Mail size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </button>
            </div>
            <div className={`transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
              <h1 className="text-xl font-bold text-gray-800">Terms of Service</h1>
            </div>
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
            <FileText className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
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
                    <span className="text-left flex-1">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-emerald-100">
              {/* Introduction */}
              <section id="introduction" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <FileText className="text-emerald-600" size={24} />
                  </span>
                  Introduction
                </h2>
                <p className="text-gray-700 mb-4">
                  Welcome to Nexus. These Terms of Service ("Terms") govern your use of our website, products, and services 
                  ("Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-gray-700">
                  These Terms constitute a legally binding agreement between you and Nexus. If you are using our Services on 
                  behalf of an organization, you are agreeing to these Terms for that organization and promising that you have 
                  the authority to bind that organization to these Terms.
                </p>
              </section>

              {/* User Responsibilities */}
              <section id="user-responsibilities" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Shield className="text-emerald-600" size={24} />
                  </span>
                  User Responsibilities
                </h2>
                <p className="text-gray-700 mb-4">
                  As a user of our Services, you are responsible for your account and activities while using our platform. 
                  You agree to:
                </p>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Provide accurate and complete information when creating your account</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Maintain the security of your account credentials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Notify us immediately of any unauthorized use of your account</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Use our Services in compliance with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Be responsible for all activities that occur under your account</span>
                  </li>
                </ul>
              </section>

              {/* Restrictions */}
              <section id="restrictions" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Scale className="text-emerald-600" size={24} />
                  </span>
                  Restrictions
                </h2>
                <p className="text-gray-700 mb-4">
                  When using our Services, you agree not to:
                </p>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span>Violate any applicable law or regulation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span>Infringe upon the intellectual property rights of others</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span>Harass, abuse, or harm another person</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span>Transmit any viruses, malware, or other malicious code</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    </div>
                    <span>Interfere with or disrupt the integrity or performance of our Services</span>
                  </li>
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Shield className="text-emerald-600" size={24} />
                  </span>
                  Limitation of Liability
                </h2>
                <p className="text-gray-700 mb-4">
                  To the fullest extent permitted by law, in no event shall Nexus, its affiliates, officers, directors, 
                  employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Your access to or use of or inability to access or use the Services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Any conduct or content of any third party on the Services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Any unauthorized access to or use of our servers and/or any personal information stored therein</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Any interruption or cessation of transmission to or from our Services</span>
                  </li>
                </ul>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Globe className="text-emerald-600" size={24} />
                  </span>
                  Governing Law
                </h2>
                <p className="text-gray-700 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, 
                  without regard to its conflict of law provisions.
                </p>
                <p className="text-gray-700">
                  Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state 
                  courts located in Wilmington, Delaware, and you hereby irrevocably consent to the personal jurisdiction and 
                  venue of such courts.
                </p>
              </section>

              {/* Changes to Terms */}
              <section id="changes" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Clock className="text-emerald-600" size={24} />
                  </span>
                  Changes to Terms
                </h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                  material, we will provide at least 30 days' notice prior to any new terms taking effect.
                </p>
                <p className="text-gray-700">
                  What constitutes a material change will be determined at our sole discretion. By continuing to access or use 
                  our Services after any revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              {/* Contact Information */}
              <section id="contact" className="p-8">
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
                  <p className="text-gray-700 mb-2">
                    <strong>Nexus Legal Department</strong>
                  </p>
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
            </div>

            {/* Acceptance Section */}
            <div className="mt-8 p-8 bg-emerald-50 rounded-2xl text-center border border-emerald-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h3>
              <p className="text-gray-700 mb-6">
                By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default TermsOfService;