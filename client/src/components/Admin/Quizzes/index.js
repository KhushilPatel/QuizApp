import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const QuizComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [score, setScore] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [questionBanks, setQuestionBanks] = useState([]);

  useEffect(() => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString().slice(0, 16);
    setCreatedAt(formattedDateTime);
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/questionBanks")
      .then((response) => response.json())
      .then((data) => setQuestionBanks(data))
      .catch((error) => console.error("Error fetching question banks:", error));
      console.log("questionBanks",questionBanks)
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    router.push({
      pathname: "/admin/quizzes",
      query: { title, description, time, score, createdAt },
    });
  };

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <button
          className="bg-white text-black px-4 py-2 w-[200px] rounded-xl border-2 items-center"
          onClick={openModal}
        >
          <img
            className="w-16 h-16 mr-2 object-contain"
            src="/images/newquiz.png"
            alt=""
          />
          <div>
            <h2 className="text-lg font-semibold mb-2">Set up a new quiz</h2>
            <p className="text-sm text-gray-500">
              Click here to create a new quiz
            </p>
          </div>
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Existing Quizzes:</h3>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Question Bank"
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold mb-2">Set up a new quiz</h2>
            <button
              type="submit"
              className="ml-[650px] border-l text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <img
                className="w-[26px] h-[20px] object-contain"
                src="/images/right.png"
                alt="Submit"
              />
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="border-l py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <img
                className="w-[26px] h-[20px] object-contain"
                src="/images/wrong.png"
                alt="Close"
              />
            </button>
          </div>
          <hr />
          <div className="mb-4 mt-2 relative box-content">
            <label
              className="block text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[100px] h-full text-sm absolute left-0 font-bold pt-2 pl-2"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 pl-[110px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex gap-5">
            <div className="mb-4 relative w-[280px]">
              <label
                className="block text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[185px] h-full text-sm absolute left-0 font-bold pt-2 pl-2"
                htmlFor="time"
              >
                Duration (in minutes):
              </label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 pl-[200px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value=""></option>
                {[...Array(20).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 relative w-[280px]">
              <label
                className="block text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[185px] h-full text-sm absolute left-0 font-bold pt-2 pl-2"
                htmlFor="score"
              >
                Score per question:
              </label>
              <select
                id="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 pl-[200px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value=""></option>
                {[...Array(20).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[185px] h-full text-sm absolute left-0 font-bold pt-3 pl-2"
              htmlFor="description"
            >
              Description:
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow min-h-10 max-h-16 appearance-none border pl-[190px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 relative w-[470px]">
            <label
              className="block text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[110px] h-full text-sm absolute left-0 font-bold pt-3 pl-2"
              htmlFor="createdAt"
            >
              Created At:
            </label>
            <div className="flex">
              <input
                id="createdAt"
                type="datetime-local"
                value={createdAt}
                disabled
                className="shadow min-h-10 max-h-16 appearance-none border pl-[120px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <hr />
          <div className="flex ">
            <div className="w-[480px] border-r border-gray-300 pr-4">
              Questions
              <div className="mb-4 flex w-[380px]">
                <label
                  className="block text-gray-700 ml-[1px] rounded-lg w-[300px] text-sm left-0 font-bold pt-2 pl-2"
                  htmlFor="questionBank"
                >
                  Use question bank:
                </label>
                <select
                  id="questionBank"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                 
                  {questionBanks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="border-l border-gray-300 pl-4">
              Answers
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default QuizComponent;
