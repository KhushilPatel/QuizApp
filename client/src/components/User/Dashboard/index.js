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
  const {user}=useUser()
  
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
      console.log("attempted data",attemptedData)
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
  const AttemptedQuizzesTable = () => (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left font-semibold">Quiz Title</th>
            <th className="py-3 px-4 text-left font-semibold">Questions</th>
            <th className="py-3 px-4 text-left font-semibold">Score</th>
            <th className="py-3 px-4 text-left font-semibold">Date Taken</th>
            <th className="py-3 px-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attemptedQuizzes.map((acc, index) => {
            const totalQuestions = acc.answers.length;
            const correctAnswers = acc.answers.filter(a => a.selectedAnswer.trim().toLowerCase() === 'true').length;
            const score = (totalQuestions > 0) ? (correctAnswers / totalQuestions) * 100 : 0;
            
            return (
              <tr key={acc._id} className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150`}>
                <td className="py-3 px-4 text-gray-800 font-medium">{acc.quiz.quizName}</td>
                <td className="py-3 px-4 text-gray-600">{totalQuestions}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span className={`font-medium ${score >= 70 ? 'text-green-600' : score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {score.toFixed(2)}%
                    </span>
                    <div className="ml-4 w-24 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                      <div 
                        className={`h-2.5 rounded-full ${
                          score >= 70 ? 'bg-green-500' : 
                          score >= 40 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${score}%` }}
                      ></div>
                      <span className="absolute right-0 text-xs font-bold text-gray-800">{score.toFixed(2)}%</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(acc.completedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td className="py-3 px-4">
               
<button
  onClick={() => router.push(`/user/results/${acc._id}`)}
  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded transition-colors duration-300"
>
  View Details
</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  
  const PerformanceChart = () => {
    const chartData = attemptedQuizzes.map(quiz => ({
      name: quiz.quiz.quizName,
      score: quiz.score
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
        
        <AttemptedQuizzesTable />
      </div>
    </div>
  );
};

export default UserDashboard;