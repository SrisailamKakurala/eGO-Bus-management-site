import React from 'react';

const TopSchools = ({ schoolsData }) => {
  const rankColors = ['bg-yellow-500', 'bg-gray-400', 'bg-orange-400']; // Gold, Silver, Bronze

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
    
      {schoolsData.slice(0, 3).map((school, index) => (
        <div
          key={school.id}
          className={`p-5 text-white shadow-lg rounded-lg transition-transform transform hover:scale-105 ${rankColors[index]}`}
        >
          <h3 className="font-bold text-lg">{school.name}</h3>
          <p className="text-xl">Students: {school.students}</p>
        </div>
      ))}
    </div>
  );
};

export default TopSchools;
