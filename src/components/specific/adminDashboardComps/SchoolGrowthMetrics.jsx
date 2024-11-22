import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const SchoolGrowthMetrics = ({ growthData }) => {
  const { studentGrowth, busGrowth } = growthData;

  const growthIcon = (growth) =>
    growth > 0 ? (
      <FontAwesomeIcon icon={faArrowUp} className="text-green-500" />
    ) : (
      <FontAwesomeIcon icon={faArrowDown} className="text-red-500" />
    );

  return (
    <div className="p-6 mx-6 bg-white shadow-lg rounded-lg mt-5">
      <h3 className="font-bold text-lg text-black border-b-2 border-red-500 pb-3 mb-4">School Growth Metrics</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h4 className="font-semibold text-lg">Students</h4>
          {growthIcon(studentGrowth)}
        </div>
        <p className="text-xl">{studentGrowth > 0 ? `+${studentGrowth}` : studentGrowth}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h4 className="font-semibold text-lg">Buses</h4>
          {growthIcon(busGrowth)}
        </div>
        <p className="text-xl">{busGrowth > 0 ? `+${busGrowth}` : busGrowth}</p>
      </div>
    </div>
  );
};

export default SchoolGrowthMetrics;
