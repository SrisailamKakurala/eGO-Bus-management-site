import React, { useState } from 'react';
import Lottie from 'react-lottie';
import successAnimation from '../../../assets/animations/notificationSent.json';

const ManagementNotifications = ({ schoolData }) => {
  const [recipient, setRecipient] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [message, setMessage] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
    setSelectedDriver('');
  };

  const handleDriverChange = (e) => {
    setSelectedDriver(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendNotification = () => {
    if (!recipient || !message) {
      alert("Please fill out all fields.");
      return;
    }

    let contactInfo = [];
    if (recipient === 'driver') {
      if (selectedDriver) {
        const driver = Object.values(schoolData?.buses || {}).find(bus => bus.driverMobile === selectedDriver);
        if (driver) {
          contactInfo = [{ name: driver.driverName, contact: driver.driverMobile }];
        }
      } else {
        contactInfo = Object.values(schoolData?.buses || {}).map(bus => ({
          name: bus.driverName,
          contact: bus.driverMobile
        }));
      }
    } else if (recipient === 'parent') {
      contactInfo = Object.entries(schoolData?.buses || {}).flatMap(([busNo, bus]) =>
        Object.entries(bus?.trips || {}).flatMap(([tripKey, trip]) =>
          Object.entries(trip.students || {}).map(([studentName, studentData]) => ({
            studentName,
            parentContact: studentData.parentMobile,
          }))
        )
      );
    }

    console.log("Notification Sent to:", contactInfo);
    console.log("Message:", message);

    setShowAnimation(true);

    // Clear the form after the animation completes
    setTimeout(() => {
      setRecipient('');
      setSelectedDriver('');
      setMessage('');
      setShowAnimation(false);
    }, 5000);
  };

  const allDrivers = Object.values(schoolData?.buses || {}).map(bus => ({
    name: bus.driverName,
    mobile: bus.driverMobile
  }));

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-[#FCD32D] mb-6">Send Notification</h1>

      <hr className="my-5" />

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Select Recipient</label>
        <select
          value={recipient}
          onChange={handleRecipientChange}
          className="px-4 py-2 border rounded-md w-full"
        >
          <option value="">-- Choose Recipient --</option>
          <option value="driver">Driver</option>
          <option value="parent">All Parents</option>
        </select>
      </div>

      {recipient === 'driver' && (
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Select Individual Driver (Optional)</label>
          <select
            value={selectedDriver}
            onChange={handleDriverChange}
            className="px-4 py-2 border rounded-md w-full"
          >
            <option value="">-- Choose Individual Driver (Optional) --</option>
            {allDrivers.map((driver, index) => (
              <option key={index} value={driver.mobile}>
                {driver.name} - {driver.mobile}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Enter Message</label>
        <textarea
          value={message}
          onChange={handleMessageChange}
          rows="4"
          placeholder="Enter your message here"
          className="px-4 py-2 border rounded-md w-full"
        ></textarea>
      </div>

      <button
        onClick={handleSendNotification}
        className="px-6 py-2 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500"
      >
        Send Notification
      </button>

      {showAnimation && (
        <div className="mt-6">
          <Lottie options={defaultOptions} height={150} width={150} />
        </div>
      )}
    </div>
  );
};

export default ManagementNotifications;
