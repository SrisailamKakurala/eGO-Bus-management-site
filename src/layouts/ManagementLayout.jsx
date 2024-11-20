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

  // In the Management Layout
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const schoolID = localStorage.getItem("schoolID");
        if (!schoolID) return;

        const data = await fetchSchoolData(schoolID);
        setSchoolData(data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    getData();
  }, [trigger]); // Refetch when `trigger` changes


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
          <Route path="upload" element={<Upload schoolData={schoolData} setTrigger={setTrigger} />} />
          <Route path="notifications" element={<Notifications schoolData={schoolData} />} />
          <Route path="profile" element={<Profile schoolData={schoolData} />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default ManagementLayout;
