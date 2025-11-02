import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  BarChart3,
  Award,
  Star,
  Search,
  Filter,
  Target,
  MapPin,
  Users,
} from "lucide-react";

const ProfessionalInvestorDashboard = () => {
  // ──────────────────────────────
  // States
  // ──────────────────────────────
  const [investorData] = useState({
    name: "John Doe",
    portfolioValue: "$1,250,000",
    activeInvestments: 8,
    availableFunds: "$300,000",
    successRate: "92%",
  });

  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState("");

  // ──────────────────────────────
  // Sample Startup Data
  // ──────────────────────────────
  useEffect(() => {
    const mockStartups = [
      {
        id: 1,
        name: "EcoTech Solutions",
        description: "Developing sustainable energy storage systems.",
        raised: "$800,000",
        fundingGoal: "$1,000,000",
        valuation: "$10M",
        expectedROI: "18%",
        fundingStage: "Series A",
        daysLeft: 15,
        location: "San Francisco, CA",
        teamSize: 25,
        matchScore: 95,
        premium: true,
        trending: true,
      },
      {
        id: 2,
        name: "HealthAI",
        description: "AI-powered diagnostics for early disease detection.",
        raised: "$600,000",
        fundingGoal: "$900,000",
        valuation: "$8M",
        expectedROI: "22%",
        fundingStage: "Seed",
        daysLeft: 20,
        location: "New York, NY",
        teamSize: 18,
        matchScore: 88,
        premium: false,
        trending: true,
      },
      {
        id: 3,
        name: "FinSecure",
        description: "Next-gen fintech platform for secure transactions.",
        raised: "$1,200,000",
        fundingGoal: "$1,500,000",
        valuation: "$12M",
        expectedROI: "15%",
        fundingStage: "Series B",
        daysLeft: 12,
        location: "Austin, TX",
        teamSize: 30,
        matchScore: 91,
        premium: true,
        trending: false,
      },
    ];
    setStartups(mockStartups);
    setFilteredStartups(mockStartups);
  }, []);

  // ──────────────────────────────
  // Helpers
  // ──────────────────────────────
  const calculateProgress = (raised, goal) => {
    const r = parseInt(raised.replace(/\$|,/g, ""));
    const g = parseInt(goal.replace(/\$|,/g, ""));
    return Math.min((r / g) * 100, 100);
  };

  const handleInvestClick = (startup) => {
    setSelectedStartup(startup);
    setInvestmentAmount("");
    setShowInvestmentModal(true);
  };

  const handleInvestmentSubmit = (e) => {
    e.preventDefault();
    alert(`Successfully invested $${investmentAmount} in ${selectedStartup.name}!`);
    setShowInvestmentModal(false);
  };

  // ──────────────────────────────
  // Filtering Tabs
  // ──────────────────────────────
  useEffect(() => {
    if (activeTab === "all") setFilteredStartups(startups);
    else if (activeTab === "featured") setFilteredStartups(startups.filter((s) => s.matchScore > 90));
    else if (activeTab === "premium") setFilteredStartups(startups.filter((s) => s.premium));
    else if (activeTab === "trending") setFilteredStartups(startups.filter((s) => s.trending));
  }, [activeTab, startups]);

  // ──────────────────────────────
  // JSX
  // ──────────────────────────────
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-green-600">{investorData.name}</span>
          </h2>
          <p className="text-gray-600 mt-2">Here's what's happening with your investments today</p>
        </div>

        {/* Investor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Portfolio Value",
              value: investorData.portfolioValue,
              sub: "+2.3% today",
              color: "green",
              icon: DollarSign,
            },
            {
              title: "Active Investments",
              value: investorData.activeInvestments,
              sub: "3 new opportunities",
              color: "blue",
              icon: Briefcase,
            },
            {
              title: "Available Funds",
              value: investorData.availableFunds,
              sub: "Ready to invest",
              color: "purple",
              icon: BarChart3,
            },
            {
              title: "Success Rate",
              value: investorData.successRate,
              sub: "Top performer",
              color: "amber",
              icon: Award,
            },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-${stat.color}-600 text-xs mt-1`}>{stat.sub}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 p-6 bg-white rounded-xl border border-gray-200">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            {["all", "featured", "premium", "trending"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab === "premium" && <Star className="h-4 w-4 inline mr-1" />}
                {tab === "trending" && <TrendingUp className="h-4 w-4 inline mr-1" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search startups..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Startups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredStartups.map((startup) => (
            <div
              key={startup.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-md relative"
            >
              {startup.premium && (
                <div className="absolute top-4 left-4 z-10 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                  <Star className="h-3 w-3 mr-1" /> PREMIUM
                </div>
              )}
              {startup.trending && (
                <div className="absolute top-4 right-4 z-10 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> TRENDING
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{startup.name}</h3>
                  <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    <Target className="h-3 w-3 mr-1" /> {startup.matchScore}% Match
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{startup.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Funding Progress</span>
                    <span>
                      {startup.raised} / {startup.fundingGoal}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${calculateProgress(startup.raised, startup.fundingGoal)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Valuation</p>
                    <p className="font-medium text-gray-900">{startup.valuation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expected ROI</p>
                    <p className="font-medium text-green-600">{startup.expectedROI}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Stage</p>
                    <p className="font-medium text-gray-900">{startup.fundingStage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Days Left</p>
                    <p className="font-medium text-gray-900">{startup.daysLeft}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="mr-4">{startup.location}</span>
                  <Users className="h-4 w-4 mr-1" />
                  <span>{startup.teamSize} team members</span>
                </div>
                <button
                  onClick={() => handleInvestClick(startup)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Invest Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showInvestmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Invest in {selectedStartup.name}
              </h3>
              <p className="text-gray-600 mb-6">Enter the amount you want to invest</p>

              <form onSubmit={handleInvestmentSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="investmentAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Investment Amount ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      id="investmentAmount"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      className="pl-10 pr-4 py-3 w-full bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter amount"
                      required
                      min="1000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Minimum investment: $1,000</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Expected ROI</span>
                    <span className="text-green-600 font-medium">
                      {selectedStartup.expectedROI}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your potential return</span>
                    <span className="font-medium text-gray-900">
                      $
                      {investmentAmount
                        ? (
                            parseInt(investmentAmount) *
                            (parseInt(selectedStartup.expectedROI) / 100)
                          ).toLocaleString()
                        : "0"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInvestmentModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg shadow-sm text-sm font-medium text-white transition-colors"
                  >
                    Confirm Investment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessionalInvestorDashboard;
