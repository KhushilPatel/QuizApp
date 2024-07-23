import React, { useReducer, useEffect } from "react";
import axios from "axios";
import ConfirmationDialog from "@/components/ui/ConfirmationDialogue";
import CreateOrEditQuiz from "./CreateQuiz";

const initialState = {
  quizzes: [],
  showConfirmation: false,
  quizToDelete: null,
  quizToEdit: null,
  loading: false,
  showEditDialog: false,
  loadingQuizId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUIZZES":
      return { ...state, quizzes: action.payload };
    case "SHOW_CONFIRMATION":
      return { ...state, showConfirmation: true, quizToDelete: action.payload };
    case "HIDE_CONFIRMATION":
      return { ...state, showConfirmation: false, quizToDelete: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_LOADING_QUIZ_ID":
      return { ...state, loadingQuizId: action.payload };
    case "SET_QUIZ_TO_EDIT":
      return { ...state, quizToEdit: action.payload, showEditDialog: true };
    case "HIDE_EDIT_DIALOG":
      return { ...state, showEditDialog: false, quizToEdit: null };
    case "TOGGLE_LOADING":
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

const QuizList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchQuizzes();
  }, [state.loading]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/quizzes");
      dispatch({ type: "SET_QUIZZES", payload: response.data });
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const confirmDelete = (quiz) => {
    dispatch({ type: "SHOW_CONFIRMATION", payload: quiz });
  };

  const handleConfirmDelete = () => {
    if (state.quizToDelete) {
      handleDelete(state.quizToDelete);
      dispatch({ type: "HIDE_CONFIRMATION" });
    }
  };

  const handleDelete = (quiz) => {
    axios
      .delete(`http://localhost:4000/api/quizzes/${quiz._id}`)
      .then(() => {
        dispatch({ type: "TOGGLE_LOADING" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (quiz) => {
    dispatch({ type: "SET_QUIZ_TO_EDIT", payload: quiz });
  };

  const handleEditSuccess = () => {
    dispatch({ type: "TOGGLE_LOADING" });
    dispatch({ type: "HIDE_EDIT_DIALOG" });
  };

  const togglePublishState = async (quiz) => {
    try {
      dispatch({ type: "SET_LOADING_QUIZ_ID", payload: quiz._id });
      const newState = quiz.state === "publish" ? "draft" : "publish";
      const updatedQuiz = { ...quiz, state: newState };

      await axios.put(`http://localhost:4000/api/quizzes/${quiz._id}`, updatedQuiz);

      const updatedQuizzes = state.quizzes.map((q) =>
        q._id === quiz._id ? updatedQuiz : q
      );
      dispatch({ type: "SET_QUIZZES", payload: updatedQuizzes });
    } catch (error) {
      console.error("Error updating quiz state:", error);
    } finally {
      dispatch({ type: "SET_LOADING_QUIZ_ID", payload: null });
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
            {state.quizzes.map((quiz) => (
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
                    isOpen={state.showConfirmation && state.quizToDelete && state.quizToDelete._id === quiz._id}
                    message="Are you sure you want to delete this quiz?"
                    onCancel={() => dispatch({ type: "HIDE_CONFIRMATION" })}
                    onConfirm={handleConfirmDelete}
                  />
                </td>
                <td className="py-1 px-4 border-b border-r text-center">
                  <button
                    className={`px-4 ${
                      quiz.state === "publish" ? "bg-green-500" : "bg-yellow-500"
                    } w-[75px] h-[35px] rounded-xl transition-colors duration-300`}
                    onClick={() => togglePublishState(quiz)}
                    disabled={state.loadingQuizId === quiz._id}
                  >
                    {state.loadingQuizId === quiz._id ? (
                      <span className="animate-spin">⟳</span>
                    ) : (
                      quiz.state === "publish" ? "Publish" : "Draft"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {state.quizToEdit && (
        <CreateOrEditQuiz
          key={`edit-${state.quizToEdit._id}`}
          isOpen={state.showEditDialog}
          onRequestClose={() => dispatch({ type: "HIDE_EDIT_DIALOG" })}
          quizId={state.quizToEdit._id}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default QuizList;
