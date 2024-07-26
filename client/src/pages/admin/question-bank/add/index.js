import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import QuestionBankForm from "@/components/Admin/Question-Bank/QuestionBankForm";
import { toast } from "react-toastify";

const AddQuestionBank = () => {
  const router = useRouter();
  const { title, description, time } = router.query;

  const handleSubmit = async (questionBank) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/questionBanks",
        questionBank
      );
      toast.success("Question bank created successfully");
      router.push('/admin/question-bank')
      console.log(response.data);
    } catch (error) {
      console.error("Error creating question bank", error);
    }
  };

  return (
    <div>

      <QuestionBankForm
        initialData={{ title, description, time }}
        onSubmit={handleSubmit}
      />
       <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Go Back
        </button>
    </div>
  );
};

export default AddQuestionBank;
