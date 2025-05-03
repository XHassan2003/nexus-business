import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";
import StartupListing from "../pages/StartupListing";
import InvestorListing from "../pages/InvestorListing";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        console.log("User not found in context");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("name, email, account_type")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <p className="p-8 text-gray-600">Checking session...</p>;
  }

  if (!profile) {
    return <p className="p-8 text-gray-600">Loading profile...</p>;
  }

  // Helper for reverse role content
  const renderOppositeDashboard = () => {
    if (profile.account_type === "startup") {
      return <InvestorListing />;
    } else if (profile.account_type === "investor") {
      return <StartupListing />;
    } else {
      return (
        <div>
          <h3 className="text-xl font-bold text-red-600">Unknown Account Type</h3>
        </div>
      );
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 bg-white">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Welcome, {profile.name}
              </h2>
              <p><strong>Email:</strong> {profile.email}</p>
              <p className="mb-4"><strong>Account Type:</strong> {profile.account_type}</p>

              {/* Opposite Dashboard */}
              {renderOppositeDashboard()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
