import React, { useState } from "react";
import { registerSchool } from "../../services/registerSchool"; // Import the updated service

const RegisterSchool = () => {
  const [formData, setFormData] = useState({
    schoolId: "",
    schoolName: "",
    location: "",
    totalBuses: "",
    totalStudents: "",
    mailId: "",
    mobile: "",
    alternateMobile: "",
    principal: "",
    password: "",
    website: "",
    subscribed: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { schoolId, ...schoolData } = formData;

    if (!schoolId.trim()) {
      alert("Please provide a School ID.");
      return;
    }

    try {
      const result = await registerSchool(schoolId, schoolData);
      if (result.success) {
        alert(`School registered successfully with ID: ${result.id}`);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Something went wrong!");
    }

    // Clear the form
    setFormData({
      schoolId: "",
      schoolName: "",
      location: "",
      totalBuses: "",
      totalStudents: "",
      mailId: "",
      mobile: "",
      alternateMobile: "",
      principal: "",
      password: "",
      website: "",
    });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent text-white p-8">
      <div className="w-full max-w-screen-xl bg-white bg-opacity-20 backdrop-blur-xl shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          🎓 Register a School
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: School Details */}
          <div className="grid grid-cols-3 gap-8">
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                School ID
              </label>
              <input
                type="text"
                name="schoolId"
                value={formData.schoolId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-red-300 "
                placeholder="Enter unique School ID"
              />
            </div>
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                School Name
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-red-300 "
                placeholder="Enter school name"
              />
            </div>
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                Address
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-red-300 "
                placeholder="Enter school address"
              />
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-yellow-300 "
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                Alternate Mobile
              </label>
              <input
                type="text"
                name="alternateMobile"
                value={formData.alternateMobile}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-yellow-300 "
                placeholder="Enter alternate mobile number"
              />
            </div>
          </div>

          {/* Section 3: Additional Details */}
          <div className="grid grid-cols-3 gap-8">
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                Total Buses
              </label>
              <input
                type="number"
                name="totalBuses"
                value={formData.totalBuses}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-pink-300 "
                placeholder="Enter total buses"
              />
            </div>
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                Total Students
              </label>
              <input
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-pink-300 "
                placeholder="Enter total students"
              />
            </div>
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                Principal's Name
              </label>
              <input
                type="text"
                name="principal"
                value={formData.principal}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-pink-300 "
                placeholder="Enter principal's name"
              />
            </div>
          </div>

          {/* Section 4: Account Details */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                Email ID
              </label>
              <input
                type="email"
                name="mailId"
                value={formData.mailId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-yellow-400 "
                placeholder="Enter email ID"
              />
            </div>
            <div>
              <label className="block text-white font-medium text-lg mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-yellow-400 "
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* Website (Optional) */}
          <div>
            <label className="block text-white font-medium text-lg mb-2">
              Website (Optional)
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg  focus:outline-none text-black font-semibold bg-white focus:ring-2 focus:ring-red-300 "
              placeholder="Enter school website"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-red-500 text-white text-xl font-semibold hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            🚀 Register School
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterSchool;
