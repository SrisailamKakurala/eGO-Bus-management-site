import React from 'react';

const VehicleStatus = ({ vehiclesData }) => {
  const { totalBuses, busesOnDuty, busesOffDuty } = vehiclesData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Buses */}
      <div className="p-4 text-center bg-white text-black rounded-lg shadow-lg hover:bg-[#FCD32D] hover:text-white transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-[#FCD32D] hover:border-gray-500 hover:border-l-4">
        <h3 className="font-semibold text-xl">Total Buses</h3>
        <p className="text-3xl opacity-75">{totalBuses}</p>
      </div>

      {/* Buses On Duty */}
      <div className="p-4 text-center bg-white text-black rounded-lg shadow-lg hover:bg-[#FCD32D] hover:text-white transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-[#FCD32D] hover:border-gray-500 hover:border-l-4">
        <h3 className="font-semibold text-xl">Buses On Duty (In Progress)</h3>
        <p className="text-3xl opacity-75">{busesOnDuty}</p>
      </div>

      {/* Buses Off Duty */}
      <div className="p-4 text-center bg-white text-black rounded-lg shadow-lg hover:bg-[#FCD32D] hover:text-white transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-[#FCD32D] hover:border-gray-500 hover:border-l-4">
        <h3 className="font-semibold text-xl">Buses Off Duty (Trip Completed)</h3>
        <p className="text-3xl opacity-75">{busesOffDuty}</p>
      </div>
    </div>
  );
};

export default VehicleStatus;
