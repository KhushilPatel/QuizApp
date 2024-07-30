import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const QuizResultDetails = () => {
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchQuizAttemptDetails();
    }
  }, [id]);

  const fetchQuizAttemptDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/attempted-quizzes/result/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz attempt details');
      }
      const data = await response.json();
      setQuizAttempt(data);
    } catch (error) {
      console.error('Error fetching quiz attempt details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!quizAttempt) {
    return <div className="text-center text-xl mt-10">No data found for this quiz attempt.</div>;
  }

  const calculateScore = () => {
    const totalQuestions = quizAttempt.quiz.questionBank?.questions.length;
    const correctAnswers = quizAttempt.quiz.questionBank?.questions.filter((question, index) => {
      const userAnswer = quizAttempt.answers.find(a => a.question === question._id);
      const correctOption = question.options.find(o => o.isCorrect);
      return userAnswer?.selectedAnswer === correctOption?.text;
    }).length;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const score = calculateScore();

  return (
    <div className="min-h-screen  bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={handleGoBack} 
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{quizAttempt.quiz.quizName} - Results</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-6 text-center">
            <h2 className="text-2xl font-bold">Your Score</h2>
            <p className="text-5xl font-bold mt-2">{score}%</p>
            <p className="mt-2">Completed on: {new Date(quizAttempt.completedAt).toLocaleString()}</p>
          </div>
          <div className="p-6">
            {quizAttempt.quiz.questionBank?.questions.map((question, index) => {
              const userAnswer = quizAttempt.answers.find(a => a.question === question._id);
              const correctOption = question.options.find(o => o.isCorrect);
              const isCorrect = userAnswer?.selectedAnswer === correctOption?.text;

              return (
                <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
                  <div className="flex items-start">
                    {isCorrect ? 
                      <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" /> : 
                      <FaTimesCircle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    }
                    <p className="font-semibold">{question.questionText}</p>
                  </div>
                  <div className="ml-6 mt-2">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex} 
                        className={`p-2 rounded ${
                          option.isCorrect ? 'bg-green-100' : 
                          option.text === userAnswer?.selectedAnswer ? 'bg-red-100' : ''
                        }`}
                      >
                        <span className={option.isCorrect ? 'font-bold' : ''}>
                          {option.text === userAnswer?.selectedAnswer ? '➤ ' : ''}
                          {option.text}
                          {option.isCorrect ? ' ✓' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultDetails;