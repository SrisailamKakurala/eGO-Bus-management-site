import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ManagementLayout from '../layouts/ManagementLayout';

import AdminDashboard from '../pages/AdminPages/AdminDashboard';

import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* Management Routes */}
        <Route path="/management/*" element={<ManagementLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
