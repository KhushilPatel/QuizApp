import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import QuestionBankList from "@/components/Admin/Question-Bank/ExistingQb";
import { IoMdAddCircle } from "react-icons/io";
import { ImCross } from "react-icons/im";
const QuestionBankModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    router.push({
      pathname: "/admin/question-bank/add",
      query: { title, description, time },
    });
  };

  return (
    <div className="flex mx-auto">
      <div className="w-full border-2 rounded-2xl p-5">
        <div className="flex gap-[500px]">
          <h2 className="text-3xl font-bold text-center mb-8">
            Question Banks
          </h2>
          <div
            onClick={openModal}
            className="bg-[#C5D86D] hover:bg-black hover:text-white gap-3 text-black px-4 py-2  flex w-[270px] h-[45px] rounded-xl border-2 items-center cursor-pointer mx-auto mb-8"
          >
            <div>
              <IoMdAddCircle className="text-2xl" />
            </div>

            <h2 className="text-lg font-semibold text-center truncate">
              Create Question Bank
            </h2>
          </div>
        </div>
        <QuestionBankList />
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
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-2">
              Set up a new question bank
            </h2>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="border-l py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <ImCross className="size-5  font-extrabold text-3xl text-red-700" />
              </button>
            </div>
          </div>
          <hr />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow min-h-10 max-h-24 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Time (in mins)
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select time</option>
              {[...Array(20).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#C5D86D] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:bg-[#A4C639] hover:scale-105 active:bg-[#8BBF00]"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default QuestionBankModule;
