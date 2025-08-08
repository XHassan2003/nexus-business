import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Shield, Users, Target, MessageSquare, ArrowUpRight, BarChart2, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid
} from 'recharts';

const About = () => {
  // Enhanced stats with auto-incrementing numbers
  const stats = [
    { id: 1, label: 'Startups Funded', value: 500, suffix: '+', color: 'from-emerald-400 to-teal-500' },
    { id: 2, label: 'Total Investment', value: 100, suffix: 'M+', color: 'from-amber-400 to-orange-500' },
    { id: 3, label: 'Success Rate', value: 85, suffix: '%', color: 'from-violet-400 to-purple-600' },
    { id: 4, label: 'Active Investors', value: 1000, suffix: '+', color: 'from-cyan-400 to-blue-500' },
  ];

  const values = [
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'We embrace new ideas and technologies that help our users connect more effectively.',
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-100'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain transparency and honesty in all our operations and communications.',
      bg: 'bg-gradient-to-br from-amber-50 to-orange-100'
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'We strive to make startup funding accessible to entrepreneurs from all backgrounds.',
      bg: 'bg-gradient-to-br from-violet-50 to-purple-100'
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'We measure our success by the successful partnerships we help create.',
      bg: 'bg-gradient-to-br from-cyan-50 to-blue-100'
    },
  ];

  // Enhanced chart data with realistic patterns
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i];
    return {
      name: day,
      value: Math.floor(200 + Math.random() * 300),
      trend: Math.random() > 0.5 ? 'up' : 'down'
    };
  });

  // Auto-incrementing number component
  const CountUp = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            let start = 0;
            const increment = Math.floor(end / (duration / 16));
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(start);
              }
            }, 16);
          }
        },
        { threshold: 0.1 }
      );
      
      if (ref.current) observer.observe(ref.current);
      
      return () => observer.disconnect();
    }, [end, duration]);

    return (
      <span ref={ref} className="font-mono">
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Premium Hero Section */}
        <div className="text-center relative z-10 pb-20">
          <div className="absolute inset-0 -z-10 opacity-10">
            <div className="pattern-dots pattern-slate-300 pattern-size-4 pattern-opacity-100" />
          </div>
          
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm px-4 py-2 rounded-full mb-6">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Trusted by industry leaders</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">Transforming Vision into</span>
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Market Success
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600">
            Founded in 2023, Nexus Business creates strategic connections between innovative 
            startups and visionary investors through data-driven matchmaking.
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
            <a 
              href="/register" 
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
              Join Platform
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
            <a 
              href="/demo" 
              className="px-8 py-3 bg-white text-slate-900 font-medium rounded-lg border border-slate-200 shadow hover:shadow-md transition-all"
            >
              Request Demo
            </a>
          </div>
        </div>

        {/* Animated Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 transition-all hover:-translate-y-1"
            >
              <div className="absolute -mt-12">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl shadow-lg`}>
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-8">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-24 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 text-center w-4/5">
                  <div className="text-5xl font-bold text-white mb-2">87%</div>
                  <div className="text-emerald-100 font-medium">Match Success Rate</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 lg:mt-0">
            <div className="inline-flex items-center text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Rocket className="mr-2 h-4 w-4" />
              Our Mission
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900">
              Revolutionizing Startup-Investor Connections
            </h2>
            
            <p className="mt-4 text-lg text-slate-600">
              In today's dynamic market, securing the right financial partnership for innovative ventures remains a critical challenge. Our AI-driven platform transforms this process.
            </p>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-700">AI-powered matching algorithms</span>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-700">Real-time market analytics</span>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-700">Secure deal management</span>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-700">Global investor network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Insight */}
        <div className="mt-24 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl p-8 text-white overflow-hidden">
          <div className="relative z-10">
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="404" height="392" fill="none" viewBox="0 0 404 392">
                <circle cx="250" cy="100" r="150" stroke="white" strokeWidth="2" />
                <circle cx="150" cy="250" r="100" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  Market Research
                </div>
                
                <h2 className="text-3xl font-bold mb-4">
                  Financial Guidance Gap Presents Opportunity
                </h2>
                
                <p className="text-slate-300 text-lg mb-6">
                  <span className="text-2xl font-bold text-emerald-400">62%</span> of investors report relying on online sources as their primary financial guidance. 
                  This creates a significant opportunity for advisors to establish trust through data-driven insights.
                </p>
                
                <div className="flex items-center text-sm text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Source: Global Financial Innovation Report, Q2 2025
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="text-lg font-semibold mb-4">Investor Sentiment Analysis</div>
                <div className="space-y-4">
                  {['Early Stage Tech', 'Sustainable Energy', 'Fintech Solutions', 'Health Innovation', 'AI Platforms'].map((sector, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{sector}</span>
                        <span>{Math.floor(60 + Math.random() * 40)}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" 
                          style={{ width: `${Math.floor(60 + Math.random() * 40)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="mr-2 h-4 w-4" />
              Our Core Values
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Principles Guiding Our Vision
            </h2>
            <p className="text-slate-600">
              These fundamental beliefs shape our approach to creating meaningful connections
              between entrepreneurs and investors.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`${value.bg} rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300`}
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <Icon className="h-6 w-6 text-slate-800" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investor Intelligence Dashboard */}
        <div className="mt-24 bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-lg p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Investor Intelligence
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                  Advanced Market Analytics Dashboard
                </h2>
                
                <p className="text-slate-600 text-lg">
                  Make strategic investment decisions with real-time market intelligence
                  powered by AI-driven analysis and predictive modeling.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-2">Market Analysis Bot</p>
                    <p className="text-slate-300">
                      <span className="text-emerald-400 font-medium">📈 Bullish Trend:</span> Technology sector showing strong momentum with 12% quarterly growth. 
                      Consider increasing exposure to AI and cloud infrastructure positions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900">Portfolio Performance</h3>
                  <div className="text-sm font-medium text-emerald-600 flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    8.2% MTD Growth
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0d9488" 
                        fill="url(#colorUv)" 
                        strokeWidth={3}
                        activeDot={{ r: 6, fill: '#0d9488' }}
                      />
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Investor Profile
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-1 rounded-full">
                    <div className="bg-slate-800 p-1 rounded-full">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                        <span className="text-3xl font-bold text-amber-400">AJ</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold">Alex Johnson</h3>
                <p className="text-slate-400 mt-2">Venture Capital Partner</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Portfolio Value</span>
                    <span>$12.8M</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-4/5 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Risk Tolerance</span>
                    <span>High</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-3/4 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Sector Focus</span>
                    <span>Technology</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 w-2/3 rounded-full"></div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-700">
                  <h4 className="font-bold text-lg mb-4">Recent Activity</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'CloudSecure Inc', amount: '$2.1M', type: 'Investment' },
                      { name: 'NeuroTech Labs', amount: '$1.4M', type: 'Investment' },
                      { name: 'GreenEnergetix', amount: '$850K', type: 'Follow-on' }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-slate-400">{item.type}</div>
                        </div>
                        <div className="font-mono font-bold">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="pattern-grid pattern-slate-500 pattern-size-16 pattern-opacity-100" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Investment Strategy?
            </h2>
            
            <p className="text-slate-300 text-lg mb-10">
              Join our exclusive network of investors and entrepreneurs leveraging data-driven 
              insights for strategic growth.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Join as Startup
              </a>
              <a
                href="/register"
                className="px-8 py-4 bg-white text-slate-900 font-medium rounded-lg shadow hover:bg-slate-100 transition-all flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Join as Investor
              </a>
            </div>
            
            <div className="mt-8 text-sm text-slate-400">
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                256-bit encryption
              </span>
              <span className="mx-4">•</span>
              <span>GDPR compliant</span>
              <span className="mx-4">•</span>
              <span>SOC 2 certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;