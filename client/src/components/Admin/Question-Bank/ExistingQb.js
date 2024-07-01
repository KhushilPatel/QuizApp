import React, { useState, useEffect } from 'react';
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
    <div className=" mx-auto ">
      <div className="bg-white p-6 border h-screen w-[450px] rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Existing Question Banks</h2>
        <ul className="divide-y divide-gray-200">
          {questionBanks.map((bank) => (
            <li key={bank._id} className="py-4">
              <div className="flex justify-between items-center">
                <div className="text-lg">{bank.title}</div>
                <div className="ml-4">
                  <button className="bg-black text-white px-4 py-2 rounded-md">
                    View Details
                  </button>
                </div>
              </div>
              <p className="text-gray-500 mt-2">{bank.description}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionBankList;
