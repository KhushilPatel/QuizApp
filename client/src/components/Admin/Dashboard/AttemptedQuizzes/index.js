import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useUser } from "@/context/UserContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttemptedQuizzes = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [clientData, setClientData] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/api/admin/all-client-data`);
      const data = await response.json();
      setClientData(data);

      // Process data for chart
      const quizAttempts = {};
      data.forEach(client => {
        client.attemptedQuizzes.forEach(quiz => {
          if (quizAttempts[quiz.quizName]) {
            quizAttempts[quiz.quizName]++;
          } else {
            quizAttempts[quiz.quizName] = 1;
          }
        });
      });

      setChartData({
        labels: Object.keys(quizAttempts),
        datasets: [
          {
            label: 'Number of Attempts',
            data: Object.values(quizAttempts),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
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
    <div className="container mx-auto px-4 py-8">
      <Bar options={options} data={chartData} />

    </div>
  );
};

export default AttemptedQuizzes;