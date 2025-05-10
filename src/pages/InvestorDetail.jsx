import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Target, 
  Clock, 
  Users, 
  Award, 
  ArrowLeft,
  Calendar
} from 'lucide-react';

// Mock data for investor details
const investorDetails = {
  id: 1,
  name: 'Tech Ventures Capital',
  tagline: 'Backing visionary founders building transformative technologies',
  description: 'Tech Ventures Capital is an early-stage venture fund focused on supporting innovative startups in SaaS, AI/ML, and other emerging technology sectors. We provide not just capital, but strategic guidance, operational support, and valuable industry connections to help our portfolio companies accelerate growth and achieve sustainable success.',
  focus: 'SaaS, AI/ML, Enterprise Software',
  stage: 'Seed to Series A',
  foundedYear: 2015,
  portfolioSize: '28 companies',
  minInvestment: '$500K',
  maxInvestment: '$3M',
  totalAUM: '$120M',
  location: 'San Francisco, CA',
  partners: [
    { name: 'David Rodriguez', title: 'Managing Partner', linkedin: '#' },
    { name: 'Emily Chang', title: 'Partner', linkedin: '#' }
  ],
  recentInvestments: [
    { name: 'DataSense AI', industry: 'Enterprise AI', amount: '$2M' },
    { name: 'CloudSecure', industry: 'Cybersecurity', amount: '$1.5M' },
    { name: 'Quantum Computing Labs', industry: 'Quantum Tech', amount: '$3M' }
  ],
  match: 95,
  logo: 'https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  coverImage: 'https://images.pexels.com/photos/7235842/pexels-photo-7235842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

const InvestorDetail = () => {
  const { id } = useParams();
  const investor = investorDetails; // In a real app, you would fetch the investor by ID

  return (
    <div className="max-w-4xl mx-auto m-5 bg-white rounded-xl shadow-md overflow-hidden">
      {/* Cover image */}
      <div className="h-48 sm:h-64 w-full relative">
        <img 
          src={investor.coverImage} 
          alt={`${investor.name} cover`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <Link to="/Dashboard" className="absolute top-4 left-4 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors duration-200">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="h-16 w-16 rounded-lg overflow-hidden bg-green-50 mr-4 flex-shrink-0">
              <img 
                src={investor.logo} 
                alt={`${investor.name} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{investor.name}</h1>
              <p className="text-sm text-gray-600">{investor.tagline}</p>
            </div>
          </div>
          
          <div className="sm:ml-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {investor.match}% Match
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
          <p className="text-gray-700">{investor.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Investor Profile</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <Target className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Focus:</strong> {investor.focus}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Stage:</strong> {investor.stage}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Users className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Portfolio:</strong> {investor.portfolioSize}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Founded:</strong> {investor.foundedYear}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Location:</strong> {investor.location}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Investment Parameters</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <DollarSign className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Min Investment:</strong> {investor.minInvestment}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <DollarSign className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Max Investment:</strong> {investor.maxInvestment}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Briefcase className="h-5 w-5 mr-3 text-green-500" />
                <span><strong>Assets Under Management:</strong> {investor.totalAUM}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Investments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {investor.recentInvestments.map((investment, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg hover:border-green-200 transition-colors duration-200">
                <p className="font-medium text-gray-900">{investment.name}</p>
                <p className="text-sm text-gray-600">{investment.industry}</p>
                <p className="text-sm font-medium text-green-700 mt-1">{investment.amount}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Investment Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {investor.partners.map((partner, index) => (
              <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold text-lg mr-3">
                  {partner.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{partner.name}</p>
                  <p className="text-sm text-gray-600">{partner.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors duration-200 font-medium">
            Request Introduction
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestorDetail;