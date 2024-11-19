import React, { useState } from 'react';

const Drivers = ({ schoolData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDriver, setExpandedDriver] = useState(null); // To track which driver is expanded

  // Check if schoolData and schoolData.buses exist
  if (!schoolData || !schoolData.buses) {
    return <p className="text-lg text-gray-500">No driver data available.</p>;
  }

  const busArray = Object.values(schoolData.buses); // Convert object to an array

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDrivers = busArray
    .map((bus) => bus.driverName)
    .filter((driverName, idx, self) => self.indexOf(driverName) === idx); // Get unique driver names

  // Toggle the "Read More" and "Read Less" for driver details
  const handleToggleDriver = (driverName) => {
    setExpandedDriver(expandedDriver === driverName ? null : driverName);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-[#FCD32D] mb-6">Search for a Driver</h1>

      <hr className="my-5" />

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Driver Name"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Filtered Drivers List */}
      <div className="mb-8">
        {filteredDrivers.length > 0 ? (
          filteredDrivers
            .filter((driverName) => driverName.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((driverName) => (
              <div key={driverName} className="p-4 bg-white shadow-lg border-2 border-t-[#FCD32D] rounded-lg mb-4 hover:bg-yellow-50">
                <h2 className="text-2xl font-bold text-gray-800">Driver: {driverName}</h2>
                
                {/* Driver Details - Read More / Read Less */}
                {expandedDriver === driverName ? (
                  <div>
                    {busArray
                      .filter((bus) => bus.driverName === driverName)
                      .map((bus) => (
                        <div key={bus.busNo}>
                          <p className="text-lg text-gray-500">Bus No: {bus.busNo}</p>
                          <p className="text-lg text-gray-500">Driver Mobile: {bus.driverMobile}</p>
                        </div>
                      ))}
                    <button
                      onClick={() => handleToggleDriver(driverName)}
                      className="text-blue-500 mt-2"
                    >
                      Read Less
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleToggleDriver(driverName)}
                    className="text-blue-500 mt-2"
                  >
                    Read More
                  </button>
                )}
              </div>
            ))
        ) : (
          <p className="text-lg text-gray-500">No drivers found.</p>
        )}
      </div>
    </div>
  );
};

export default Drivers;
