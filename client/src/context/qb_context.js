
import questionBankReducer, { ADD_QUESTION_BANK } from '@/reducer/qb_reducer';
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  questionBanks: [],
};

// Create context and export provider and hook
const QuestionBankContext = createContext();

export const useQuestionBankContext = () => useContext(QuestionBankContext);

export const QuestionBankProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionBankReducer, initialState);

  const addQuestionBank = (name) => {
    const newQuestionBank = {
      id: state.questionBanks.length + 1,
      name: name,
    };
    dispatch({ type: ADD_QUESTION_BANK, payload: newQuestionBank });
  };

  return (
    <QuestionBankContext.Provider value={{ questionBanks: state.questionBanks, addQuestionBank }}>
      {children}
    </QuestionBankContext.Provider>
  );
};
