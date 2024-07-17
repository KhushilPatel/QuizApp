import { Router, useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
    const router=useRouter()
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      // Fetch available quizzes
      const availableResponse = await fetch('http://localhost:4000/api/quizzes');
      const availableData = await availableResponse.json();
      setAvailableQuizzes(availableData);

      // Fetch attempted quizzes
    //   const attemptedResponse = await fetch('http://localhost:4000/api/quizzes/attempted');
    //   const attemptedData = await attemptedResponse.json();
    const attemptedData = [
        {
          _id: "quiz123",
          title: "JavaScript Basics",
          description: "Test your knowledge of JavaScript fundamentals",
          questionCount: 15,
          score: 80,
          dateTaken: "2024-07-15T14:30:00Z"
        },
        {
          _id: "quiz456",
          title: "React Fundamentals",
          description: "Assess your understanding of React core concepts",
          questionCount: 20,
          score: 75,
          dateTaken: "2024-07-16T10:15:00Z"
        },
        {
          _id: "quiz789",
          title: "CSS Mastery",
          description: "Test your CSS styling skills",
          questionCount: 18,
          score: 90,
          dateTaken: "2024-07-17T09:45:00Z"
        }
      ];
      setAttemptedQuizzes(attemptedData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast.error('Failed to load quizzes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const QuizCard = ({ quiz, isAttempted }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{quiz.questionCount} questions</span>
        {isAttempted ? (
          <span className="text-sm font-medium text-green-600">Score: {quiz.score}%</span>
        ) : (
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded"
            onClick={() => {/* Handle starting the quiz */}}
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center mt-8">Loading quizzes...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Available Quizzes</h2>
          {availableQuizzes.slice(0, 3).map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} isAttempted={false} />
          ))}
          {availableQuizzes.length > 3 && (
            <button className="text-blue-500 hover:text-blue-600" onClick={()=>router.push('quizzes')}>
              View all available quizzes
            </button>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Attempted Quizzes</h2>
          {attemptedQuizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} isAttempted={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;