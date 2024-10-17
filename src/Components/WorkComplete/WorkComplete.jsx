import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WorkComplete = () => {
  const navigate = useNavigate();

 
  const handleAccept = () => {
    navigate('/rate-review'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10">
        <div className="flex justify-center mb-8">
          <img
            src="/illustration.png"
            alt="Work Complete"
            className="w-40 h-40 md:w-48 md:h-48"
          />
        </div>
        <h1 className="text-3xl font-extrabold text-center text-[#23496B]">
          Work Completed
        </h1>
        <p className="text-center text-[#23496B] mt-4 mb-10 text-lg md:text-xl">
          Please review the service and make your choice.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button className="flex items-center justify-center w-full md:w-1/2 py-4 px-6 text-lg font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 shadow-lg transition-transform transform duration-500 hover:scale-105">
            <FaTimesCircle className="mr-2 text-2xl" /> Reject
          </button>
          <button
            onClick={handleAccept} // Trigger navigation on click
            className="flex items-center justify-center w-full md:w-1/2 py-4 px-6 text-lg font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 shadow-lg transition-transform duration-500 transform hover:scale-105"
          >
            <FaCheckCircle className="mr-2 text-2xl" /> Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkComplete;
