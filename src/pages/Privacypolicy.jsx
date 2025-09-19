import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Shield, Database, BarChart3, Cookie, Lock, Users, Mail, FileText, Eye, Download, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
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
    { id: 'data-collection', title: 'Data Collection', icon: <Database size={18} /> },
    { id: 'data-usage', title: 'How We Use Data', icon: <BarChart3 size={18} /> },
    { id: 'cookies', title: 'Cookies', icon: <Cookie size={18} /> },
    { id: 'data-security', title: 'Data Security', icon: <Lock size={18} /> },
    { id: 'third-party', title: 'Third-Party Services', icon: <Users size={18} /> },
    { id: 'user-rights', title: 'User Rights', icon: <UserCheck size={18} /> },
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
              <h1 className="text-xl font-bold text-gray-800">Privacy Policy</h1>
            </div>
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
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
                  At Nexus, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                </p>
                <p className="text-gray-700">
                  By accessing or using our website and services, you consent to the practices described in this Privacy Policy. 
                  We encourage you to read this policy carefully to understand our views and practices regarding your personal data.
                </p>
              </section>

              {/* Data Collection */}
              <section id="data-collection" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-909 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Database className="text-emerald-600" size={24} />
                  </span>
                  Data Collection
                </h2>
                <p className="text-gray-700 mb-4">
                  We collect information that you provide directly to us, as well as data automatically collected through your use of our services:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <h3 className="font-semibold text-emerald-800 mb-2">Information You Provide</h3>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>Name and contact information</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>Account credentials</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>Payment information</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>Communications with us</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <h3 className="font-semibold text-emerald-800 mb-2">Automatically Collected</h3>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>Device information</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>Log data and analytics</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>Cookies and similar technologies</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span>Usage patterns</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Data */}
              <section id="data-usage" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <BarChart3 className="text-emerald-600" size={24} />
                  </span>
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-gray-700">Providing and maintaining our services</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-gray-700">Improving user experience</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-gray-700">Processing transactions</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-gray-700">Communicating with you</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-gray-700">Personalizing content</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-gray-700">Ensuring security and preventing fraud</span>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Cookie className="text-emerald-600" size={24} />
                  </span>
                  Cookies
                </h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to track activity on our service and hold certain information.
                </p>
                
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 mb-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Types of Cookies We Use</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-amber-700 mb-1">Essential Cookies</h4>
                      <p className="text-amber-800 text-sm">Required for basic functions and security</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-700 mb-1">Analytics Cookies</h4>
                      <p className="text-amber-800 text-sm">Help us understand how visitors interact with our website</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-700 mb-1">Functionality Cookies</h4>
                      <p className="text-amber-800 text-sm">Enable enhanced functionality and personalization</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-700 mb-1">Advertising Cookies</h4>
                      <p className="text-amber-800 text-sm">Used to deliver relevant ads and track campaigns</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </section>

              {/* Data Security */}
              <section id="data-security" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Lock className="text-emerald-600" size={24} />
                  </span>
                  Data Security
                </h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-2">Our Security Measures</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Lock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800 text-sm">Encryption of data in transit and at rest</span>
                    </div>
                    <div className="flex items-start">
                      <Lock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800 text-sm">Regular security assessments and testing</span>
                    </div>
                    <div className="flex items-start">
                      <Lock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800 text-sm">Access controls and authentication procedures</span>
                    </div>
                    <div className="flex items-start">
                      <Lock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800 text-sm">Employee training on data protection</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Third-Party Services */}
              <section id="third-party" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Users className="text-emerald-600" size={24} />
                  </span>
                  Third-Party Services
                </h2>
                <p className="text-gray-700 mb-4">
                  We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used.
                </p>
                <p className="text-gray-700">
                  These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              {/* User Rights */}
              <section id="user-rights" className="p-8 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <UserCheck className="text-emerald-600" size={24} />
                  </span>
                  User Rights
                </h2>
                <p className="text-gray-700 mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Eye className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Right to Access</h4>
                      <p className="text-gray-700 text-sm">You can request copies of your personal data.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Download className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Right to Portability</h4>
                      <p className="text-gray-700 text-sm">You can request transfer of your data to another service.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Right to Rectification</h4>
                      <p className="text-gray-700 text-sm">You can request correction of inaccurate information.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Right to Erasure</h4>
                      <p className="text-gray-700 text-sm">You can request deletion of your personal data.</p>
                    </div>
                  </div>
                </div>
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
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
                  <p className="text-gray-700 mb-2">
                    <strong>Nexus Data Protection Officer</strong>
                  </p>
                  <p className="text-gray-700 mb-2 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-emerald-600" />
                    Email: privacy@nexus.example
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-emerald-600" />
                    Address: 123 Privacy Lane, Suite 200, Wilmington, DE 19801
                  </p>
                </div>
              </section>
            </div>

            {/* Acceptance Section */}
            <div className="mt-8 p-8 bg-emerald-50 rounded-2xl text-center border border-emerald-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Privacy Matters</h3>
              <p className="text-gray-700 mb-6">
                We are committed to protecting your personal information and being transparent about our data practices.
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

export default PrivacyPolicy;