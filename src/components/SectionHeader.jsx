import React from 'react';

const SectionHeader = ({ title, icon, description, color = 'indigo' }) => {
  const colorClass = {
    indigo: 'text-indigo-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
    yellow: 'text-yellow-500',
  }[color] || 'text-indigo-600';

  return (
    <div className="text-center">
      <h2 className={`text-2xl md:text-3xl font-extrabold ${colorClass} flex items-center justify-center gap-2`}>
        <span>{icon}</span>
        <span>{title}</span>
      </h2>
      {description && (
        <p className="mt-2 text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
