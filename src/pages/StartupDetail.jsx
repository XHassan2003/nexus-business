import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar, 
  Award, 
  ArrowLeft
} from 'lucide-react';

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
  founders: [
    { name: 'Sarah Johnson', title: 'CEO', linkedin: '#' },
    { name: 'Michael Chen', title: 'CTO', linkedin: '#' }
  ],
  metrics: [
    { label: 'Buildings Deployed', value: '35+' },
    { label: 'Energy Saved', value: '1.2M kWh' },
    { label: 'Customer Retention', value: '95%' }
  ],
  match: 96,
  logo: 'https://images.pexels.com/photos/3943746/pexels-photo-3943746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  coverImage: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

const StartupDetail = () => {
  const { id } = useParams();
  const startup = startupDetails; // In a real app, you would fetch the startup by ID

  return (
    <div className="max-w-4xl mx-auto m-5 bg-white rounded-xl shadow-md overflow-hidden">
      {/* Cover image */}
      <div className="h-48 sm:h-64 w-full relative">
        <img 
          src={startup.coverImage} 
          alt={`${startup.name} cover`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <Link to="/" className="absolute top-4 left-4 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors duration-200">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="h-16 w-16 rounded-lg overflow-hidden bg-indigo-50 mr-4 flex-shrink-0">
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
          
          <div className="sm:ml-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {startup.match}% Match
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
          <p className="text-gray-700">{startup.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <Building className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Industry:</strong> {startup.industry}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <TrendingUp className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Stage:</strong> {startup.stage}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Founded:</strong> {startup.foundedYear}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Users className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Team Size:</strong> {startup.teamSize}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Location:</strong> {startup.location}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Financial Overview</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <DollarSign className="h-5 w-5 mr-3 text-indigo-500" />
                <span><strong>Revenue:</strong> {startup.revenue}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <DollarSign className="h-5 w-5 mr-3 text-indigo-500" />
                <span><strong>Funding Raised:</strong> {startup.fundingRaised}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <DollarSign className="h-5 w-5 mr-3 text-indigo-500" />
                <span><strong>Seeking:</strong> {startup.seekingAmount}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {startup.metrics.map((metric, index) => (
              <div key={index} className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-700 mb-1">{metric.label}</p>
                <p className="text-xl font-bold text-indigo-900">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Founding Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {startup.founders.map((founder, index) => (
              <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg mr-3">
                  {founder.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{founder.name}</p>
                  <p className="text-sm text-gray-600">{founder.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors duration-200 font-medium">
            Contact Startup
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;