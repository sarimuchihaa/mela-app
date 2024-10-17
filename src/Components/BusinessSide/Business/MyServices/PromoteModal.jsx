import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BusinessBaseURL } from '../../../APIS/APIS';

export default function PromoteModal({ onClose, serviceId }) {
  const [days, setDays] = useState(3);
  const [pricePerDay, setPricePerDay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPrice = async () => {
    try {
      const response = await axios.get(`${BusinessBaseURL}/getPrice`);
      if (response.data.price.length > 0) {
        setPricePerDay(parseFloat(response.data.price[0].price));
      } else {
        toast.error('No price data available.');
      }
    } catch (error) {
      console.error('Error fetching price:', error);
      toast.error('Error fetching price. Please try again.');
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  const totalCost = pricePerDay ? days * pricePerDay : 0;

  const handlePromoteClick = async () => {
    if (!serviceId) return;

    setIsLoading(true);
    try {
      await axios.post(`${BusinessBaseURL}/promote-service`, {
        serviceId: serviceId,
        durationInDays: days,
        price: totalCost,
      });
      toast.success('Promoted successfully!');
      navigate('/myservices');
      onClose();
    } catch (error) {
      console.error('Error promoting service:', error);
      toast.error('Error promoting service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Promote Your Service</h2>
        <p className="mt-2 text-gray-600 text-center">Select the number of days to promote your service.</p>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-1">Select Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Price Per Day</label>
          <p className="font-semibold text-gray-800">${pricePerDay !== null ? pricePerDay.toFixed(2) : 'Loading...'}</p>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Total Cost</label>
          <p className="font-semibold text-gray-800">${totalCost.toFixed(2)}</p>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 rounded-md w-full hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handlePromoteClick}
            className={`bg-blue-600 ml-2 text-white py-2 rounded-md w-full hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="spinner mr-2"></div>
                Promoting...
              </div>
            ) : (
              'Promote Now'
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top: 4px solid #ffffff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
