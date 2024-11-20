import React, { useState, useEffect } from 'react';
import { registeredSchools, toggleSubscription } from '../../services/registeredSchools';

const SchoolManagement = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        setLoading(true);
        const schoolData = await registeredSchools();
        setSchools(schoolData);
        setFilteredSchools(schoolData); // Initially show all schools
        setLoading(false);
      } catch (err) {
        console.error('Error fetching schools:', err);
        setError('Failed to load schools.');
        setLoading(false);
      }
    };

    loadSchools();
  }, []);

  const handleToggleSubscription = async (schoolId, isSubscribed) => {
    try {
      await toggleSubscription(schoolId, !isSubscribed);

      setSchools((prev) =>
        prev.map((school) =>
          school.id === schoolId ? { ...school, subscribed: !isSubscribed } : school
        )
      );

      setFilteredSchools((prev) =>
        prev.map((school) =>
          school.id === schoolId ? { ...school, subscribed: !isSubscribed } : school
        )
      );
    } catch (err) {
      console.error('Error toggling subscription:', err);
      alert('Failed to update subscription status.');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredSchools(
      schools.filter((school) =>
        school.schoolName.toLowerCase().includes(query) // Adjust this line if needed
      )
    );
  };

  const handleReadMore = (schoolId) => {
    setFilteredSchools((prev) =>
      prev.map((school) =>
        school.id === schoolId ? { ...school, isExpanded: !school.isExpanded } : school
      )
    );
  };

  if (loading) return <p className="text-lg text-gray-500">Loading schools...</p>;
  if (error) return <p className="text-lg text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">School Management</h1>
      <hr className="border-t-1 border-gray-700 mb-6" />

      {/* Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search schools by name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-md text-black font-semibold px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Schools List */}
      <div className="flex flex-col gap-6">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="w-full p-6 bg-white text-black rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.02] relative"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{school.schoolName}</h2>
            <p className="text-lg text-gray-600 mb-2">Location: {school.location || 'N/A'}</p>
            <p className="text-lg text-gray-600 mb-4">Principal: {school.principal || 'N/A'}</p>

            {/* Toggle Subscription */}
            <div className="absolute top-2 right-2">
              <button
                onClick={() => handleToggleSubscription(school.id, school.subscribed)}
                className={`py-2 px-4 rounded-lg font-semibold ${school.subscribed
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
              >
                {school.subscribed ? 'Disable' : 'Enable'}
              </button>
            </div>

            {/* Show More Details */}
            <div className="mt-4 space-y-2">
              {school.isExpanded ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600 font-medium">Total Students:</span>
                    <span className="text-lg text-gray-500">{school.totalStudents || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600 font-medium">Total Buses:</span>
                    <span className="text-lg text-gray-500">{school.totalBuses || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600 font-medium">Location:</span>
                    <span className="text-lg text-gray-500">{school.location || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600 font-medium">Email:</span>
                    <span className="text-lg text-gray-500">{school.mailId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600 font-medium">Website:</span>
                    <span className="text-lg text-gray-500">
                      <a href={school.website || '#'} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        {school.website || 'N/A'}
                      </a>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600 font-medium">Principal:</span>
                    <span className="text-lg text-gray-500">{school.principal || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600 font-medium">Mobile:</span>
                    <span className="text-lg text-gray-500">{school.mobile || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-600 font-medium">Alternate Mobile:</span>
                    <span className="text-lg text-gray-500">{school.alternateMobile || 'N/A'}</span>
                  </div>
                </>
              ) : (
                <p className="text-lg text-gray-600">Click below to see more details.</p>
              )}

              <button
                onClick={() => handleReadMore(school.id)}
                className="text-yellow-400 mt-2"
              >
                {school.isExpanded ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredSchools.length === 0 && (
        <p className="text-lg text-gray-500 mt-6">No schools found matching your search.</p>
      )}
    </div>
  );
};

export default SchoolManagement;
