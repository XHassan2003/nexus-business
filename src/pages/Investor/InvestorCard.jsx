import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Target } from 'lucide-react';

const InvestorCard = ({ investor }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 h-full flex flex-col">
      <div className="h-32 overflow-hidden relative">
        <img 
          src={investor.logo} 
          alt={`${investor.name} logo`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="p-5 flex-grow">

        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{investor.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Target className="h-4 w-4 mr-2 text-green-500" />
            <span>{investor.focus}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-green-500" />
            <span>{investor.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 text-green-500" />
            <span>Min: {investor.minInvestment}</span>
          </div>
        </div>
      </div>
      
      <div className="px-5 pb-5 mt-auto">
        <Link to={`/investor/${investor.id}`}>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InvestorCard;
