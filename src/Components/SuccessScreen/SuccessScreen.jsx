import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-10">
        <div className="text-center">
          <img
            src="payment.png"
            alt="Payment successful"
            className="w-40 h-40 mx-auto mb-8"
          />
          <h2 className="text-3xl font-extrabold text-[#23496B] mb-6">
            Payment Successful!
          </h2>
          <p className="text-lg text-gray-600">
            Thank you for your payment. Your transaction was completed successfully.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-10">
          <button
            onClick={() => navigate('/rate-review')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-transform transform hover:scale-105 duration-500"
          >
            Rate & Review Service
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-transform transform hover:scale-105 duration-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
