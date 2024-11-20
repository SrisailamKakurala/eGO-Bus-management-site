import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from '../components/specific/Sidebar/AdminSidebar';  
// import { fetchAdminData } from '../services/fetchAdminData';  
import Dashboard from '../pages/AdminPages/AdminDashboard';   
import SchoolRegistration from '../pages/AdminPages/SchoolRegistration';  
import SchoolManagement from '../pages/AdminPages/SchoolManagement';  
import SendEmail from '../pages/AdminPages/SendEmail';  

const AdminLayout = () => {
  const [adminData, setAdminData] = useState(null);

  // Fetch admin data (like the list of schools, founders, etc.)
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await fetchAdminData();  // Fetching data for the admin
  //       setAdminData(data);
  //     } catch (error) {
  //       console.error("Error fetching admin data:", error);
  //     }
  //   };

  //   getData();
  // }, []);

  return (
    <div className="flex flex-1 overflow-hidden bg-black">
      <Sidebar />  {/* Sidebar for admin navigation */}
      <div className="h-screen w-full p-4 overflow-y-auto">
        <Routes>
          <Route index element={<Dashboard adminData={adminData} />} />
          <Route path="school-registration" element={<SchoolRegistration />} />
          <Route path="manage-schools" element={<SchoolManagement adminData={adminData} />} />
          <Route path="send-email" element={<SendEmail adminData={adminData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
