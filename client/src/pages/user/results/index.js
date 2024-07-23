import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

const UserResults = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

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
      setAttempts(data);
    } catch (error) {
      console.error('Error fetching attempted quizzes:', error);
      alert('Failed to load attempted quizzes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  const columns = [
    { title: 'Quiz Name', key: 'quizName', render: (attempt) => attempt.quiz.quizName },
    { title: 'Score', key: 'score', render: (attempt) => {
      const correctAnswers = attempt.answers.filter(a => a.selectedAnswer.trim().toLowerCase() === 'true').length;
      const totalQuestions = attempt.answers.length;
      const percentageScore = (totalQuestions > 0) ? (correctAnswers / totalQuestions) * 100 : 0;
      return `${percentageScore.toFixed(2)}%`;
    }},
    { title: 'Correct Answers', key: 'correctAnswers', render: (attempt) => attempt.answers.filter(a => a.selectedAnswer.trim().toLowerCase() === 'true').length },
    { title: 'Total Questions', key: 'totalQuestions', render: (attempt) => attempt.answers.length },
    { title: 'Completion Date', key: 'completedAt', render: (attempt) => new Date(attempt.completedAt).toLocaleString() },
  ];

  return (
    <div className="w-[1200px] mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Quiz Results</h1>
      
      {attempts.length === 0 ? (
        <div className="bg-white shadow-lg border rounded-lg p-8 text-center">
          <p className="text-xl text-gray-600">You have not attempted any quizzes yet.</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg border rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Detailed Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(col => <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col.title}</th>)}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attempts.map(attempt => (
                  <tr key={attempt._id}>
                    {columns.map(col => <td key={col.key} className="px-6 py-4 whitespace-nowrap">{col.render(attempt)}</td>)}
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
