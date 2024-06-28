import React, { useState } from 'react';

const QuizComponent = () => {
  
    return (
        <div className="flex">
           
            <div className="w-3/4 p-4">
                <button
                   
                    className="bg-white text-black px-4 py-2 w-[200%] rounded-xl border-2 flex items-center"
                >
                    <img className="w-16 h-16 mr-2 object-contain" src="/images/newquiz.png" alt="" />
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Set up a new quiz</h2>
                        <p className="text-sm text-gray-500">Click here to create a new quiz</p>
                    </div>
                </button>

                {/* Display existing question banks */}
                <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Existing Quizzes:</h3>
         
        </div>
            </div>
        </div>
    );
};

export default QuizComponent;
