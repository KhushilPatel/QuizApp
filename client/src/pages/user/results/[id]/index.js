import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!quizAttempt) {
    return <div>No data found for this quiz attempt.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{quizAttempt.quiz.quizName} - Results</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <p className="text-lg font-semibold">Score: Calculation needed</p>
          <p>Completed on: {new Date(quizAttempt.completedAt).toLocaleString()}</p>
        </div>
        <div className="space-y-6">
          {quizAttempt.quiz.questionBank.questions.map((question, index) => {
            const userAnswer = quizAttempt.answers.find(a => a.question === question._id);
            const correctOption = question.options.find(o => o.isCorrect);
            return (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold mb-2">Question {index + 1}: {question.questionText}</p>
                <div className="ml-4">
                  {question.options.map((option, optionIndex) => (
                    <p key={optionIndex} className={`
                      ${option.isCorrect ? 'text-green-600 font-semibold' : ''}
                      ${option.text === userAnswer?.selectedAnswer && !option.isCorrect ? 'text-red-600' : ''}
                    `}>
                      {option.text === userAnswer?.selectedAnswer ? '➤ ' : ''}
                      {option.text}
                      {option.isCorrect ? ' ✓' : ''}
                    </p>
                  ))}
                </div>
                <p className="mt-2 text-sm">
                  {userAnswer?.selectedAnswer === correctOption?.text
                    ? <span className="text-green-600">Correct</span>
                    : <span className="text-red-600">Incorrect</span>}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResultDetails;