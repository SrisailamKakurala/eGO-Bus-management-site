import Sidebar from '../components/specific/Sidebar/AdminSidebar';
import Navbar from '../components/specific/Navbar/AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
