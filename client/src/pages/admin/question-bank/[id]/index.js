
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';

const QuestionBankDetails = ({ bank }) => {
  const router = useRouter();
  console.log("bank",bank)
  const [questions, setQuestions] = useState(bank.questions || []);

  const handleQuestionChange = (qIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex] = {
      ...updatedQuestions[qIndex],
      questionText: e.target.value,
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = {
      ...updatedQuestions[qIndex].options[oIndex],
      text: e.target.value,
    };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [] }]);
  };

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  if (!bank) {
    return <p>Loading...</p>;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const title=bank.title
    const description=bank.description
    const time=bank.time
    const questions=bank.questions
    const questionBank = {
      title,
      description,
      time,
      questions,
    };

    try {
      const response = await axios.put(
      `  http://localhost:4000/api/questionBanks/${bank._id}`,
        questionBank
      );
      alert("Question bank Updated successfully");
      router.push('/admin/question-bank')
      console.log(response.data);
    } catch (error) {
      console.error("Error creating question bank", error);
    }
  };

  const handleDelete=()=>{
    axios.delete(`http://localhost:4000/api/questionBanks/${bank._id}`)
    .then((res)=>{
      alert("Question bank Deleted successfully");
      router.push('/admin/question-bank')
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className="w-screen mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Question Bank Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title:</label>
          <input
            type="text"
            value={bank.title}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea
            value={bank.description}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            rows={4}
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Question {qIndex + 1}</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Question Text:</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Option {oIndex + 1}:</label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <label className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[qIndex].options[oIndex].isCorrect = e.target.checked;
                      setQuestions(updatedQuestions);
                    }}
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
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
        Delete
        </button>
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    const response = await axios.get(`http://localhost:4000/api/questionBanks/${id}`);
    const bank = response.data;
    return {
      props: {
        bank,
      },
    };
  } catch (error) {
    console.error('Error fetching question bank:', error);
    return {
      props: {},
    };
  }
}

export default QuestionBankDetails;
