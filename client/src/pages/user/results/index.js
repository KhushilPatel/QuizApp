import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, Table, Tag, Skeleton } from 'antd';
import 'antd/dist/reset.css';  // Make sure to import Ant Design CSS

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
      toast.error('Failed to load attempted quizzes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  const overallPerformanceData = attempts.map(attempt => {
    const correctAnswers = attempt.answers.filter(a => a.selectedAnswer.trim().toLowerCase() === 'true').length;
    const totalQuestions = attempt.answers.length;
    const percentageScore = (totalQuestions > 0) ? (correctAnswers / totalQuestions) * 100 : 0;

    return {
      name: attempt.quiz.quizName,
      score: percentageScore.toFixed(2), // Convert to percentage and format to 2 decimal places
      correctAnswers,
      totalQuestions
    };
  });

  const columns = [
    {
      title: 'Quiz Name',
      dataIndex: 'quizName',
      key: 'quizName',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: score => (
        <Tag color={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'error'}>
          {score}%
        </Tag>
      ),
    },
    {
      title: 'Correct Answers',
      dataIndex: 'correctAnswers',
      key: 'correctAnswers',
    },
    {
      title: 'Total Questions',
      dataIndex: 'totalQuestions',
      key: 'totalQuestions',
    },
    {
      title: 'Completion Date',
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: date => new Date(date).toLocaleString(),
    },
  ];

  const dataSource = attempts.map(attempt => {
    const correctAnswers = attempt.answers.filter(a => a.selectedAnswer.trim().toLowerCase() === 'true').length;
    const totalQuestions = attempt.answers.length;
    const percentageScore = (totalQuestions > 0) ? (correctAnswers / totalQuestions) * 100 : 0;

    return {
      key: attempt._id,
      quizName: attempt.quiz.quizName,
      score: percentageScore.toFixed(2), // Convert to percentage and format to 2 decimal places
      correctAnswers,
      totalQuestions,
      completedAt: attempt.completedAt,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Quiz Results</h1>
      
      {attempts.length === 0 ? (
        <Card className="text-center p-8 shadow-lg border rounded-lg bg-white">
          <p className="text-xl text-gray-600">You have not attempted any quizzes yet.</p>
        </Card>
      ) : (
        <>
          <Card className="mb-8 shadow-lg border rounded-lg bg-white p-4">
            <h2 className="text-2xl font-bold mb-4">Overall Performance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overallPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8884d8" name="Score (%)" />
                  <Bar dataKey="correctAnswers" fill="#82ca9d" name="Correct Answers" />
                  <Bar dataKey="totalQuestions" fill="#ffc658" name="Total Questions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="shadow-lg border rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">Detailed Results</h2>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} />
          </Card>
        </>
      )}
    </motion.div>
  );
};

export default UserResults;
