import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const response = await axios.get('http://localhost:4000/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    }

    fetchQuizzes();
  }, []);

  return (
    <div className="w-[1130px] rounded-xl">
      <div className="overflow-x-auto border-collapse border rounded-xl">
        <table className="min-w-full bg-white">
          <thead className="bg-[#0D1321] text-white">
            <tr>
              <th className="py-2 px-4 border-b border-r text-center">Quiz Name</th>
              <th className="py-2 px-4 border-b border-r text-center">Duration (minutes)</th>
              <th className="py-2 px-4 border-b border-r text-center">Score per question</th>
              <th className="py-2 px-4 border-b border-r text-center">Description</th>
              <th className="py-2 px-4 border-b border-r text-center">Created At</th>
              <th className="py-2 px-4 border-b border-r text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.quizName}</td>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.duration}</td>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.score}</td>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.description}</td>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.createdAt}</td>
                <td className="py-1 px-4 border-b border-r text-center">
                  <Link href={`/admin/quizzes/edit/${quiz._id}`} passHref>
                    <p className="py-2 bg-[#C5D86D] w-[75px] h-[40px] rounded-2xl flex items-center justify-center">Edit</p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizList;
