import React from 'react';

const RecentSubscriptions = ({ subscriptions }) => {
  return (
    <div className="p-6 mx-6 bg-white shadow-lg rounded-lg">
      <h3 className="font-bold text-lg text-black border-b-2 border-red-500 pb-3 mb-4">
        Recent Subscription Expirations
      </h3>
      <ul className="space-y-4">
        {subscriptions.map((sub, index) => (
          <li key={index} className="flex justify-between p-3 bg-gray-100 rounded-lg">
            <span className="font-semibold">{sub.schoolName}</span>
            <span className={`text-sm ${sub.status.includes('Expired') ? 'text-red-500' : 'text-yellow-500'}`}>
              {sub.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSubscriptions;
