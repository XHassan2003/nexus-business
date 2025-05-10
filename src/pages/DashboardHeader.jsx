import React from 'react';
import { Building, Briefcase } from 'lucide-react';

const DashboardHeader = ({ profile }) => {
  const isStartup = profile.account_type === 'startup';
  const accentColor = isStartup ? 'indigo' : 'green';
  const accentBg = isStartup ? 'bg-indigo-50' : 'bg-green-50';
  const accentText = isStartup ? 'text-indigo-700' : 'text-green-700';
  const accentBorder = isStartup ? 'border-indigo-200' : 'border-green-200';
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back, {profile.name}
            </p>
          </div>

          <div className={`flex items-center p-3 rounded-lg border ${accentBorder} ${accentBg}`}>
            <div className="mr-3">
              {isStartup ? (
                <Building className={`h-8 w-8 ${accentText}`} />
              ) : (
                <Briefcase className={`h-8 w-8 ${accentText}`} />
              )}
            </div>
            <div>
              <div className={`text-sm font-medium ${accentText}`}>
                {isStartup ? 'Startup Account' : 'Investor Account'}
              </div>
              <div className="text-xs text-gray-600">{profile.email}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
