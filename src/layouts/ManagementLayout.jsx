import Sidebar from '../components/specific/Sidebar/ManagementSidebar';
import Navbar from '../components/specific/Navbar/ManagementNavbar';

const ManagementLayout = ({ children }) => {
  console.log("entered mngmt layout: " , children)
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="h-full w-full p-4  overflow-y-auto">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default ManagementLayout;

