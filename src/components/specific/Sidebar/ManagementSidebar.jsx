import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBus,
  faUserGraduate,
  faUser,
  faUpload,
  faSignOutAlt,
  faUserCircle,
  faDriversLicense,
  faMessage
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/logo.png";


const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#FCD32D] text-slate-900 flex flex-col shadow-xl pt-50">

      {/* logo */}
      <div className="flex items-center m-auto py-5">
        <img className="w-12 h-12 mr-3" src={logo} alt="Logo" />
        <span className="text-3xl text-slate-800 font-bold font-['Ubuntu']">
          eGO Bus
        </span>
      </div>

      {/* Navigation Items */}
      <ul className="flex-1 px-4 py-6 space-y-2">
        {[
          // Dashboard
          { to: "/management", label: "Dashboard", icon: faTachometerAlt, exact: true },

          // Upload
          { to: "/management/upload", label: "Upload", icon: faUpload },

          // Buses
          { to: "/management/buses", label: "Buses", icon: faBus },

          // Students
          { to: "/management/students", label: "Students", icon: faUserGraduate },

          // Drivers
          { to: "/management/drivers", label: "Drivers", icon: faDriversLicense },

          // Notifications
          { to: "/management/notifications", label: "Notifications", icon: faMessage },

          // profile
          { to: "/management/profile", label: "Profile", icon: faUserCircle },
        ].map(({ to, label, icon, exact }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={exact}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 transition-all duration-300 ${isActive
                  ? "bg-white text-slate-900 font-bold rounded-lg shadow-md"
                  : "hover:bg-yellow-400 hover:text-slate-800"
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
      <div className="mt-auto p-3">
        <hr />
        <button
          className="flex items-center space-x-3 p-3 transition-all duration-300 hover:bg-yellow-400 hover:text-slate-800 w-full text-left"
        >
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
