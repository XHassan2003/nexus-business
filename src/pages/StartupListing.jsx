import React from "react";
import { Link } from "react-router-dom";

const startups = [
    {
        name: "EcoTech Solutions",
        industry: "CleanTech",
        stage: "Series A",
        revenue: "$500K/year",
        location: "Austin",
        match: "96%"
      },
      {
        name: "HealthAI",
        industry: "Healthcare, AI",
        stage: "Seed",
        revenue: "$200K/year",
        location: "Boston",
        match: "92%"
      },
      {
        name: "FinFlow",
        industry: "FinTech",
        stage: "Pre-Series A",
        revenue: "$1M/year",
        location: "New York",
        match: "88%"
      }
];

const StartupListing = () => {
  return (
    <div>
      <h3 className="text-xl font-bold text-green-600 mb-4">Featured Startups</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {startups.map((startup) => (
          <Link to={`/startup/${startup.id}`} key={startup.id}>
            <div className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer">
              <h4 className="text-lg font-semibold text-gray-800">{startup.name}</h4>
              <p className="text-sm text-gray-600">{startup.pitch}</p>
              <p className="text-sm text-gray-500">Location: {startup.location}</p>
              <button className="mt-2 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded">
                View Profile
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StartupListing;
