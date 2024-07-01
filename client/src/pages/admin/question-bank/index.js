import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { useQuestionBankContext } from '@/context/qb_context';
import QuestionBankList from '@/components/Admin/Question-Bank/ExistingQb';

const QuestionBankModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    router.push({
      pathname: '/admin/question-bank/add',
      query: { title, description, time }
    });
  };

  return (
    <div className="container flex gap-2 mx-auto mt-8">
      <div className="flex-grow grid grid-cols-1">
        <QuestionBankList />
      </div>
      <div onClick={openModal} className="bg-white text-black px-4 py-2 w-[220px] h-[150px] rounded-xl border-2 items-center cursor-pointer">
        <img
          className="w-[200px] h-16 mr-2 object-contain"
          src="/images/qb.png"
          alt=""
        />
        <div>
          <h2 className="text-lg font-semibold text-center mb-2 truncate">Create Question Bank</h2>
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
          <h2 className="text-lg font-semibold mb-2">Create Question Bank</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
            Time(in mins)
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime( e.target.value )}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select time</option>
            {[...Array(20).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>{n + 1}</option>
            ))}
          </select>
        </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-[#C5D86D] hover:bg-[#c7ed1f] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <button type="button" onClick={closeModal} className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default QuestionBankModule;
