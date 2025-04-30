import React from 'react';
import { Rocket, LineChart, Handshake } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      name: 'Startup Support',
      description: 'Get comprehensive support for your startup, from pitch deck reviews to business plan optimization.',
      icon: Rocket,
    },
    {
      name: 'Investment Opportunities',
      description: 'Access a curated network of investors actively looking for promising ventures in your industry.',
      icon: LineChart,
    },
    {
      name: 'Strategic Matching',
      description: 'Our advanced algorithm connects startups with investors based on industry focus, stage, and investment criteria.',
      icon: Handshake,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center mb-4">
  <span className="block text-green-600">Our Services</span>
</h1>
<p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
  We provide comprehensive solutions to connect innovative startups with strategic investors, facilitating successful partnerships.
</p>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.name}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;