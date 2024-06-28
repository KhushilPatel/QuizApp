import React from 'react';

const QuestionBankList = ({ questionBanks }) => {
  return (
    <div className="bg-white p-6 border rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Existing Question Banks</h2>
      <ul className="divide-y divide-gray-200">
        {questionBanks?.map((bank, index) => (
          <li key={index} className="py-4">
            <div className="flex justify-between items-center">
              <div className="text-lg">{bank.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionBankList;
