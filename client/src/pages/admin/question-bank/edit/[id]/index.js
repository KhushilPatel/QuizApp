import { useRouter } from "next/router";
import axios from "axios";
import QuestionBankForm from "@/components/Admin/Question-Bank/QuestionBankForm";
import { toast } from "react-toastify";
import ConfirmationDialog from "@/components/ui/ConfirmationDialogue";
import { useState } from "react";

const QuestionBankDetails = ({ bank }) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!bank) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (questionBank) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/questionBanks/${bank._id}`,
        questionBank
      );
      toast.success("Question bank updated successfully");
      router.push("/admin/question-bank");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating question bank", error);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/api/questionBanks/${bank._id}`)
      .then((res) => {
        toast.warn("Question bank deleted successfully");
        router.push("/admin/question-bank");
      })
      .catch((err) => {
        console.log(err);
      });
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
    <>
      <QuestionBankForm
        initialData={bank}
        onSubmit={handleSubmit}
        isEdit
        onDelete={handleDelete}
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        onGenerateWithAI={handleGenerateWithAI}
        generatedQuestions={generatedQuestions}
        isGenerating={isGenerating}
      />
      <ConfirmationDialog
        isOpen={showConfirmation}
        message="Are you sure you want to delete this question bank?"
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    const response = await axios.get(
      `http://localhost:4000/api/questionBanks/${id}`
    );
    const bank = response.data;
    return {
      props: {
        bank,
      },
    };
  } catch (error) {
    console.error("Error fetching question bank:", error);
    return {
      props: {},
    };
  }
}

export default QuestionBankDetails;
