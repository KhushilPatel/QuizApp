import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useUser } from '@/context/UserContext';

const QuizAttempt = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
 
  const router = useRouter();
  const { user } = useUser();
  const { id } = router.query;

  useEffect(() => {
    if (router.isReady && id) {
      fetchQuiz(id);
    }
  }, [router.isReady, id]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmitQuiz();
    }
  }, [timeRemaining]);

  const fetchQuiz = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/quizzes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz');
      }
      const data = await response.json();
      setQuiz(data);
      console.log("timeee",data)
      setTimeRemaining(data.questionBank.time * 60); 
    } catch (error) {
      console.error('Error fetching quiz:', error);
      toast.error('Failed to load quiz. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questionBank.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      // Create an array of all questions, with null for unattempted ones
      const answers = quiz.questionBank.questions.map(question => ({
        question: question._id.toString(),
        selectedAnswer: userAnswers[question._id.toString()] || null
      }));
  
      const correctAnswers = quiz.questionBank.questions.reduce((acc, question) => {
        const correctOption = question.options.find(option => option.isCorrect);
        if (correctOption) {
          acc[question._id.toString()] = correctOption.text;
        }
        return acc;
      }, {});
  
      const score = answers.reduce((total, answer) => {
        if (correctAnswers[answer.question] === answer.selectedAnswer) {
          return total + 1;
        }
        return total;
      }, 0);
  
      const response = await fetch('http://localhost:4000/api/attempted-quizzes/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizId: id, userId: user._id, answers, score }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
  
      const result = await response.json();
      console.log('Quiz submitted successfully. Score:', result.score);
      router.push(`/user/results`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz. Please try again.');
    }
  };

  const handleExitQuiz = () => {
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    router.push('/user/dashboard'); 
  };

  const cancelExit = () => {
    setShowExitConfirmation(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!quiz || !quiz?.questionBank || !Array.isArray(quiz.questionBank.questions) || quiz.questionBank.questions.length === 0) {
    return <div className="text-center mt-8 text-xl font-semibold text-red-600">Quiz data is invalid or empty.</div>;
  }

  const currentQuestionData = quiz.questionBank.questions[currentQuestion];

  if (!currentQuestionData) {
    return <div className="text-center mt-8 text-xl font-semibold text-red-600">Question data is missing.</div>;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="max-w-[1400px] mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{quiz.quizName}</h1>
          <div className="text-2xl font-semibold text-red-600">
            Time remaining: {formatTime(timeRemaining)}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Question {currentQuestion + 1} of {quiz.questionBank.questions.length}
          </h2>
          <p className="text-lg mb-6">{currentQuestionData.questionText}</p>
          <div className="space-y-4">
            {currentQuestionData.options.map((option, index) => (
              <label key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="radio"
                  name={`question-${currentQuestionData._id}`}
                  value={option.text || option}
                  checked={userAnswers[currentQuestionData._id] === (option.text || option)}
                  onChange={() => handleAnswerSelect(currentQuestionData._id, option.text || option)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-3 text-lg">{option.text || option}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestion < quiz.questionBank.questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors"
            >
              Submit Quiz
            </button>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleExitQuiz}
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600 transition-colors"
          >
            Exit Quiz
          </button>
        </div>
      </div>

      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Are you sure you want to exit?</h2>
            <p className="mb-6">Your progress will not be saved.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmExit}
                className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600 transition-colors"
              >
                Yes, Exit
              </button>
              <button
                onClick={cancelExit}
                className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;