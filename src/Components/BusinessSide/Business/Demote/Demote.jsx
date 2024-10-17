// ConfirmationModal.js
import React from 'react';
import { toast } from 'react-toastify';

const Demote = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    toast.success('Demoted successfully!');
    onConfirm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 bg-opacity-75 w-full h-full absolute"></div>
      <div className="bg-white p-6 rounded shadow-lg relative z-10">
        <h3 className="text-lg font-semibold">Confirm Demote</h3>
        <p className="mt-2">Are you sure you want to demote this service?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demote;
