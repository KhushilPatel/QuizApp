import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { IoMdAddCircle } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";

const QuestionBankForm = ({
  initialData = {},
  onSubmit,
  onGenerateWithAI,
  isEdit = false,
  generatedQuestions,
  isGenerating,
  onDelete,
  showConfirmation,
  setShowConfirmation,
}) => {
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

  const router = useRouter();

  useEffect(() => {
    if (generatedQuestions) {
      const formattedQuestions = generatedQuestions.map((q) => ({
        questionText: q.question,
        options: q.options.map((option, index) => ({
          text: option,
          isCorrect: option === q.answer,
        })),
      }));
      console.log("aiformattedQuestions", formattedQuestions);
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
      const hasCorrectOption = question.options.some(
        (option) => option.isCorrect
      );
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
    if (typeof onGenerateWithAI === "function") {
      onGenerateWithAI({ topic, difficulty, numQuestions });
    } else {
      console.warn("AI generation is not available in this context");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {isEdit ? "Edit" : "Create"} Question Bank
      </h1>
      {isGenerating ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5D86D] mx-auto mb-4"></div>
          <p className="text-gray-600">Generating questions... Please wait.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                placeholder="Enter question bank title"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                Time (minutes)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                placeholder="Enter duration"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition min-h-[100px]"
              placeholder="Enter question bank description"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generateWithAI}
                onChange={() => setGenerateWithAI(!generateWithAI)}
                className="w-4 h-4 text-[#C5D86D] focus:ring-[#C5D86D] border-gray-300 rounded"
                disabled={!onGenerateWithAI}
              />
              <span className="text-gray-700 font-semibold">
                Generate with AI
              </span>
            </label>

            {generateWithAI && (
              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  AI Generation Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-gray-700">Topic</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                      required
                      placeholder="Enter topic"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-700">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-700">
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      value={numQuestions}
                      onChange={(e) =>
                        setNumQuestions(parseInt(e.target.value))
                      }
                      min="1"
                      max="20"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateWithAI}
                  className="bg-[#C5D86D] hover:bg-[#A4C639] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Generate Questions
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Question {qIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newQuestions = questions.filter(
                        (_, i) => i !== qIndex
                      );
                      setQuestions(newQuestions);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-gray-700">Question Text</label>
                    <input
                      type="text"
                      value={question.questionText}
                      onChange={(e) => handleChangeQuestion(qIndex, e)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                      placeholder="Enter your question"
                    />
                  </div>
                  <div className="space-y-3">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={option.isCorrect}
                          onChange={(e) =>
                            handleChangeCorrectOption(qIndex, oIndex, e)
                          }
                          className="w-4 h-4 text-[#C5D86D] focus:ring-[#C5D86D] border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            handleChangeOption(qIndex, oIndex, e)
                          }
                          required
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                          placeholder={`Option ${oIndex + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(qIndex, oIndex)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <ImCross />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddOption(qIndex)}
                      className="text-[#C5D86D] hover:text-[#A4C639] font-semibold flex items-center space-x-2"
                    >
                      <IoMdAddCircle className="text-xl" />
                      <span>Add Option</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddQuestion}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
            >
              <IoMdAddCircle className="text-xl" />
              <span>Add Question</span>
            </button>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Go Back
              </button>
              {isEdit && (
                <button
                  type="button"
                  onClick={() => setShowConfirmation(true)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                >
                  Delete
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#C5D86D] hover:bg-[#A4C639] text-white font-semibold py-2 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              {isEdit ? "Update" : "Create"} Question Bank
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuestionBankForm;
