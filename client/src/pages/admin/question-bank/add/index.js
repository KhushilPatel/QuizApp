import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import QuestionBankForm from "@/components/Admin/Question-Bank/QuestionBankForm";
import { toast } from "react-toastify";

const AddQuestionBank = () => {
  const router = useRouter();
  const { title, description, time } = router.query;
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (questionBank) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/questionBanks",
        questionBank
      );
      toast.success("Question bank created successfully");
      router.push("/admin/question-bank");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating question bank", error);
      toast.error("Error creating question bank");
    }
  };

  const handleGenerateWithAI = async (aiSettings) => {
    setIsGenerating(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/generateQb/generate",
        aiSettings
      );
      console.log("AI response", response.data);
      setGeneratedQuestions(response.data);
      toast.success("Questions generated successfully");
    } catch (error) {
      console.error("Error generating questions", error);
      toast.error("Error generating questions");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <QuestionBankForm
      initialData={{ title, description, time }}
      onSubmit={handleSubmit}
      onGenerateWithAI={handleGenerateWithAI}
      generatedQuestions={generatedQuestions}
      isGenerating={isGenerating}
    />
  );
};

export default AddQuestionBank;
