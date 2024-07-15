import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaQuestionCircle, FaCalendarAlt, FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch quizzes from the API
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/quizzes');
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const nextQuiz = () => {
    setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % quizzes.length);
  };

  const prevQuiz = () => {
    setCurrentQuizIndex((prevIndex) => (prevIndex - 1 + quizzes.length) % quizzes.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextQuiz,
    onSwipedRight: prevQuiz,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (quizzes.length === 0) {
    return <div className="flex justify-center items-center h-screen">No quizzes available</div>;
  }

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <div className="flex bg-gray-100 p-4 w-[1200px]">
      {/* Quizzes Section */}
      <div className="w-1/2 pr-2">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 h-[387px] overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Total Quizzes</h2>
          <div 
            {...handlers}
            className="relative transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-3">{currentQuiz.title}</h3>
              <p className="mb-4 text-blue-100">{currentQuiz.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaQuestionCircle className="mr-2" />
                  <span>
                    <strong className="block">Question Bank</strong>
                    {currentQuiz.questionBank.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaTrophy className="mr-2" />
                  <span>
                    <strong className="block">Score</strong>
                    {currentQuiz.score}
                  </span>
                </div>
                <div className="flex items-center col-span-2">
                  <FaCalendarAlt className="mr-2" />
                  <span>
                    <strong className="block">Created At</strong>
                    {new Date(currentQuiz.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={prevQuiz} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            >
              <FaChevronLeft className="text-blue-600" />
            </button>
            <button 
              onClick={nextQuiz} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            >
              <FaChevronRight className="text-blue-600" />
            </button>
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>{currentQuizIndex + 1} of {quizzes.length}</span>
            <span>Swipe or use arrows to navigate</span>
          </div>
        </div>
        
        {/* Attempted Quizzes section remains the same */}
        <div className="bg-white shadow-lg rounded-lg p-6 h-[249px]">
          <h2 className="text-2xl font-semibold mb-2">Attempted Quizzes</h2>
          {/* Content for Attempted Quizzes */}
        </div>
      </div>
      
      {/* Students Performance section remains the same */}
      <div className="w-1/2 pl-2">
        <div className="bg-white shadow-lg rounded-lg p-6 h-[650px]">
          <h2 className="text-2xl font-semibold mb-2">Students Performance</h2>
          {/* Content for Students Performance */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;