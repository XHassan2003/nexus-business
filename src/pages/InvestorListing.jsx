import React from 'react';
import { Link } from 'react-router-dom';
import InvestorCard from './Investor/InvestorCard';
import SectionHeader from '../components/SectionHeader';

const investors = [
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
  }
];

const InvestorListing = () => {
  return (
    <div className="p-6">
      <SectionHeader 
        title="Featured Investors" 
        color="green" 
        description="Top matches based on your startup profile"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {investors.map((investor) => (
          <InvestorCard key={investor.id} investor={investor} />
        ))}
      </div>
    </div>
  );
};

export default InvestorListing;