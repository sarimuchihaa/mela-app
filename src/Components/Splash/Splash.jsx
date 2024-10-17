import React from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  const handleCustomerSignup = () => {
    navigate('/login'); 
  };

  const handleBusinessSignup = () => {
    navigate('/businesslogin'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 px-4">
      <div className="w-full max-w-md text-center">
        {/* Heading */}
        <h1 className="font-luckiest-guy text-white text-6xl sm:text-8xl leading-tight">
          MELA
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-white text-sm sm:text-lg">
          Ethiopia And Eritrean Page Adverts Business's, Products And Services
        </p>

        {/* Button Container */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleCustomerSignup}
            className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg  hover:text-blue-600 transition-transform transform hover:scale-105 duration-300"
          >
            Login as Customer
          </button>
          <button
            onClick={handleBusinessSignup}
            className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg  hover:text-blue-600 transition-transform transform hover:scale-105 duration-300"
          >
            Login as Business
          </button>
        </div>
      </div>
    </div>
  );
};

export default Splash;
