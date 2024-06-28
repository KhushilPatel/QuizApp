import React from 'react';

import CreateQuestionBankForm from '@/components/Admin/Question-Bank/CreateQuestionBankForm';
import QuestionBankList from '@/components/Admin/Question-Bank/QuestionBankList';
import { useQuestionBankContext } from '@/context/qb_context';

const QuestionBankModule = () => {
  const { questionBanks, addQuestionBank } = useQuestionBankContext();

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <QuestionBankList questionBanks={questionBanks} />
        </div>
        <div>
          <CreateQuestionBankForm onCreate={addQuestionBank} />
        </div>
      </div>
    </div>
  );
};

export default QuestionBankModule;
