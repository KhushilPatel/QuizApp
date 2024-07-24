import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaBook, FaClipboardCheck, FaSpinner } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUser } from '@/context/UserContext';

const UserDashboard = () => {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/quizzes');
      const availableData = await response.json();
      const publishedQuizzes = availableData.filter(quiz => quiz.state === 'publish');
      setAvailableQuizzes(publishedQuizzes);

      const attemptedResponse = await fetch(`http://localhost:4000/api/attempted-quizzes/${user._id}`);
      if (!attemptedResponse.ok) {
        throw new Error('Failed to fetch attempted quizzes');
      }
      const attemptedData = await attemptedResponse.json();
      setAttemptedQuizzes(attemptedData);
    
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast.error('Failed to load quizzes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const QuizCard = ({ quiz }) => (
    <motion.div
      className="bg-white shadow-md rounded-lg p-4 transition-all hover:shadow-lg border border-gray-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-bold mb-2 text-gray-800">{quiz.quizName ? quiz.quizName : quiz.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 flex items-center">
          <FaBook className="mr-1" />
          {quiz.questionCount || quiz?.questionBank?.questions.length} questions
        </span>
        <button
          className="bg-[#C5D86D] text-black text-xs font-bold py-1 px-3 rounded-full transition-colors duration-300 flex items-center"
          onClick={() => router.push(`/user/quiz/${quiz._id}`)}
        >
          Start Quiz
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );

  const PerformanceChart = () => {
    const chartData = attemptedQuizzes.map(att => ({
      name: att?.quiz?.quizName,
      score: att.score
    }));

    return (
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-[1200px] mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Dashboard</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <FaBook className="mr-2 text-blue-600" />
          Available Quizzes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableQuizzes.slice(0, 4).map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>

        {availableQuizzes.length > 4 && (
          <motion.button
            className="text-blue-600 hover:text-blue-700 font-semibold mt-4 flex items-center"
            onClick={() => router.push('/user/quiz')}
            whileHover={{ scale: 1.05 }}
          >
            View all available quizzes
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <FaClipboardCheck className="mr-2 text-green-600" />
          Attempted Quizzes
        </h2>
        
        <PerformanceChart />
        
     
      </div>
    </div>
  );
};

export default UserDashboard;
