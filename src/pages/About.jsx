import React from 'react';
import { Rocket, Shield, Users, Target, MessageSquare } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const About = () => {
  const stats = [
    { label: 'Startups Funded', value: '500+' },
    { label: 'Total Investment', value: '$100M+' },
    { label: 'Success Rate', value: '85%' },
    { label: 'Active Investors', value: '1000+' },
  ];

  const values = [
    {
      icon: Rocket,
      title: 'Innovation',
      description:
        'We embrace new ideas and technologies that help our users connect more effectively.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description:
        'We maintain transparency and honesty in all our operations and communications.',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description:
        'We strive to make startup funding accessible to entrepreneurs from all backgrounds.',
    },
    {
      icon: Target,
      title: 'Impact',
      description:
        'We measure our success by the successful partnerships we help create.',
    },
  ];

  const chartData = [
    { name: 'Mon', value: 220 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 250 },
    { name: 'Thu', value: 380 },
    { name: 'Fri', value: 320 },
  ];

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Transforming Ideas into</span>
            <span className="block text-green-600">Successful Ventures</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Founded in 2023, Nexus Business bridges the gap between innovative
            startups and visionary investors.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl font-bold text-green-800">
                {stat.value}
              </div>
              <div className="mt-2 text-base font-medium text-green-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

     

        {/* Mission */}
        <div className="mt-24 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative">
            <img
              className="rounded-lg shadow-xl"
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Team collaboration"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent rounded-lg"></div>
          </div>
          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600">
              In today's fast-paced business world, finding the right financial
              backing for groundbreaking ideas can be challenging.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our platform uses advanced matching algorithms to connect
              entrepreneurs and investors.
            </p>
          </div>
        </div>







   {/* Trusted Advisor */}
        <div className="mt-24 bg-green-50 border border-green-200 rounded-2xl p-8 shadow-md">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-green-800 mb-4">
                Financial misinformation is prevalent
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Over 50% of investors report that the internet is their primary
                source of financial guidance. This presents an opportunity for advisors
                to guide with clarity and trust.
              </p>
              <p className="text-sm text-gray-500">
                Source: MFI Update, February 2025
              </p>
            </div>
            <div>
             
            </div>
          </div>
        </div>









        {/* Values */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>







        {/* Investor Intelligence Dashboard */}
        <div className="mt-24 bg-white rounded-2xl border border-green-100 shadow-md p-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-green-700">
                Investor Intelligence Dashboard
              </h2>
              <p className="text-gray-600 text-lg">
                Make informed investment decisions with real-time market insights and
                AI-powered analysis.
              </p>

              {/* Chat Bubble Enlarged */}
              <div className="bg-green-100 rounded-2xl p-6 border border-green-200 shadow-md max-w-xl">
                <div className="flex items-start gap-4">
                  <MessageSquare className="text-green-600 mt-1 w-6 h-6" />
                  <div>
                    <p className="text-green-700 font-bold text-lg">Investor Bot</p>
                    <p className="text-gray-800 text-base mt-1">
                      📈 Market is showing strong upward momentum. You may consider
                      holding your growth stocks till Q4 for maximum returns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-gray-50 p-4 rounded-xl border shadow-inner w-280 h-80">
                <ResponsiveContainer width="90%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#22c55e"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Section: Investor Visual */}
           
          </div>
        </div>








        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Ready to Get Started?
          </h2>
          <div className="inline-flex space-x-4">
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Join as Startup
            </a>
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
            >
              Join as Investor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
