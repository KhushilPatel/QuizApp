
import React from 'react';

const ConfirmationDialog = ({ isOpen, message, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onCancel} className="text-gray-600 mr-4">Cancel</button>
          <button onClick={onConfirm} className="text-red-600">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
