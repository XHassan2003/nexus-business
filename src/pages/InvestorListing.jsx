import React, { useState, useEffect } from 'react';
import InvestorCard from './Investor/InvestorCard';
import SectionHeader from '../components/SectionHeader';

const InvestorListing = () => {
  const [investors, setInvestors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFocus, setFilterFocus] = useState('all');

  // Mock data for investors
  const mockInvestors = [
    {
      id: 1,
      name: 'Tech Ventures Capital',
      focus: 'SaaS, AI/ML',
      minInvestment: '$500K',
      location: 'San Francisco',
      match: 95,
      description: 'Early-stage venture fund focusing on transformative technologies.',
      logo: 'https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Green Innovation Fund',
      focus: 'CleanTech, Sustainability',
      minInvestment: '$250K',
      location: 'New York',
      match: 88,
      description: 'Supporting sustainable solutions that address climate change.',
      logo: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Global Growth Partners',
      focus: 'E-commerce, FinTech',
      minInvestment: '$1M',
      location: 'London',
      match: 82,
      description: 'Helping innovative companies scale internationally with strategic capital.',
      logo: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      name: 'HealthTech Ventures',
      focus: 'Healthcare, Biotechnology',
      minInvestment: '$750K',
      location: 'Boston',
      match: 90,
      description: 'Investing in cutting-edge healthcare technology and biotech innovations.',
      logo: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      name: 'NextGen Fund',
      focus: 'AI/ML, Robotics',
      minInvestment: '$300K',
      location: 'Austin',
      match: 85,
      description: 'Backing the next generation of AI and robotics companies.',
      logo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 6,
      name: 'Ocean Impact Capital',
      focus: 'Sustainability, CleanTech',
      minInvestment: '$400K',
      location: 'San Diego',
      match: 87,
      description: 'Dedicated to funding solutions for ocean conservation and sustainability.',
      logo: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, we might get this from localStorage or an API
      const storedInvestors = JSON.parse(localStorage.getItem('investors')) || mockInvestors;
      setInvestors(storedInvestors);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter investors based on search term and focus filter
  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.focus.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFocus = filterFocus === 'all' || investor.focus.toLowerCase().includes(filterFocus.toLowerCase());
    
    return matchesSearch && matchesFocus;
  });

  const handleInvestorClick = (investorId) => {
    // Navigate to investor detail page
    window.location.hash = `#/investor/${investorId}`;
  };

  const focusOptions = [
    { value: 'all', label: 'All Focus Areas' },
    { value: 'SaaS', label: 'SaaS' },
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'CleanTech', label: 'CleanTech' },
    { value: 'Sustainability', label: 'Sustainability' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'FinTech', label: 'FinTech' },
    { value: 'Healthcare', label: 'Healthcare' }
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <SectionHeader 
          title="Featured Investors" 
          color="green" 
          description="Top matches based on your startup profile"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map(item => (
            <div key={item} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <SectionHeader 
        title="Featured Investors" 
        color="green" 
        description="Top matches based on your startup profile"
      />
      
      {/* Search and Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Investors
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Search by name, focus, or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <label htmlFor="focus" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Focus Area
            </label>
            <select
              id="focus"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={filterFocus}
              onChange={(e) => setFilterFocus(e.target.value)}
            >
              {focusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredInvestors.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No investors found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterFocus('all');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map((investor) => (
              <div 
                key={investor.id} 
                onClick={() => handleInvestorClick(investor.id)}
                className="cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <InvestorCard investor={investor} />
              </div>
            ))}
          </div>
          
          {/* Results count */}
          <div className="mt-6 text-sm text-gray-500">
            Showing {filteredInvestors.length} of {investors.length} investors
          </div>
        </>
      )}
    </div>
  );
};

export default InvestorListing;