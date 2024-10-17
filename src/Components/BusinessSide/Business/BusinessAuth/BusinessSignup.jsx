import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCity, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BusinessBaseURL } from '../../../APIS/APIS';


const BusinessSignup= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BusinessBaseURL}/signup`, formData);
      console.log('Signup successful', response.data);

      toast.success('Signup successful!'); 
       navigate('/businesslogin')  
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Error during signup. Please try again.');  
    }
  };

  return (
    <div className="flex items-center justify-center py-10 min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Create an account</h2>
        <p className="text-center text-gray-600 mb-8">Welcome to JobTask! We're so glad you're here. Fill out the info below to get started.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <FaUser className="w-6 h-6 text-white" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="David Kowalski"
              className="w-full pl-4 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <FaEnvelope className="w-6 h-6 text-white" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="davidkowalski@mail.com"
              className="w-full pl-4 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <FaLock className="w-6 h-6 text-white" />
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <FaEyeSlash className="w-6 h-6 text-gray-400" /> : <FaEye className="w-6 h-6 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Phone Input */}
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <FaPhoneAlt className="w-6 h-6 text-white" />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="123 456 7890"
              className="w-full pl-4 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address Input */}
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <FaMapMarkerAlt className="w-6 h-6 text-white" />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full pl-4 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* City Input */}
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <FaCity className="w-6 h-6 text-white" />
            </div>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full pl-4 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* Zip Code Input */}
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <FaMapMarkerAlt className="w-6 h-6 text-white" />
            </div>
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              className="w-full pl-4 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-600">By clicking the Sign Up button you accept our terms and conditions.</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Create Profile
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Already Have an Account? <Link to="/businesslogin" className="text-blue-600 hover:underline">Login Now</Link>
        </p>
      </div>
    </div>
  );
};

export default BusinessSignup;