import React, { useEffect, useState } from "react";

import TotalQuizees from "./TotalQuizzes";
import AttemptedQuizzes from "./AttemptedQuizzes";
import StudentPerformance from "./StudentPerformance";

const Dashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quizzes Section */}
        <div className="space-y-4">
          <TotalQuizees />
          {/* Attempted Quizzes section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">Attempted Quizzes</h2>
            <AttemptedQuizzes />
          </div>
        </div>

        {/* Students Performance section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Students Performance</h2>
          <StudentPerformance />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
