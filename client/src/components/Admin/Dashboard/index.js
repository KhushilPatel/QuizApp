import React, { useEffect, useState } from "react";

import TotalQuizees from "./TotalQuizzes";
import AttemptedQuizzes from "./AttemptedQuizzes";
import StudentPerformance from "./StudentPerformance";

const Dashboard = () => {

  
  

  return (
    <div className="flex bg-gray-100 p-4 w-[1200px]">
      {/* Quizzes Section */}
      <div className="w-1/2 pr-2 ">
        <TotalQuizees/>
        {/* Attempted Quizzes section remains the same */}
        <div className="bg-white shadow-lg rounded-lg p-6 h-[349px]">
          <h2 className="text-2xl font-semibold mb-2">Attempted Quizzes</h2>
         <AttemptedQuizzes/>
        </div>
      </div>

      {/* Students Performance section remains the same */}
      <div className="w-1/2 pl-2">
        <div className="bg-white shadow-lg rounded-lg p-6 h-[685px]">
          <h2 className="text-2xl font-semibold mb-2">Students Performance</h2>
          <StudentPerformance/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
