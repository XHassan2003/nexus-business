import React from 'react';

const SectionHeader = ({ title, icon, description, color = 'indigo' }) => {
  const colorClass = {
    indigo: 'text-indigo-600',
  }[color];

  return (
    <div className={`flex items-center space-x-2 ${colorClass}`}>
      {icon && <div className="text-2xl">{icon}</div>}
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default SectionHeader;
