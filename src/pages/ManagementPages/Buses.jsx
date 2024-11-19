import React, { useState } from "react";

const Buses = ({ schoolData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedBus, setExpandedBus] = useState(null); // To track which bus is expanded
  const [expandedStudents, setExpandedStudents] = useState(null); // To track which student's list is expanded

  // Check if schoolData and schoolData.buses exist
  if (!schoolData || !schoolData.buses) {
    return <p className="text-lg text-gray-500">No bus data available.</p>;
  }

  const busArray = Object.values(schoolData.buses); // Convert object to an array

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBuses = busArray.filter((bus) =>
    String(bus.busNo).includes(searchQuery.trim())
  );

  // Toggle the "Read More" and "Read Less" for students
  const handleToggleStudents = (busNo) => {
    setExpandedStudents(expandedStudents === busNo ? null : busNo);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-[#FCD32D] mb-6">Search for a Bus</h1>

      <hr className="my-5" />

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Bus Number"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Filtered Buses List */}
      <div className="mb-8">
        {filteredBuses.length > 0 ? (
          filteredBuses.map((bus) => (
            <div
              key={bus.busNo}
              className="p-4 bg-white shadow-lg border-2 border-t-[#FCD32D] rounded-lg mb-4 hover:bg-yellow-50"
            >
              <h2 className="text-2xl font-bold text-gray-800">Bus No: {bus.busNo}</h2>
              <p className="text-lg text-gray-500">Driver: {bus.driverName}</p>
              <p className="text-lg text-gray-500">Driver Mobile: {bus.driverMobile}</p>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">Students:</h3>
              
              {/* Students List - Read More / Read Less */}
              {expandedStudents === bus.busNo ? (
                <div>
                  <ul className="list-disc pl-6">
                    {Object.values(bus?.trips || {}).map((trip, idx) => (
                      <React.Fragment key={idx}>
                        {Object.entries(trip.students || {}).map(([studentName, studentData]) => (
                          <li key={studentName} className="text-gray-600">
                            <strong>{studentName} : {studentData.parentMobile}</strong>
                          </li>
                        ))}
                      </React.Fragment>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleToggleStudents(bus.busNo)}
                    className="text-blue-500 mt-2"
                  >
                    Read Less
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleToggleStudents(bus.busNo)}
                  className="text-blue-500 mt-2"
                >
                  Read More
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No buses found.</p>
        )}
      </div>
    </div>
  );
};

export default Buses;
