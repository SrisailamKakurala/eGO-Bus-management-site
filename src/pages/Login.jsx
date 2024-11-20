import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../services/authService";
import { Player } from "@lottiefiles/react-lottie-player";
import logo from "../assets/images/logo.png";
import liquidAnimation from "../assets/animations/container-yellowwater.json";
import loginleft from "../assets/images/loginleft.png";

const LoginPage = () => {
  const [schoolID, setSchoolID] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!schoolID || !password) {
      setErrorMessage("Please enter both School ID and Password.");
      return;
    }
  
    try {
      const authResponse = await authenticateUser(schoolID, password);
  
      if (authResponse.isAdmin) {
        localStorage.setItem('schoolID', schoolID);
        navigate("/admin"); // Navigate to admin dashboard
      } else {
        localStorage.setItem('schoolID', schoolID);
        navigate("/management"); // Navigate to management dashboard (school)
      }
    } catch (error) {
      setErrorMessage(error.message); // Display error message on login failure
    }
  };
  

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Section */}
      <div
        className="flex justify-center items-center w-1/2 bg-contain bg-no-repeat bg-bottom"
        style={{ backgroundImage: `url(${loginleft})` }}
      >
        <h1 className="absolute text-8xl font-bold text-[#FCD32D] mt-6 mb-40">
          Welcome to <p className="text-black">eGO Bus</p>
        </h1>
        <i className="absolute text-xl text-slate-800 mt-32 mr-4">
          ~ Efficient school transport management at your fingertips.
        </i>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center bg-white w-full md:w-1/2 relative">
        {/* Circular Div with Lottie Animation */}
        <div
          className="relative flex justify-center items-center w-[650px] h-[650px] bg-[#FCD32D] rounded-full overflow-hidden shadow-xl"
          style={{ marginLeft: "-100px" }} // Adjust overlap
        >
          {/* Lottie Animation */}
          <Player
            autoplay
            loop
            speed={0.1}
            src={liquidAnimation}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Form Overlay */}
          <div className="absolute z-10 w-[65%] bg-white bg-opacity-50 rounded-xl shadow-2xl p-6">
            <form onSubmit={handleLogin}>
              {/* Logo */}
              <div className="flex items-center justify-center mb-6">
                <img src={logo} alt="Logo" className="w-12 h-12" />
                <h1 className="text-4xl font-extrabold text-[#FCD32D] ml-3">
                  eGO Bus
                </h1>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Login to Your School Account
              </h2>

              {/* School ID */}
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">
                  School ID
                </label>
                <input
                  type="text"
                  placeholder="Enter School ID"
                  className="w-full border-none rounded-lg p-3 text-gray-700 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FCD32D] bg-opacity-70"
                  value={schoolID}
                  onChange={(e) => setSchoolID(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full border-none rounded-lg p-3 text-gray-700 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FCD32D] bg-opacity-70"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">{errorMessage}</div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#FCD32D] text-white py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
