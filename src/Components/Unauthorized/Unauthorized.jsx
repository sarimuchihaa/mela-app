import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="max-w-md text-center">
        <div className="mb-8">
          {/* Replace with your SVG or an appropriate icon */}
          <img src="Forbidden.jpg" alt="Error 403" className="w-full h-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">You are not authorized</h1>
        <p className="text-gray-600">
          You tried to access a page you did not have prior authorization for.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
