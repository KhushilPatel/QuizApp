import React, { useEffect, useState } from 'react';
import { FaListAlt, FaCheckCircle, FaEdit } from "react-icons/fa";
import axios from "axios";

const TotalQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/quizzes");
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const totalQuizzes = quizzes.length;
  const publishedQuizzes = quizzes.filter(quiz => quiz.state === 'publish').length;
  const draftQuizzes = quizzes.filter(quiz => quiz.state === 'draft').length;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full h-[320px]  mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quiz Overview</h2>
      <div className="flex flex-col items-center h-[100px]">
        <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white w-24 h-24 rounded-full flex items-center justify-center shadow-md mb-6">
          <FaListAlt className="text-4xl" />
        </div>
        <div className="text-center mb-4">
          <span className="text-4xl font-bold text-gray-800">{totalQuizzes}</span>
          <p className="text-lg text-gray-600">Total Quizzes</p>
        </div>
        <div className="w-full border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-2">
            <FaCheckCircle className="text-green-500 text-xl mr-2" />
            <p className="text-lg text-gray-700 flex-1">Published</p>
            <span className="font-bold text-gray-800">{publishedQuizzes}</span>
          </div>
          <div className="flex items-center justify-between">
            <FaEdit className="text-yellow-500 text-xl mr-2" />
            <p className="text-lg text-gray-700 flex-1">Draft</p>
            <span className="font-bold text-gray-800">{draftQuizzes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalQuizzes;
