import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Briefcase,
  Clock,
  MapPin,
  Star,
  ChevronDown,
  MoreHorizontal,
  Download,
  Eye,
  Plus,
  MessageCircle,
  Calendar,
  Target,
  Award,
  Zap,
  Crown,
  Shield,
  Globe,
  Mail,
  Phone,
  Building,
  PieChart,
  Activity,
  ArrowUpRight,
  CheckCircle
} from 'lucide-react';

const ProfessionalInvestorDashboard = () => {
  const [investorData, setInvestorData] = useState(null);
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data
  useEffect(() => {
    const investor = {
      name: 'Alex Johnson',
      email: 'alex.johnson@investor.com',
      totalInvested: '$1,245,000',
      activeInvestments: 12,
      portfolioValue: '$3,240,500',
      memberSince: '2022',
      premiumMember: true,
      investorTier: 'Diamond',
      successRate: '92%',
      avgReturn: '34%',
      availableFunds: '$750,000'
    };
    setInvestorData(investor);

    const mockStartups = [
      {
        id: 1,
        name: 'EcoTech Solutions',
        industry: 'Clean Technology',
        fundingStage: 'Series A',
        fundingGoal: '$2,500,000',
        raised: '$1,750,000',
        description: 'Developing innovative recycling technology that converts plastic waste into building materials.',
        valuation: '$15M',
        teamSize: 12,
        location: 'San Francisco, CA',
        premium: true,
        trending: true,
        matchScore: 95,
        expectedROI: '42%',
        daysLeft: 14,
        featured: true
      },
      {
        id: 2,
        name: 'HealthAI',
        industry: 'Healthcare',
        fundingStage: 'Seed',
        fundingGoal: '$1,200,000',
        raised: '$650,000',
        description: 'AI-powered platform for early detection of diseases through medical imaging analysis.',
        valuation: '$8.5M',
        teamSize: 8,
        location: 'Boston, MA',
        premium: true,
        trending: false,
        matchScore: 88,
        expectedROI: '38%',
        daysLeft: 21,
        featured: false
      },
      {
        id: 3,
        name: 'FinSecure',
        industry: 'Fintech',
        fundingStage: 'Series B',
        fundingGoal: '$5,000,000',
        raised: '$3,200,000',
        description: 'Blockchain-based security solutions for financial transactions and identity verification.',
        valuation: '$32M',
        teamSize: 24,
        location: 'New York, NY',
        premium: true,
        trending: true,
        matchScore: 92,
        expectedROI: '51%',
        daysLeft: 7,
        featured: true
      },
      {
        id: 4,
        name: 'AgriGrow',
        industry: 'Agritech',
        fundingStage: 'Series A',
        fundingGoal: '$1,800,000',
        raised: '$1,250,000',
        description: 'IoT-enabled precision farming solutions to optimize crop yield and reduce resource consumption.',
        valuation: '$12M',
        teamSize: 15,
        location: 'Austin, TX',
        premium: false,
        trending: true,
        matchScore: 85,
        expectedROI: '31%',
        daysLeft: 18,
        featured: false
      },
      {
        id: 5,
        name: 'Edutech Labs',
        industry: 'Education',
        fundingStage: 'Seed',
        fundingGoal: '$800,000',
        raised: '$450,000',
        description: 'Interactive learning platform using VR technology to create immersive educational experiences.',
        valuation: '$4.5M',
        teamSize: 10,
        location: 'Seattle, WA',
        premium: false,
        trending: false,
        matchScore: 79,
        expectedROI: '27%',
        daysLeft: 25,
        featured: false
      },
      {
        id: 6,
        name: 'LogistiChain',
        industry: 'Logistics',
        fundingStage: 'Series A',
        fundingGoal: '$3,200,000',
        raised: '$2,100,000',
        description: 'Supply chain optimization platform using AI to predict delays and optimize routes.',
        valuation: '$18M',
        teamSize: 18,
        location: 'Chicago, IL',
        premium: true,
        trending: true,
        matchScore: 90,
        expectedROI: '45%',
        daysLeft: 11,
        featured: true
      }
    ];
    setStartups(mockStartups);

    setNotifications([
      { id: 1, message: 'EcoTech Solutions reached 70% of their funding goal', time: '2 hours ago', read: false },
      { id: 2, message: 'Your investment in HealthAI has been confirmed', time: '1 day ago', read: false },
      { id: 3, message: 'New startups matching your criteria are available', time: '2 days ago', read: true }
    ]);
  }, []);

  const handleInvestClick = (startup) => {
    setSelectedStartup(startup);
    setShowInvestmentModal(true);
  };

  const handleInvestmentSubmit = (e) => {
    e.preventDefault();
    alert(`Investment of $${investmentAmount} in ${selectedStartup.name} has been submitted!`);
    setShowInvestmentModal(false);
    setInvestmentAmount('');
  };

  const calculateProgress = (raised, goal) => {
    const raisedNum = parseInt(raised.replace(/\$/g, '').replace(/,/g, ''));
    const goalNum = parseInt(goal.replace(/\$/g, '').replace(/,/g, ''));
    return (raisedNum / goalNum) * 100;
  };

  const filteredStartups = startups.filter(startup => {
    if (activeTab === 'all') return true;
    if (activeTab === 'featured') return startup.featured;
    if (activeTab === 'premium') return startup.premium;
    if (activeTab === 'trending') return startup.trending;
    return true;
  });

  if (!investorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

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
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{investorData.portfolioValue}</p>
                <p className="text-green-600 text-xs mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +2.3% today
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Investments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{investorData.activeInvestments}</p>
                <p className="text-blue-600 text-xs mt-1 flex items-center">
                  <Zap className="h-3 w-3 mr-1" /> 3 new opportunities
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available Funds</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{investorData.availableFunds}</p>
                <p className="text-gray-500 text-xs mt-1">Ready to invest</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{investorData.successRate}</p>
                <p className="text-amber-600 text-xs mt-1 flex items-center">
                  <Award className="h-3 w-3 mr-1" /> Top performer
                </p>
              </div>
              <div className="p-3 rounded-full bg-amber-100">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 p-6 bg-white rounded-xl border border-gray-200">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Startups
            </button>
            <button 
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'featured' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Featured
            </button>
            <button 
              onClick={() => setActiveTab('premium')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'premium' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Star className="h-4 w-4 inline mr-1" /> Premium
            </button>
            <button 
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'trending' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <TrendingUp className="h-4 w-4 inline mr-1" /> Trending
            </button>
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

        {/* Startups Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Investment Opportunities</h2>
            <div className="text-sm text-gray-500">
              Showing {filteredStartups.length} of {startups.length} startups
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <div key={startup.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-md">
                {/* Premium badge */}
                {startup.premium && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-bold">
                      <Star className="h-3 w-3 mr-1" /> PREMIUM
                    </div>
                  </div>
                )}
                
                {/* Trending badge */}
                {startup.trending && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                      <TrendingUp className="h-3 w-3 mr-1" /> TRENDING
                    </div>
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
                      <span>{startup.raised} / {startup.fundingGoal}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${calculateProgress(startup.raised, startup.fundingGoal)}%` }}
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
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-4">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Investment in HealthAI</p>
                  <p className="text-sm text-gray-500">$50,000 • 2 days ago</p>
                </div>
              </div>
              <div className="text-green-600 font-medium">+$2,340</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">EcoTech Solutions valuation update</p>
                  <p className="text-sm text-gray-500">$15M → $18M • 5 days ago</p>
                </div>
              </div>
              <div className="text-green-600 font-medium">+18%</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-4">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New investment opportunity</p>
                  <p className="text-sm text-gray-500">FinSecure • 1 week ago</p>
                </div>
              </div>
              <button className="text-green-600 font-medium hover:text-green-700">View</button>
            </div>
          </div>
        </div>
      </main>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Invest in {selectedStartup.name}</h3>
            <p className="text-gray-600 mb-6">Enter the amount you want to invest</p>
            
            <form onSubmit={handleInvestmentSubmit}>
              <div className="mb-6">
                <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <span className="text-green-600 font-medium">{selectedStartup.expectedROI}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your potential return</span>
                  <span className="font-medium text-gray-900">
                    ${investmentAmount ? (parseInt(investmentAmount) * (parseInt(selectedStartup.expectedROI) / 100)).toLocaleString() : '0'}
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

      
    </div>
  );
};

export default ProfessionalInvestorDashboard;