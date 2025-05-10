import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, TrendingUp, DollarSign } from 'lucide-react';
import StartupCard from './Startup/StartupCard';
import SectionHeader from '../components/SectionHeader';

const startups = [
  {
    id: 1,
    name: 'EcoTech Solutions',
    industry: 'CleanTech',
    stage: 'Series A',
    revenue: '$500K/year',
    location: 'Austin',
    match: 96,
    description: 'Revolutionizing sustainable energy solutions for commercial buildings.',
    logo: 'https://images.pexels.com/photos/3943746/pexels-photo-3943746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'HealthAI',
    industry: 'Healthcare, AI',
    stage: 'Seed',
    revenue: '$200K/year',
    location: 'Boston',
    match: 92,
    description: 'AI-powered diagnostics and personalized treatment recommendations.',
    logo: 'https://images.pexels.com/photos/8439094/pexels-photo-8439094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'FinFlow',
    industry: 'FinTech',
    stage: 'Pre-Series A',
    revenue: '$1M/year',
    location: 'New York',
    match: 88,
    description: 'Streamlining financial operations for small businesses through automation.',
    logo: 'https://images.pexels.com/photos/7876439/pexels-photo-7876439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const StartupListing = () => {
  return (
    <div className="p-6">
      <SectionHeader 
        title="Featured Startups" 
        color="green" 
        description="Top matches based on your investment criteria"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
    </div>
  );
};

export default StartupListing;