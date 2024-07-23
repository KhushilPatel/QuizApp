import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useUser } from '@/context/UserContext';

const QuizAttempt = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
 
  const router = useRouter();
  const { user } = useUser();
  const { id } = router.query;

  useEffect(() => {
    if (router.isReady && id) {
      fetchQuiz(id);
    }
  }, [router.isReady, id]);

  const fetchQuiz = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/quizzes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz');
      }
      const data = await response.json();
      setQuiz(data);
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
      const answers = Object.entries(userAnswers).map(([questionId, selectedAnswer]) => ({
        question: questionId,
        selectedAnswer
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

  if (loading) {
    return <div className="text-center mt-8">Loading quiz...</div>;
  }

  if (!quiz) {
    return <div className="text-center mt-8">Quiz not found.</div>;
  }

  if (!quiz || !quiz?.questionBank || !Array.isArray(quiz.questionBank.questions) || quiz.questionBank.questions.length === 0) {
    return <div className="text-center mt-8">Quiz data is invalid or empty.</div>;
  }

  const currentQuestionData = quiz.questionBank.questions[currentQuestion];

  if (!currentQuestionData) {
    return <div className="text-center mt-8">Question data is missing.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{quiz.quizName}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestion + 1} of {quiz.questionBank.questions.length}
        </h2>
        <p className="mb-4">{currentQuestionData.questionText}</p>
        <div className="space-y-2">
          {currentQuestionData.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${currentQuestionData._id}`}
                value={option.text || option}
                checked={userAnswers[currentQuestionData._id] === (option.text || option)}
                onChange={() => handleAnswerSelect(currentQuestionData._id, option.text || option)}
                className="form-radio"
              />
              <span>{option.text || option}</span>
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="bg-gray-300 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestion < quiz.questionBank.questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-[#C5D86D] text-black font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
