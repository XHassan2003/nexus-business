import React from "react";
import { Link } from "react-router-dom";

const investors = [
    {
        name: "Tech Ventures Capital",
        focus: "SaaS, AI/ML",
        minInvestment: "$500K",
        location: "San Francisco",
        match: "95%"
      },
      {
        name: "Green Innovation Fund",
        focus: "CleanTech, Sustainability",
        minInvestment: "$250K",
        location: "New York",
        match: "88%"
      },
      {
        name: "Global Growth Partners",
        focus: "E-commerce, FinTech",
        minInvestment: "$1M",
        location: "London",
        match: "82%"
      }
];

const InvestorListing = () => {
  return (
    <div>
      <h3 className="text-xl font-bold text-indigo-600 mb-4">Featured Investors</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {investors.map((inv) => (
          <Link to={`/investor/${inv.id}`} key={inv.id}>
            <div className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer">
              <h4 className="text-lg font-semibold text-gray-800">{inv.name}</h4>
              <p className="text-sm text-gray-600">Focus: {inv.focus}</p>
              <p className="text-sm text-gray-500">Location: {inv.location}</p>
              <button className="mt-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded">
                View Profile
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InvestorListing;
