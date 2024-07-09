import React, { useState, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/router";
import ModalComponent from "@/components/Admin/Quizzes/CreateQuiz";
import QuizList from "@/components/Admin/Quizzes/ExistingQuizzes";

const QuizComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionBanks, setQuestionBanks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/api/questionBanks")
      .then((response) => response.json())
      .then((data) => setQuestionBanks(data))
      .catch((error) => console.error("Error fetching question banks:", error));
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex mx-auto">
       <div className="w-full border-2 rounded-2xl p-5">
      <div className="flex gap-[630px]">
          <h2 className="text-3xl font-bold text-center mb-6">
           Quizzes
          </h2>
          <div
            onClick={openModal}
            className="bg-[#C5D86D] hover:bg-black hover:text-white gap-3 text-black px-4 py-2  flex w-[270px] h-[45px] rounded-xl border-2 items-center cursor-pointer mx-auto mb-8"
          >
            <div>
              <IoMdAddCircle className="text-2xl" />
            </div>

            <h2 className="text-lg font-semibold text-center truncate">
              Set up a new quiz
            </h2>
          </div>
        </div>
        <div className="mt-4">
        <QuizList/>
        </div>
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        questionBanks={questionBanks}
        router={router}
      />
    </div>
  );
};

export default QuizComponent;
