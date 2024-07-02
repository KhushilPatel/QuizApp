// pages/index.js (or wherever your QuestionBankList component resides)
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const QuestionBankList = () => {
  const [questionBanks, setQuestionBanks] = useState([]);

  useEffect(() => {
    async function fetchQuestionBanks() {
      try {
        const response = await axios.get('http://localhost:4000/api/questionBanks');
        setQuestionBanks(response.data); 
      } catch (error) {
        console.error('Error fetching question banks:', error);
      }
    }

    fetchQuestionBanks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Existing Question Banks</h2>
      <ul>
        {questionBanks.map((bank) => (
          <li key={bank._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{bank.title}</h3>
              <p className="text-gray-600">{bank.description}</p>
              <Link href={`/admin/question-bank/${bank._id}`}>
                <p className="inline-block mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
                  View Details
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionBankList;
