import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 p-4 w-[1200px]">
      {/* Quizzes Section */}
      <div className="w-1/2 pr-2">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-2">Total Quizzes</h2>
         
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Attempted Quizzes</h2>
        
        </div>
      </div>
      {/* Students Performance Section */}
      <div className="w-1/2 pl-2">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Students Performance</h2>
         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
