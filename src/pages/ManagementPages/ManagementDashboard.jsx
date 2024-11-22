import React from 'react';
import VehicleStatus from '../../components/specific/managementDashboardComps/VehicleStatus'
import NotificationsMissingItems from '../../components/specific/managementDashboardComps/NotificationsMissingItems';
import StudentAttendance from '../../components/specific/managementDashboardComps/StudentAttendance';
import SOSAlerts from '../../components/specific/managementDashboardComps/SOSAlerts';

const ManagementDashboard = () => {
  // Example of vehicle status data (this should come from your backend or API)
  const vehiclesData = {
    totalBuses: 3,
    busesOnDuty: 2,
    busesOffDuty: 1,
    notificationsSent: 120, // Example value
    missingItemsFound: 5, // Example value
    attendanceToday: 75, // Example value (could be total present students)
    sosAlerts: 3, // Example value
  };

  // Example data (to be replaced with actual data from API or state)
  const notificationsData = {
    notificationsSent: 120,
    missingItemsFound: 5,
    missingItemsReturned: 3,
  };

  const attendanceData = {
    totalStudents: 500,
    studentsPresentToday: 450,
  };

  const sosAlerts = [
    { message: 'Driver reported emergency at location X', date: '2024-11-22T08:45:00Z' },
    { message: 'Mechanical failure on Bus 12', date: '2024-11-21T14:30:00Z' },
    { message: 'Accident near school zone', date: '2024-11-20T09:15:00Z' },
  ];

  return (
    <div className="h-full p-4">
      <h1 className="text-4xl font-bold text-[#FCD32D] mb-6">Dashboard</h1>

      <hr className='my-5 bg-slate-200' />

      {/* Vehicle Status Section */}
      <VehicleStatus vehiclesData={vehiclesData} />

      <hr className='my-5 bg-slate-200' />

      <NotificationsMissingItems notificationsData={notificationsData} />

      <hr className='my-5 bg-slate-200' />

      <StudentAttendance attendanceData={attendanceData} />

      <hr className='my-5 bg-slate-200' />

      <h1 className='text-xl font-bold text-slate-700'>sos alerts:</h1>

      <SOSAlerts sosAlerts={sosAlerts} className='pb-5' />

    </div>
  );
};

export default ManagementDashboard;
