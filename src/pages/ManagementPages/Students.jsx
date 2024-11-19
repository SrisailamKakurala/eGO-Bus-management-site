import React, { useState } from 'react';

const Students = ({ schoolData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStudent, setExpandedStudent] = useState(null); // To track which student's details are expanded

  // Check if schoolData and schoolData.buses exist
  if (!schoolData || !schoolData.buses) {
    return <p className="text-lg text-gray-500">No student data available.</p>;
  }

  const busArray = Object.values(schoolData.buses); // Convert object to an array

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Collect all students from all buses and their details
  const students = busArray.flatMap((bus) =>
    Object.entries(bus?.trips || {}).flatMap(([tripKey, trip]) =>
      Object.entries(trip.students || {}).map(([studentName, studentData]) => ({
        studentName,
        busNo: bus.busNo,
        driverName: bus.driverName,
        driverMobile: bus.driverMobile,
        parentMobile: studentData.parentMobile,
      }))
    )
  );

  // Toggle the "Read More" and "Read Less" for student details
  const handleToggleStudent = (studentName) => {
    setExpandedStudent(expandedStudent === studentName ? null : studentName);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-[#FCD32D] mb-6">Search for a Student</h1>

      <hr className="my-5" />

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Student Name"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Filtered Students List */}
      <div className="mb-8">
        {students.length > 0 ? (
          students
            .filter((student) =>
              student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((student) => (
              <div
                key={student.studentName}
                className="p-4 bg-white shadow-lg border-2 border-t-[#FCD32D] rounded-lg mb-4 hover:bg-yellow-50"
              >
                <h2 className="text-2xl font-bold text-gray-800">Student: {student.studentName}</h2>
                
                {/* Student Details - Read More / Read Less */}
                {expandedStudent === student.studentName ? (
                  <div>
                    <p className="text-lg text-gray-500">Bus No: {student.busNo}</p>
                    <p className="text-lg text-gray-500">Driver: {student.driverName}</p>
                    <p className="text-lg text-gray-500">Driver Mobile: {student.driverMobile}</p>
                    <p className="text-lg text-gray-500">Parent Mobile: {student.parentMobile}</p>
                    <button
                      onClick={() => handleToggleStudent(student.studentName)}
                      className="text-blue-500 mt-2"
                    >
                      Read Less
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleToggleStudent(student.studentName)}
                    className="text-blue-500 mt-2"
                  >
                    Read More
                  </button>
                )}
              </div>
            ))
        ) : (
          <p className="text-lg text-gray-500">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Students;
