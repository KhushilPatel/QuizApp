import React, { useState } from 'react';

const CreateQuestionBankForm = ({ onCreate }) => {
  const [quizName, setQuizName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(quizName);
    setQuizName('');
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Create New Question Bank</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="quizName" className="block text-sm font-medium text-gray-700 mb-1">
            Question Bank Name:
          </label>
          <input
            type="text"
            id="quizName"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
          >
            Create Question Bank
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionBankForm;
