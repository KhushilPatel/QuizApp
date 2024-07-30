import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const QuestionBankForm = ({ initialData = {}, onSubmit, onGenerateWithAI, isEdit = false, generatedQuestions, isGenerating }) => {
  const {
    title: initialTitle,
    description: initialDescription,
    time: initialTime,
    questions: initialQuestions,
  } = initialData;

  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [time, setTime] = useState(initialTime || "");
  const [questions, setQuestions] = useState(
    initialQuestions || [
      { questionText: "", options: [{ text: "", isCorrect: false }] },
    ]
  );

  const [generateWithAI, setGenerateWithAI] = useState(false);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);

  useEffect(() => {
    if (generatedQuestions) {
      const formattedQuestions = generatedQuestions.map(q => ({
        questionText: q.question,
        options: q.options.map((option, index) => ({
          text: option,
          isCorrect: option === q.answer
        }))
      }));
      console.log("aiformattedQuestions",formattedQuestions)
      setQuestions(formattedQuestions);
    }
  }, [generatedQuestions]);

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

  const handleRemoveOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
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

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.options.length < 2) {
        alert(`Question ${i + 1} must have at least two options.`);
        return;
      }
      const hasCorrectOption = question.options.some(option => option.isCorrect);
      if (!hasCorrectOption) {
        alert(`Question ${i + 1} must have at least one correct option.`);
        return;
      }
    }

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

  const handleGenerateWithAI = (event) => {
    event.preventDefault();
    onGenerateWithAI({ topic, difficulty, numQuestions });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isEdit ? "Edit" : "Add"} Question Bank
      </h1>
      {isGenerating ? (
        <div className="text-center">
          <p>Generating questions... Please wait.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description:</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Time (in minutes):</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={generateWithAI}
                onChange={() => setGenerateWithAI(!generateWithAI)}
                className="mr-2"
              />
              Generate with AI
            </label>
          </div>

          {generateWithAI && (
            <div className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-semibold mb-2">AI Generation Settings</h3>
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">Topic:</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">Difficulty:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">Number of Questions:</label>
                <input
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                  min="1"
                  max="20"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={handleGenerateWithAI}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Generate Questions
              </button>
            </div>
          )}

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
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(qIndex, oIndex)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
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
      )}
    </div>
  );
};

export default QuestionBankForm;