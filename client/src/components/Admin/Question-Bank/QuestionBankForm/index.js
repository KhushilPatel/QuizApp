import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

const QuestionBankForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  console.log("initial",initialData)
  const router = useRouter();
  const { title: initialTitle, description: initialDescription, time: initialTime, questions: initialQuestions } = initialData;
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [time, setTime] = useState(initialTime || "");
  const [questions, setQuestions] = useState(initialQuestions || [
    { questionText: "", options: [{ text: "", isCorrect: false }] },
  ]);

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
      createdAt: isEdit ? initialData.createdAt : currentDateTime,
    };

    onSubmit(questionBank);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">{isEdit ? 'Edit' : 'Add'} Question Bank</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg "
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg "
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Time:</label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg "
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
                <label className="flex gap-1">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleChangeCorrectOption(qIndex, oIndex, e)}
                    className="mt-2 size-9"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleChangeOption(qIndex, oIndex, e)}
                    required
                    className="w-[3/2] px-3 py-2 border rounded-lg"
                  />
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
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="bg-[#C5D86D] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:bg-[#A4C639] hover:scale-105 active:bg-[#8BBF00]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionBankForm;
