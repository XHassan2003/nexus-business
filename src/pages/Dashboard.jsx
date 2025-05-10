import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";
import DashboardHeader from './DashboardHeader';
import StartupListing from "./StartupListing";
import InvestorListing from "./InvestorListing";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setLoadingProfile(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name, email, account_type')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (!loading) {
      fetchProfile();
    }
  }, [user, loading]);


  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">We couldn't find your profile information.</p>
        </div>
      </div>
    );
  }

  const renderOppositeDashboard = () => {
    if (profile.account_type === 'startup') {
      return <InvestorListing />;
    } else if (profile.account_type === 'investor') {
      return <StartupListing />;
    } else {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-xl font-bold text-red-600 mb-2">Unknown Account Type</h3>
          <p className="text-gray-700">Your account type is not recognized. Please contact support.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader profile={profile} />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl overflow-hidden bg-white shadow-md">
          {renderOppositeDashboard()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
