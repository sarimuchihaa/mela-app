import React from "react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 w-11/12 max-w-md mx-auto z-60">
        <button
          type="button"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <svg
            title="Close"
            className="h-4 w-4 cursor-pointer text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold dark:text-white">Confirm Logout</h2>
          <p className="text-gray-500 dark:text-gray-300">
            Are you sure you want to log out?
          </p>
        </div>

        <div className="mt-6 flex justify-evenly space-x-2">
          <button
            type="button"
            className="md:px-8 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 md:px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
