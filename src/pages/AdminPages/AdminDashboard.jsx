import React from 'react'
import SummaryMetrics from '../../components/specific/adminDashboardComps/SummaryMetrics';
import TopSchools from '../../components/specific/adminDashboardComps/TopSchools';
import RecentSubscriptions from '../../components/specific/adminDashboardComps/RecentSubscriptions';
import SchoolGrowthMetrics from '../../components/specific/adminDashboardComps/SchoolGrowthMetrics';

const AdminDashboard = () => {

  // Mock data
  const metricsData = {
    totalBuses: 50,
    totalStudents: 2000,
    totalSchools: 15,
    activeSubscriptions: 12,
  };

  const schoolsData = [
    { id: 1, name: 'School A', students: 500 },
    { id: 2, name: 'School B', students: 450 },
    { id: 3, name: 'School C', students: 400 },
  ];

  const subscriptions = [
    { schoolName: 'School A', status: 'Expiring in 3 days' },
    { schoolName: 'School B', status: 'Expired' },
  ];

  const growthData = {
    studentGrowth: 150, // +150 students
    busGrowth: -2,      // -2 buses
  };



  console.log('dashboard')
  return (
    <div className="h-full p-3 ">
      <h1 className='text-4xl font-bold text-white selected-black' >Dashboard</h1>
      <hr className='border-t-1 border-gray-300 my-4 mx-auto '/>

      <SummaryMetrics metricsData={metricsData} />

      <h1 className="text-slate-300 font-bold text-2xl ml-6">Top Schools</h1>
      <TopSchools schoolsData={schoolsData} />
      <RecentSubscriptions subscriptions={subscriptions} />
      <SchoolGrowthMetrics growthData={growthData} />

    </div>
  )
}

export default AdminDashboard