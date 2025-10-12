import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Scale, Shield, FileText, Globe, Mail, Clock, CheckCircle } from 'lucide-react';
import { i } from 'framer-motion/m';

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
    { i mx-auto px-4 sm:px-6 lg:px-8">
       ="text-emerald-600" size={24} />
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