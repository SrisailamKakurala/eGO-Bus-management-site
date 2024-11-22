import React from 'react';

const NotificationsMissingItems = ({ notificationsData }) => {
  const { notificationsSent, missingItemsFound, missingItemsReturned } = notificationsData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Notifications Sent */}
      <div className="p-4 text-center bg-white text-black rounded-lg shadow-lg hover:bg-[#FCD32D] hover:text-white transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-[#FCD32D] hover:border-gray-500 hover:border-l-4">
        <h3 className="font-semibold text-xl">Notifications Sent</h3>
        <p className="text-3xl opacity-75">{notificationsSent}</p>
      </div>

      {/* Missing Items Found */}
      <div className="p-4 text-center bg-white text-black rounded-lg shadow-lg hover:bg-[#FCD32D] hover:text-white transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-[#FCD32D] hover:border-gray-500 hover:border-l-4">
        <h3 className="font-semibold text-xl">Missing Items Found</h3>
        <p className="text-3xl opacity-75">{missingItemsFound}</p>
      </div>

      {/* Missing Items Returned */}
      <div className="p-4 text-center bg-white text-black rounded-lg shadow-lg hover:bg-[#FCD32D] hover:text-white transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-[#FCD32D] hover:border-gray-500 hover:border-l-4">
        <h3 className="font-semibold text-xl">Missing Items Returned</h3>
        <p className="text-3xl opacity-75">{missingItemsReturned}</p>
      </div>
    </div>
  );
};

export default NotificationsMissingItems;
