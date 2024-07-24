import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import ConfirmationDialog from "@/components/ui/ConfirmationDialogue";
import EditQuiz from "./CreateQuiz";
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

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

const QuizList = ({ quizCreatedOrEdited }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    fetchQuizzes();
  }, [state.loading, quizCreatedOrEdited]);

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

      await axios.put(
        `http://localhost:4000/api/quizzes/${quiz._id}`,
        updatedQuiz
      );

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
    <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Quiz Name</th>
              <th className="py-3 px-4 text-left">Question Bank / Status</th>
              <th className="py-3 px-4 text-center">Score</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-center">Created At</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.quizzes.map((quiz) => (
              <tr key={quiz._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{quiz.quizName}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <span>{quiz.questionBank.title}</span>
                    <button
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        quiz.state === "publish"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                      onClick={() => togglePublishState(quiz)}
                      disabled={state.loadingQuizId === quiz._id}
                    >
                      {state.loadingQuizId === quiz._id ? (
                        <span className="animate-spin">⟳</span>
                      ) : (
                        quiz.state.charAt(0).toUpperCase() + quiz.state.slice(1)
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">{quiz.score}</td>
                <td className="py-3 px-4">{quiz.description}</td>
                <td className="py-3 px-4 text-center">
                  {new Date(quiz.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                      onClick={() => handleEdit(quiz)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                      onClick={() => confirmDelete(quiz)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationDialog
        isOpen={state.showConfirmation}
        message="Are you sure you want to delete this quiz?"
        onCancel={() => dispatch({ type: "HIDE_CONFIRMATION" })}
        onConfirm={handleConfirmDelete}
      />
      {state.quizToEdit && (
        <EditQuiz
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