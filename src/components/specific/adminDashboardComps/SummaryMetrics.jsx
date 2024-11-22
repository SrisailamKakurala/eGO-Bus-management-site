import React from 'react';

const SummaryMetrics = ({ metricsData }) => {
  const { totalBuses, totalStudents, totalSchools, activeSubscriptions } = metricsData;

  const metrics = [
    { label: 'Total Buses', value: totalBuses },
    { label: 'Total Students', value: totalStudents },
    { label: 'Total Schools', value: totalSchools },
    { label: 'Active Subscriptions', value: activeSubscriptions },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="p-5 bg-white text-black shadow-lg border-t-4 border-black rounded-lg transition-transform transform hover:scale-105 hover:border-red-500"
        >
          <h3 className="font-bold text-lg">{metric.label}</h3>
          <p className="text-3xl opacity-90 font-semibold">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryMetrics;
