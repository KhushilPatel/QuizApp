import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const quizSchema = z.object({
  title: z.string().min(1, "*Title is required"),
  description: z.string().optional(),
  score: z.string().min(1, "*Score per question is required"),
  createdAt: z.string(),
  questionBank: z.string().min(1, "*Question bank is required"),
});

const CreateOrEditQuiz = ({ isOpen, onRequestClose, router, quizId, onEditSuccess ,onQuizCreated}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [questionBanks, setQuestionBanks] = useState([]);
 
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quizSchema),
  });

  useEffect(() => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toString().slice(0, 16);
    setValue("createdAt", formattedDateTime);

    if (quizId) {
      fetchQuiz();
      setIsEditMode(true);
    } else {
      resetForm();
      setIsEditMode(false);
    }

    fetchQuestionBanks(); 
  }, [quizId]);

  const resetForm = () => {
    reset({
      title: "",
      description: "",
      score: "",
      createdAt: new Date().toString().slice(0, 16),
      questionBank: "",
    });
  };


  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/quizzes/${quizId}`);
      const { quizName, questionBank, score, description, createdAt } = response.data;
      setValue("title", quizName);
      setValue("questionBank", questionBank?._id); 
      setValue("score", score);
      setValue("description", description);
      setValue("createdAt", createdAt.toString().slice(0, 16));
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  

  const fetchQuestionBanks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/questionBanks");
      setQuestionBanks(response.data);
    
    } catch (error) {
      console.error("Error fetching question banks:", error);
    }
  };

  const onSubmit = async (data) => {
    onRequestClose();
    const quizData = {
      questionBank: data.questionBank,
      quizName: data.title,
      score: data.score,
      description: data.description,
      createdAt: data.createdAt,
    };

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:4000/api/quizzes/${quizId}`, quizData);
        onEditSuccess();
      } else {
        const res = await axios.post("http://localhost:4000/api/quizzes", quizData);
        onQuizCreated();
        // // router.push({
        // //   pathname: "/admin/quizzes",
        // //   query: {
        // //     title: data.title,
        // //     description: data.description,
        // //     score: data.score,
        // //     createdAt: data.createdAt,
        // //   },
        // });
      
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} quiz:`, error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={isEditMode ? "Edit Quiz" : "Create Quiz"}
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">{isEditMode ? "Edit Quiz" : "Set up a new quiz"}</h2>
          <button
            type="button"
            onClick={onRequestClose}
            className="border-l py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <ImCross className="size-5 font-extrabold text-3xl text-red-700" />
          </button>
        </div>
        <hr />
        <div className="mb-1 mt-2 relative">
          <label
            className="text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[100px] h-full text-sm absolute left-0 font-bold pt-2 pl-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            id="title"
            {...register("title")}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 pl-[110px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errors.title && (
          <p className="text-red-500 text-xs mb-3 mt-0">{errors.title.message}</p>
        )}
        <div className="flex mt-4 gap-5">
          <div className="relative w-[380px]">
            <label
              className="block text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[185px] h-full text-sm absolute left-0 font-bold pt-2 pl-2"
              htmlFor="score"
            >
              Score per question:
            </label>
            <select
              id="score"
              {...register("score")}
              className="shadow appearance-none border rounded w-full py-2 pl-[200px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select score</option>
              {[...Array(20).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>
          {errors.score && (
            <p className="text-red-500 text-xs mt-1">{errors.score.message}</p>
          )}
        </div>
        <div className="mt-3 relative">
          <label
            className="block text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[185px] h-full text-sm absolute left-0 font-bold pt-3 pl-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            id="description"
            {...register("description")}
            className="shadow min-h-10 max-h-16 appearance-none border pl-[190px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
        <div className="mt-3 relative w-[470px]">
          <label
            className="block text-gray-700 bg-[#FFEDDF] ml-[1px] rounded-lg w-[110px] h-full text-sm absolute left-0 font-bold pt-3 pl-2"
            htmlFor="createdAt"
          >
            Created At:
          </label>
          <div className="flex">
            <input
              id="createdAt"
              {...register("createdAt")}
              disabled
              className="shadow min-h-10 max-h-16 bg-gray-100 cursor-not-allowed border pl-[120px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <hr />
        <div className="justify-between flex border-gray-300 pr-4 mt-6">
          <div className="flex w-[480px]">
            <label
              className="block text-gray-700 ml-[1px] rounded-lg w-[300px] text-sm left-0 font-bold pt-2 pl-2"
              htmlFor="questionBank"
            >
              Use question bank:
            </label>
            <select
              id="questionBank"
              {...register("questionBank")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a question bank</option>
              {questionBanks?.map((bank) => (
                <option key={bank._id} value={bank._id}>
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
        {errors.questionBank && (
          <span className="text-red-500 ml-48 text-xs mt-0">
            {errors.questionBank.message}
          </span>
        )}
      </form>
    </Modal>
  );
};

export default CreateOrEditQuiz;
