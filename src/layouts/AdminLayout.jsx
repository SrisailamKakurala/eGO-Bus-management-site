import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/specific/Sidebar/AdminSidebar';  
import Dashboard from '../pages/AdminPages/AdminDashboard';   
import RegisterSchool from '../pages/AdminPages/SchoolRegistration';  
import SchoolManagement from '../pages/AdminPages/SchoolManagement';  
import SendEmail from '../pages/AdminPages/SendEmail';  
import Loader from '../components/common/Loader';

const AdminLayout = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {

    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/"); 
      }, 1000);
    }

  }, [navigate]); 

  if (loading) {
    return (
      <Loader />
    );
  }
  

  return (
    <div className="flex flex-1 overflow-hidden bg-black">
      <Sidebar />  {/* Sidebar for admin navigation */}
      <div className="h-screen w-full p-4 overflow-y-auto">
        <Routes>
          <Route index element={<Dashboard adminData={adminData} />} />
          <Route path="school-registration" element={<RegisterSchool />} />
          <Route path="manage-schools" element={<SchoolManagement adminData={adminData} />} />
          <Route path="send-email" element={<SendEmail adminData={adminData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
