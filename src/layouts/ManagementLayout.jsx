import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/specific/Sidebar/ManagementSidebar';

import ManagementDashboard from '../pages/ManagementPages/ManagementDashboard';
import Buses from '../pages/ManagementPages/Buses';
import Students from '../pages/ManagementPages/Students';
import Drivers from '../pages/ManagementPages/Drivers';
import Upload from '../pages/ManagementPages/Upload';
import Notifications from '../components/specific/Notifications/ManagementNotifications';
import Profile from '../pages/ManagementPages/Profile';

import { fetchSchoolData } from '../services/fetchSchoolData';  // Importing the service

const ManagementLayout = () => {
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSchoolData('S001'); // REPLACE WITH ACTUAL SCHOOL ID
        setSchoolData(data);  // Set the fetched data in the state
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };
    
    getData();
  }, []);

  return (
    <div className="flex flex-1 overflow-hidden bg-slate-100">
      <Sidebar />
      <div className="h-screen w-full p-4 overflow-y-auto scroll-hidden">
        {/* Sidebar renders, and child routes will dynamically load here */}
        <Routes>
          <Route index element={<ManagementDashboard schoolData={schoolData} />} />
          <Route path="buses" element={<Buses schoolData={schoolData} />} />
          <Route path="students" element={<Students schoolData={schoolData} />} />
          <Route path="drivers" element={<Drivers schoolData={schoolData} />} />
          <Route path="upload" element={<Upload schoolData={schoolData} />} />
          <Route path="notifications" element={<Notifications schoolData={schoolData} />} />
          <Route path="profile" element={<Profile schoolData={schoolData} />} /> {/* Passing fetched data */}
        </Routes>
      </div>
    </div>
  );
};

export default ManagementLayout;
