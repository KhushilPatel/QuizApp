import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaClipboardCheck } from 'react-icons/fa';

const UserResults = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user._id) {
      fetchAttemptedQuizzes(user._id);
    }
  }, [user]);

  const fetchAttemptedQuizzes = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/attempted-quizzes/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch attempted quizzes');
      }
      const data = await response.json();
      console.log("resultdata", data);
      setAttempts(data);
    } catch (error) {
      console.error('Error fetching attempted quizzes:', error);
      toast.error('Failed to load attempted quizzes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaClipboardCheck className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  const columns = [
    { title: 'Quiz Title', key: 'quizName', render: (attempt) => attempt.quiz.quizName },
    { title: 'Attempted Questions', key: 'totalQuestions', render: (attempt) => attempt.answers.length },
    { title: 'Correct Answers', key: 'correctAnswers', render: (attempt) => attempt.score },
    { title: 'Score', key: 'score', render: (attempt) => {
      const correctAnswers = attempt.score;
      const totalQuestions = attempt.answers.length;
      console.log("totalQuestions",attempt)
      const score = (totalQuestions > 0) ? (correctAnswers / totalQuestions) * 100 : 0;
      console.log("score",score)
      return (
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
      );
    }},
    { title: 'Date Taken', key: 'completedAt', render: (attempt) => new Date(attempt.completedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })},
    { title: 'Actions', key: 'actions', render: (attempt) => (
      <button
        onClick={() => router.push(`/user/results/${attempt._id}`)}
        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded transition-colors duration-300"
      >
        View Details
      </button>
    )},
  ];

  return (
    <div className="w-[1200px] mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Quiz Results</h1>

      {attempts.length === 0 ? (
        <div className="bg-white shadow-md border border-gray-300 rounded-lg p-8 text-center">
          <p className="text-xl text-gray-600">You have not attempted any quizzes yet.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md border border-gray-300 rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {columns.map(col => (
                    <th key={col.key} className="py-3 px-4 text-left font-semibold">{col.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt, index) => (
                  <tr key={attempt._id} className={`border-t border-gray-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150`}>
                    {columns.map(col => (
                      <td key={col.key} className="py-3 px-4 text-gray-800">
                        {col.render(attempt)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserResults;