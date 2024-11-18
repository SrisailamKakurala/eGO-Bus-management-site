import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ManagementLayout from '../layouts/ManagementLayout';

import AdminDashboard from '../pages/AdminPages/AdminDashboard';

import Login from '../pages/Login';
import ManagementDashboard from '../pages/ManagementPages/ManagementDashboard';
import Buses from '../pages/ManagementPages/Buses';
import Students from '../pages/ManagementPages/Students';
import Drivers from '../pages/ManagementPages/Drivers';
import Upload from '../pages/ManagementPages/Upload';
import Profile from '../pages/ManagementPages/Profile';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        {/* Management Routes */}
        <Route path="/management/*" element={<ManagementLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
