import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationDialog from "@/components/ui/ConfirmationDialogue";
import CreateOrEditQuiz from "./CreateQuiz";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [quizToEdit, setQuizToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [loadingQuizId, setLoadingQuizId] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, [loading]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/quizzes");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const confirmDelete = (quiz) => {
    setQuizToDelete(quiz);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (quizToDelete) {
      handleDelete(quizToDelete);
      setQuizToDelete(null);
      setShowConfirmation(false);
    }
  };

  const handleDelete = (quiz) => {
    axios
      .delete(`http://localhost:4000/api/quizzes/${quiz._id}`)
      .then(() => {
        setLoading((prev) => !prev); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (quiz) => {
    setQuizToEdit(quiz);
    setShowEditDialog(true);
  };

  const handleEditSuccess = () => {
    setLoading((prev) => !prev); // Trigger reload of quizzes
    setShowEditDialog(false);
  };
  const togglePublishState = async (quiz) => {
    try {
      setLoadingQuizId(quiz._id);
      const newState = quiz.state === 'publish' ? 'draft' : 'publish';
      const updatedQuiz = { ...quiz, state: newState };
     
      await axios.put(`http://localhost:4000/api/quizzes/${quiz._id}`, updatedQuiz);
      
      const updatedQuizzes = quizzes.map(q => 
        q._id === quiz._id ? updatedQuiz : q
      );
      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.error("Error updating quiz state:", error);
     
    } finally {
      setLoadingQuizId(null);
    }
  };

  return (
    <div className="w-[1130px] rounded-xl">
      <div className="overflow-x-auto  border-collapse border rounded-xl">
        <table className="min-w-full bg-white">
          <thead className="bg-[#0D1321] text-white">
            <tr>
              <th className="py-2 px-4 border-b border-r text-center">Quiz Name</th>
              <th className="py-2 px-4 border-b border-r text-center">Question Bank</th>
              <th className="py-2 px-4 border-b border-r text-center">Score per question</th>
              <th className="py-2 px-4 border-b border-r text-center">Description</th>
              <th className="py-2 px-4 border-b border-r text-center">Created At</th>
              <th className="py-2 px-4 border-b border-r text-center">Actions</th>
              <th className="py-2 px-4 border-b border-r text-center">Active</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.quizName}</td>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.questionBank.title}</td>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.score}</td>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.description}</td>
                <td className="py-1 px-4 border-b border-r text-center">{quiz.createdAt.toString().slice(0, 16)}</td>
                <td className="py-1 flex gap-2 pl-6 border-b border-r text-center">
                  <button
                    className="py-2 bg-[#C5D86D] w-[75px] h-[40px] rounded-2xl flex items-center justify-center"
                    onClick={() => handleEdit(quiz)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 bg-red-500 w-[75px] h-[35px] rounded-xl"
                    onClick={() => confirmDelete(quiz)}
                  >
                    Delete
                  </button>
                  <ConfirmationDialog
                    key={`confirmation-${quiz._id}`}
                    isOpen={showConfirmation && quizToDelete && quizToDelete._id === quiz._id}
                    message="Are you sure you want to delete this quiz?"
                    onCancel={() => setShowConfirmation(false)}
                    onConfirm={handleConfirmDelete}
                  />
                </td>
                <td className="py-1 px-4 border-b border-r text-center">
                <button
                    className={`px-4 ${
                      quiz.state === 'publish' ? 'bg-green-500' : 'bg-yellow-500'
                    } w-[75px] h-[35px] rounded-xl transition-colors duration-300`}
                    onClick={() => togglePublishState(quiz)}
                    disabled={loadingQuizId === quiz._id}
                  >
                    {loadingQuizId === quiz._id ? (
                      <span className="animate-spin">⟳</span>
                    ) : (
                      quiz.state === 'publish' ? 'Publish' : 'Draft'
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {quizToEdit && (
        <CreateOrEditQuiz
          key={`edit-${quizToEdit._id}`}
          isOpen={showEditDialog}
          onRequestClose={() => setShowEditDialog(false)}
          quizId={quizToEdit._id}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default QuizList;
