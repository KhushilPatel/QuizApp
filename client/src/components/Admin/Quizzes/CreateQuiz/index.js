import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import axios from "axios";

const ModalComponent = ({ isOpen, onRequestClose, questionBanks, router }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [score, setScore] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [selectedQuestionBank, setSelectedQuestionBank] = useState("");

  useEffect(() => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString().slice(0, 16);
    setCreatedAt(formattedDateTime);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onRequestClose();

    const quizData = {
      questionBank: selectedQuestionBank,
      quizName: title,
      duration: time,
      score,
      description,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/quizzes",
        quizData
      );
      console.log("newdata", res.data);
      router.push({
        pathname: "/admin/quizzes",
        query: { title, description, time, score, createdAt },
      });
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Question Bank"
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Set up a new quiz</h2>
          <button
            type="button"
            onClick={onRequestClose}
            className="border-l py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <ImCross className="size-5 font-extrabold text-3xl text-red-700" />
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
        <div className="justify-between flex border-gray-300 pr-4 mt-6">
          <div className="mb-4 flex w-[380px]">
            <label
              className="block text-gray-700 ml-[1px] rounded-lg w-[300px] text-sm left-0 font-bold pt-2 pl-2"
              htmlFor="questionBank"
            >
              Use question bank:
            </label>
            <select
              id="questionBank"
              value={selectedQuestionBank}
              onChange={(e) => setSelectedQuestionBank(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a question bank</option>
              {questionBanks.map((bank) => (
                <option key={bank.id} value={bank._id}>
                  {bank.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#C5D86D] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:bg-[#A4C639] hover:scale-105 active:bg-[#8BBF00]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalComponent;
