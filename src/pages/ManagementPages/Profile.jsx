import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool, faMapMarkerAlt, faBus, faUserGraduate, faRoute } from "@fortawesome/free-solid-svg-icons";
import Lottie from "react-lottie"; // Import react-lottie
import animationData from "../../assets/animations/beat-uploadpage.json";

const Profile = ({ schoolData }) => {
  const [busesCount, setBusesCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [tripsCount, setTripsCount] = useState(0);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (schoolData) {
      const incrementCounts = () => {
        const { noOfBuses, buses } = schoolData;

        const totalStudents = Object.values(buses).reduce(
          (acc, bus) =>
            acc +
            Object.values(bus.trips || {}).reduce(
              (tripAcc, trip) => tripAcc + Object.keys(trip.students || {}).length,
              0
            ),
          0
        );

        const totalTrips = Object.values(buses).reduce(
          (acc, bus) => acc + Object.keys(bus.trips || {}).length,
          0
        );

        let count = 0;

        const interval = setInterval(() => {
          count++;
          if (count <= noOfBuses) setBusesCount(count);
          if (count <= totalStudents) setStudentsCount(count);
          if (count <= totalTrips) setTripsCount(count);

          if (count >= Math.max(noOfBuses, totalStudents, totalTrips)) {
            clearInterval(interval);
          }
        }, 100); // Speed of animation
      };

      incrementCounts();
    }
  }, [schoolData]);

  if (!schoolData) {
    return (
      <div className="h-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-[#FCD32D]">School Profile</h1>
        <p className="mt-4 text-gray-500">No school data available.</p>
      </div>
    );
  }

  const { schoolName, address } = schoolData;

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
      {/* School Header */}
      <div className="flex items-center mb-8 py-3">
        <div className="text-7xl mr-4">
          <FontAwesomeIcon icon={faSchool} className="text-[#FCD32D]" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-extrabold text-gray-800">{schoolName}</h1>
          <p className="text-lg text-gray-500 mt-1">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400 mr-2" />
            {address}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Buses */}
        <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg border-t-4 border-yellow-500 ">
          <div className="text-4xl text-blue-500 mb-3">
            <FontAwesomeIcon icon={faBus} />
          </div>
          <p className="text-5xl font-bold text-gray-800">{busesCount}</p>
          <p className="text-lg text-gray-500">Buses</p>
        </div>

        {/* Students */}
        <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg border-t-4 border-yellow-500 ">
          <div className="text-4xl text-green-500 mb-3">
            <FontAwesomeIcon icon={faUserGraduate} />
          </div>
          <p className="text-5xl font-bold text-gray-800">{studentsCount}</p>
          <p className="text-lg text-gray-500">Students</p>
        </div>

        {/* Trips */}
        <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg border-t-4 border-yellow-500 ">
          <div className="text-4xl text-yellow-500 mb-3">
            <FontAwesomeIcon icon={faRoute} />
          </div>
          <p className="text-5xl font-bold text-gray-800">{tripsCount}</p>
          <p className="text-lg text-gray-500">Trips</p>
        </div>
      </div>

      {/* Animation */}{/* Lottie animation at the bottom */}
      <div className="my-12 flex justify-center h-auto w-auto">
        <Lottie options={defaultOptions} height={200} width='auto' />
      </div>
    </div>
  );
};

export default Profile;
