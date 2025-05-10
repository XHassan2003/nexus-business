import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, DollarSign } from 'lucide-react';

const StartupCard = ({ startup }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 h-full flex flex-col">
      <div className="h-32 overflow-hidden relative">
        <img 
          src={startup.logo} 
          alt={`${startup.name} logo`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-2 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-green-500">
            {startup.stage}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow">
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{startup.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2 text-green-500" />
            <span>{startup.industry}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-green-500" />
            <span>{startup.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 text-green-500" />
            <span>{startup.revenue}</span>
          </div>
        </div>
      </div>
      
      <div className="px-5 pb-5 mt-auto">
        <Link to={`/startup/${startup.id}`}>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartupCard;
