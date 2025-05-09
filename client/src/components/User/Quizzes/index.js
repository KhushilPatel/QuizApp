import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const UserQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/quizzes");
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();
      const publishedQuizzes = data.filter((quiz) => quiz.state === "publish");
      setQuizzes(publishedQuizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Failed to load quizzes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // const handleStartQuiz = (quizId) => {
  //   console.log("quizIdss",quizId)
  //   router.push(`/user/quiz/${quizId}`);
  // };

  if (loading) {
    return <div className="text-center mt-8">Loading quizzes...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
      {quizzes.length === 0 ? (
        <p>No quizzes available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes?.map((quiz) => (
            <div key={quiz._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{quiz.quizName}</h2>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {quiz?.questionBank?.questions.length} questions
                </span>
                <button
                  className="bg-[#C5D86D] text-black font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/user/quiz/${quiz._id}`)}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserQuizzes;
