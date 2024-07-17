import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentPerformance = () => {
  const [studentData, setStudentData] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    // Fetch data from your API here
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/students'); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data)
      
        const total = data.length;
        const active = data.filter(student => student.active ==true).length;
        const inactive = total - active;
        
        setStudentData({ total, active, inactive });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [studentData.active, studentData.inactive],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-6">
        <StatCard title="Total Students" value={studentData.total} />
        <StatCard title="Active Students" value={studentData.active} />
        <StatCard title="Inactive Students" value={studentData.inactive} />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">Active vs Inactive Students</h3>
        <div className="h-64">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default StudentPerformance;
