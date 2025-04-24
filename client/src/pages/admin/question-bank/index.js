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
import styles from "@/styles/Modal.module.css";

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
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
        >
          <div className="bg-white p-6 rounded-2xl max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Create New Question Bank
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <ImCross className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                  placeholder="Enter question bank title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition min-h-[100px]"
                  placeholder="Enter question bank description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="time"
                >
                  Time (minutes)
                </label>
                <select
                  id="time"
                  {...register("time")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5D86D] focus:border-transparent transition"
                >
                  <option value="">Select time</option>
                  {[...Array(20).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-sm">{errors.time.message}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#C5D86D] hover:bg-[#A4C639] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </AdminRoute>
  );
};

export default QuestionBankModule;
