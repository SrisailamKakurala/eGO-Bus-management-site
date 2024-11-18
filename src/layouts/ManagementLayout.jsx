import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../components/specific/Sidebar/ManagementSidebar';

import ManagementDashboard from '../pages/ManagementPages/ManagementDashboard';
import Buses from '../pages/ManagementPages/Buses';
import Students from '../pages/ManagementPages/Students';
import Drivers from '../pages/ManagementPages/Drivers';
import Upload from '../pages/ManagementPages/Upload';
import Profile from '../pages/ManagementPages/Profile';


const mockSchoolData = {
  schoolName: "Sunrise Public School",
  address: "45 Lakeview Street, Florida",
  noOfBuses: 5,
  buses: {
    bus1: {
      busNo: "123",
      trips: {
        trip1: {
          students: {
            student1: { studentName: "John Doe" },
            student2: { studentName: "Jane Smith" },
          },
        },
      },
    },
    bus2: {
      busNo: "456",
      trips: {
        trip1: {
          students: {
            student3: { studentName: "Alice Brown" },
          },
        },
      },
    },
  },
};


const ManagementLayout = () => {
  return (
    <div className="flex flex-1 overflow-hidden bg-slate-100">
      <Sidebar />
      <div className="h-full w-full p-4 overflow-y-auto scroll-hidden">
        {/* Sidebar renders, and child routes will dynamically load here */}
        <Routes>
          <Route index element={<ManagementDashboard />} />
          <Route path="buses" element={<Buses />} />
          <Route path="students" element={<Students />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="upload" element={<Upload />} />
          <Route path="profile" element={<Profile schoolData={mockSchoolData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ManagementLayout;
