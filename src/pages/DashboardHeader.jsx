import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import StartupListing from "./StartupListing";
import InvestorListing from "./InvestorListing";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Get user profile from localStorage
    const storedProfile = JSON.parse(localStorage.getItem("currentUser"));
    
    // For backward compatibility, also check for "profile" key
    const oldProfile = JSON.parse(localStorage.getItem("profile"));
    
    if (storedProfile) {
      setProfile(storedProfile);
    } else if (oldProfile) {
      setProfile(oldProfile);
      // Migrate to new format
      localStorage.setItem("currentUser", JSON.stringify(oldProfile));
      localStorage.removeItem("profile");
    }
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600">
            We couldn't find your profile information. Please try logging in again.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    // Use accountType (new format) or account_type (old format)
    const accountType = profile.accountType || profile.account_type;
    
    if (accountType === "startup") {
      return <StartupListing />;
    } else if (accountType === "investor") {
      return <InvestorListing />;
    } else {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-xl font-bold text-red-600 mb-2">
            Unknown Account Type
          </h3>
          <p className="text-gray-700">
            Your account type is not recognized. Please contact support.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader profile={profile} />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome message */}
        <div className="mb-6 bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {profile.name}!
          </h1>
          <p className="opacity-90">
            {profile.accountType === 'startup' 
              ? 'Manage your startup profile and connect with potential investors.' 
              : 'Discover promising startups and find your next investment opportunity.'}
          </p>
        </div>
        
        <div className="rounded-xl overflow-hidden bg-white shadow-md">
          {renderDashboard()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;