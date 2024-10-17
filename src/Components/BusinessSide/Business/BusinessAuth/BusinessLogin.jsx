import React, { useContext, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { IoKey } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import { UserContext } from '../../../ContextApi/UserContext';
import { BusinessBaseURL } from '../../../APIS/APIS';

const BusinessLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setBusinessId } = useContext(UserContext); 
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BusinessBaseURL}/login`, { email, password });
      if (response.status === 200) {
        toast.success('Login successful');
        const businessId = response.data.businessId;
        console.log(response.data)

        // Encrypt businessId using AES encryption
        const encryptedBusinessId = CryptoJS.AES.encrypt(businessId.toString(), SECRET_KEY).toString();

        // Store encrypted businessId in local storage
        localStorage.setItem("businessid", encryptedBusinessId);
        localStorage.setItem('loginTime', Date.now());
        
        // Update context
        setBusinessId({ businessId });

        navigate('/myservices/business-profile/subscriptions');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      toast.error('Error: ' + (error.response?.data?.message || 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-44 bg-blue-500">
          <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,149.3C672,171,768,181,864,165.3C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="relative z-10 p-8 pt-16">
          <h1 className="text-5xl font-luckiest-guy text-center text-white mb-6">MELA</h1>
          <h2 className="text-xl text-center text-gray-800 pt-1 mb-8">Login with Business Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center bg-gray-100 rounded-lg p-3">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <MdEmail className="w-6 h-6 text-white" />
              </div>
              <input
                type="email"
                className="bg-transparent w-full focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg p-3">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <IoKey className="w-6 h-6 text-white" />
              </div>
              <input
                type="password"
                className="bg-transparent w-full focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't Have Account? <Link to="/businesssignup" className="text-blue-500 font-semibold hover:underline">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;