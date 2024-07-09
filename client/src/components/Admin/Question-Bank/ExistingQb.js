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
    <div className=" w-[1130px] rounded-xl  ">
      <div className="overflow-x-auto  border-collapse border rounded-xl">
        
            <table className="min-w-full bg-white">
        <thead className="bg-[#0D1321] text-white">
            <tr>
              <th className="py-2 px-4 border-b border-r text-center">Title</th>
              <th className="py-2 px-4 border-b border-r text-center">Duration (minutes)</th>
              <th className="py-2 px-4 border-b border-r text-center">Number of Questions</th>
              <th className="py-2 px-4 border-b border-r text-center">Description</th>
              <th className="py-2 px-4 border-b border-r text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questionBanks.map((bank) => (
              <tr key={bank._id}>
                <td className="py-1 px-4 border-b border-r text-center">{bank.title}</td>
                <td className="py-1 px-4 border-b border-r text-center">{bank.time}</td>
                <td className="py-1 px-4 border-b border-r text-center">{bank.questions.length}</td>
                <td className="py-1 px-4 border-b border-r text-center">{bank.description}</td>
                <td className="py-1 px-4 border-b border-r text-center">
                  <Link href={`/admin/question-bank/edit/${bank._id}`} className='flex justify-center'>
                    <p className="py-2   bg-[#C5D86D] w-[75px] h-[40px] rounded-2xl">Edit</p>
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

export default QuestionBankList;
