

import { useRouter } from 'next/router';
import axios from 'axios';
import QuestionBankForm from '@/components/Admin/Question-Bank/QuestionBankForm';
import { toast } from 'react-toastify';
import ConfirmationDialog from '@/components/ui/ConfirmationDialogue';
import { useState } from 'react';

const QuestionBankDetails = ({ bank }) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      router.push('/admin/question-bank')
      console.log(response.data);
    } catch (error) {
      console.error("Error updating question bank", error);
    }
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:4000/api/questionBanks/${bank._id}`)
      .then((res) => {
        toast.warn("Question bank deleted successfully");
        router.push('/admin/question-bank')
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <>
      <QuestionBankForm
        initialData={bank}
        onSubmit={handleSubmit}
        isEdit
      />
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Delete
        </button>
        <ConfirmationDialog
        isOpen={showConfirmation}
        message="Are you sure you want to delete this question bank?"
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleDelete}
      />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    const response = await axios.get(`http://localhost:4000/api/questionBanks/${id}`);
    const bank = response.data;
    return {
      props: {
        bank,
      },
    };
  } catch (error) {
    console.error('Error fetching question bank:', error);
    return {
      props: {},
    };
  }
}

export default QuestionBankDetails;
