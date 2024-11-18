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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="/management" element={<ManagementLayout />}>
          <Route index element={<ManagementDashboard />} />
          <Route path="buses" element={<Buses />} />
          <Route path="students" element={<Students />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
