import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

const AddQuestionBank = () => {
  const router = useRouter();
  const { title, description, time } = router.query;

  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ text: "", isCorrect: false }] },
  ]);
  console.log("questions", questions);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: [{ text: "", isCorrect: false }] },
    ]);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push({ text: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleChangeQuestion = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  };

  const handleChangeOption = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleChangeCorrectOption = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].isCorrect = event.target.checked;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDateTime = new Date().toISOString();
    const questionBank = {
      title,
      description,
      time,
      questions,
      createdAt: currentDateTime,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/questionBanks",
        questionBank
      );
      alert("Question bank created successfully");
      router.push('/admin/question-bank')
      console.log(response.data);
    } catch (error) {
      console.error("Error creating question bank", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Question Bank</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            disabled
            required
            className="w-full px-3 py-2 border rounded-lg bg-disabled-bg text-disabled-text cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description:</label>
          <input
            value={description}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-disabled-bg text-disabled-text cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Time:</label>
          <input
            value={`${time} minutes`}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-disabled-bg text-disabled-text cursor-not-allowed"
          />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Question {qIndex + 1}</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Question Text:</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleChangeQuestion(qIndex, e)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Option {oIndex + 1}:</label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleChangeOption(qIndex, oIndex, e)}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <label className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleChangeCorrectOption(qIndex, oIndex, e)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Correct</span>
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddOption(qIndex)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Option
            </button>
          </div>
        ))}
        <div className="button-group mb-6">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionBank;
