import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import QuestionBankList from "@/components/Admin/Question-Bank/ExistingQb";
import { IoMdAddCircle } from "react-icons/io";
import { ImCross } from "react-icons/im";
import AdminRoute from "@/components/Admin/AdminRoute";

const questionBankSchema = z.object({
  title: z.string().min(2, { message: "*Title is required" }),
  description: z.string().min(3, { message: "*Description is required" }),
  time: z.string().min(1, { message: "*Time must be selected" }),
});

const QuestionBankModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(questionBankSchema),
  });

  const openModal = () => {
    setIsModalOpen(true);
    reset(); // Reset the form values when the modal opens
  };

  const closeModal = () => setIsModalOpen(false);

  const onSubmit = (data) => {
    closeModal();
    router.push({
      pathname: "/admin/question-bank/add",
      query: data,
    });
  };

  return (
    <AdminRoute>
      
    <div className="flex mx-auto">
      <div className="w-full border-2 rounded-2xl p-5">
        <div className="flex gap-[500px]">
          <h2 className="text-3xl font-bold text-center mb-8">Question Banks</h2>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-2">Set up a new question bank</h2>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="border-l py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <ImCross className="size-5 font-extrabold text-3xl text-red-700" />
              </button>
            </div>
          </div>
          <hr />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="shadow min-h-10 max-h-24 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
              Time (in mins)
            </label>
            <select
              id="time"
              {...register("time")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select time</option>
              {[...Array(20).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
            {errors.time && <p className="text-red-500">{errors.time.message}</p>}
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

    </AdminRoute>
  );
};

export default QuestionBankModule;
