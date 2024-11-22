import React from 'react';

const SOSAlerts = ({ sosAlerts }) => {
  return (
    <div className="space-y-4">
      {sosAlerts.map((alert, index) => (
        <div key={index} className="p-4 bg-orange-400 text-white rounded-lg shadow-lg hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-[1.02] my-5 hover:border-gray-500 hover:border-t-4 hover:border-l-4">
          <h3 className="font-semibold text-xl">SOS Alert #{index + 1}</h3>
          <p className="text-lg">{alert.message}</p>
          <p className="text-sm italic">{new Date(alert.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default SOSAlerts;
