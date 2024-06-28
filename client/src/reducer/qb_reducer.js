
export const ADD_QUESTION_BANK = 'ADD_QUESTION_BANK';

const questionBankReducer = (state, action) => {
  switch (action.type) {
    case ADD_QUESTION_BANK:
      return {
        ...state,
        questionBanks: [...state.questionBanks, action.payload],
      };
    default:
      return state;
  }
};

export default questionBankReducer;
