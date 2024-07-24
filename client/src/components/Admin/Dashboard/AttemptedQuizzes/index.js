import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useUser } from "@/context/UserContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AttemptedQuizzes = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
const {user}=useUser()
  useEffect(() => {
   
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/api/attempted-quizzes/${user._id}`);
      const data = await response.json();
      console.log("khushil",data)
    //   const data = [
    //     { quizName: "Quiz 1", attempts: 15 },
    //     { quizName: "Quiz 2", attempts: 10 },
    //     { quizName: "Quiz 3", attempts: 20 },
    //     { quizName: "Quiz 4", attempts: 5 },
    //     { quizName: "Quiz 5", attempts: 12 },
    //   ];

      setChartData({
        labels: data.map(item => item.quizName),
        datasets: [
          {
            label: 'Number of Attempts',
            data: data.map(item => item.attempts),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.8)',
            tension: 0.1
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Attempted Quizzes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Attempts'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Quizzes'
        }
      }
    }
  };

  return (
    <div>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default AttemptedQuizzes;