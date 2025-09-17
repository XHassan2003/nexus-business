import React, { useState, useEffect } from 'react';
import { 
  Building, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar, 
  Award, 
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  BarChart3
} from 'lucide-react';

const StartupDetail = () => {
  const [startup, setStartup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for startup details
  const startupDetails = {
    id: 1,
    name: 'EcoTech Solutions',
    tagline: 'Revolutionizing sustainable energy solutions for commercial buildings',
    description: 'EcoTech Solutions is developing innovative IoT-enabled energy management systems that reduce commercial building energy consumption by up to 40%. Our proprietary AI algorithms continuously optimize HVAC, lighting, and other systems based on occupancy patterns, weather conditions, and energy prices.',
    industry: 'CleanTech',
    stage: 'Series A',
    foundedYear: 2020,
    teamSize: '15-30',
    revenue: '$500K/year',
    fundingRaised: '$2.5M',
    seekingAmount: '$5M',
    location: 'Austin, TX',
    contact: {
      email: 'info@ecotechsolutions.com',
      phone: '+1 (512) 555-0199',
      website: 'www.ecotechsolutions.com'
    },
    founders: [
      { name: 'Sarah Johnson', title: 'CEO', linkedin: '#', bio: 'Former energy consultant with 10+ years in sustainable tech' },
      { name: 'Michael Chen', title: 'CTO', linkedin: '#', bio: 'PhD in Computer Science with focus on AI optimization' }
    ],
    metrics: [
      { label: 'Buildings Deployed', value: '35+', icon: <Building className="h-4 w-4" /> },
      { label: 'Energy Saved', value: '1.2M kWh', icon: <Award className="h-4 w-4" /> },
      { label: 'Customer Retention', value: '95%', icon: <TrendingUp className="h-4 w-4" /> },
      { label: 'CO2 Reduction', value: '850 tons', icon: <BarChart3 className="h-4 w-4" /> }
    ],
    match: 96,
    logo: 'https://images.pexels.com/photos/3943746/pexels-photo-3943746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1188748/pexels-photo-1188748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  };

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, we might get the ID from URL and fetch from localStorage
      const storedStartups = JSON.parse(localStorage.getItem('startups')) || [startupDetails];
      setStartup(storedStartups[0]); // Get the first startup for demo
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    // Simulate sending a contact request
    alert('Your contact request has been sent to EcoTech Solutions! They will respond within 48 hours.');
  };

  const handleSaveStartup = () => {
    // Simulate saving the startup to favorites
    alert('EcoTech Solutions has been saved to your favorites!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading startup details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Cover image */}
        <div className="h-48 sm:h-64 w-full relative">
          <img 
            src={startup.coverImage} 
            alt={`${startup.name} cover`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <button 
            onClick={() => window.history.back()}
            className="absolute top-4 left-4 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="h-16 w-16 rounded-lg overflow-hidden bg-indigo-50 mr-4 flex-shrink-0 border border-gray-200">
                <img 
                  src={startup.logo} 
                  alt={`${startup.name} logo`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{startup.name}</h1>
                <p className="text-sm text-gray-600">{startup.tagline}</p>
              </div>
            </div>
            
            <div className="sm:ml-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {startup.match}% Match
              </div>
              <button 
                onClick={handleSaveStartup}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-lg transition-colors"
              >
                Save to Favorites
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'team', 'gallery'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600 border-b-2'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          {activeTab === 'overview' && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-700">{startup.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <Building className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                      <span><strong>Industry:</strong> {startup.industry}</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <TrendingUp className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                      <span><strong>Stage:</strong> {startup.stage}</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                      <span><strong>Founded:</strong> {startup.foundedYear}</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Users className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                      <span><strong>Team Size:</strong> {startup.teamSize}</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                      <span><strong>Location:</strong> {startup.location}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Financial Overview</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <DollarSign className="h-5 w-5 mr-3 text-indigo-500 flex-shrink-0" />
                      <span><strong>Revenue:</strong> {startup.revenue}</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <DollarSign className="h-5 w-5 mr-3 text-indigo-500 flex-shrink-0" />
                      <span><strong>Funding Raised:</strong> {startup.fundingRaised}</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <DollarSign className="h-5 w-5 mr-3 text-indigo-500 flex-shrink-0" />
                      <span><strong>Seeking:</strong> {startup.seekingAmount}</span>
                    </li>
                  </ul>

                  <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Contact Information</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <Mail className="h-4 w-4 mr-3 text-indigo-500 flex-shrink-0" />
                      <span>{startup.contact.email}</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Phone className="h-4 w-4 mr-3 text-indigo-500 flex-shrink-0" />
                      <span>{startup.contact.phone}</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Globe className="h-4 w-4 mr-3 text-indigo-500 flex-shrink-0" />
                      <span>{startup.contact.website}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === 'team' && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Founding Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {startup.founders.map((founder, index) => (
                  <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                      {founder.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{founder.name}</p>
                      <p className="text-sm text-gray-600 mb-2">{founder.title}</p>
                      <p className="text-sm text-gray-700">{founder.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && startup.gallery && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {startup.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={image} 
                      alt={`${startup.name} gallery ${index + 1}`} 
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Metrics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {startup.metrics.map((metric, index) => (
                <div key={index} className="bg-indigo-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <div className="text-indigo-600 mb-2">{metric.icon}</div>
                  <p className="text-sm text-indigo-700 mb-1">{metric.label}</p>
                  <p className="text-xl font-bold text-indigo-900">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={handleContact}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Startup
            </button>
            <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 px-6 rounded-lg transition-colors duration-200 font-medium">
              Request Detailed Pitch Deck
            </button>
          </div>
        </div>
      </div>

      {/* Similar Startups Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Startups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium text-gray-900">SolarFlow Tech</h3>
                <p className="text-sm text-gray-600">Renewable Energy</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">Advanced solar panel technology with 30% higher efficiency.</p>
            <div className="flex justify-between items-center">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">88% Match</span>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View Details</button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-green-100 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium text-gray-900">GreenBuild Materials</h3>
                <p className="text-sm text-gray-600">Sustainable Construction</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">Eco-friendly building materials made from recycled plastics.</p>
            <div className="flex justify-between items-center">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">82% Match</span>
              <button className="text-xs text-green-600 hover:text-green-800 font-medium">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;