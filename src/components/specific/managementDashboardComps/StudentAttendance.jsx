import React from 'react';

const StudentAttendance = ({ attendanceData }) => {
  const { totalStudents, studentsPresentToday } = attendanceData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* Total Students */}
      <div className="p-4 text-center bg-white text-black rounded-lg shadow-lg hover:bg-[#FCD32D] hover:text-white transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-[#FCD32D] hover:border-gray-500 hover:border-l-4">
        <h3 className="font-semibold text-xl">Total Students</h3>
        <p className="text-3xl opacity-75">{totalStudents}</p>
      </div>

      {/* Students Present Today */}
      <div className="p-4 text-center bg-white text-black rounded-lg shadow-lg hover:bg-[#FCD32D] hover:text-white transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-[#FCD32D] hover:border-gray-500 hover:border-l-4">
        <h3 className="font-semibold text-xl">Students Present Today</h3>
        <p className="text-3xl opacity-75">{studentsPresentToday}</p>
      </div>
    </div>
  );
};

export default StudentAttendance;
