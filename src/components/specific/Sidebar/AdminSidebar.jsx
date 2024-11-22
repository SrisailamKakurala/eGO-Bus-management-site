import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faSchool,
  faUserPlus,
  faEnvelope,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/logo.png";

const AdminSidebar = () => {

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="h-screen w-[20vw] bg-red-500 text-white flex flex-col shadow-xl pt-5">
      {/* logo */}
      <div className="flex items-center m-auto py-5">
        <img className="w-12 h-12 mr-3" src={logo} alt="Logo" />
        <span className="text-2xl font-bold font-['Ubuntu']">
          eGO Admin
        </span>
      </div>

      {/* Navigation Items */}
      <ul className="flex-1 px-4 py-6 space-y-2">
        {[
          // Dashboard
          { to: "/admin", label: "Dashboard", icon: faTachometerAlt, exact: true },

          // Founder Registration
          { to: "/admin/school-registration", label: "Register School", icon: faUserPlus },

          // School Management
          { to: "/admin/manage-schools", label: "Manage Schools", icon: faSchool },

          // Send Email
          { to: "/admin/send-email", label: "Send Email", icon: faEnvelope },
        ].map(({ to, label, icon, exact }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={exact} 
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 transition-all duration-300 ${isActive
                  ? "bg-black text-white font-bold rounded-lg shadow-md"
                  : "hover:bg-red-700 hover:text-white"
                }`
              }
            >
              <FontAwesomeIcon icon={icon} size="lg" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Sign Out Button at the Bottom */}
      <div className="mt-auto p-3" onClick={handleLogout}>
        <hr />
        <button
          className="flex items-center space-x-3 p-3 transition-all duration-300 hover:bg-red-700 hover:text-white w-full text-left"
        >
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
