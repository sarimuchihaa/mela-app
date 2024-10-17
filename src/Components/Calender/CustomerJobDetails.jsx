import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify'; // Import toast
import axios from 'axios'; // Import axios
import { Spinner } from 'react-bootstrap';
import Loader from '../Loader/Loader';

const CustomerJobDetails = () => {
  const { id } = useParams(); // Get job ID from the route
  const navigate = useNavigate(); // Hook for navigation
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state for the accept button

  useEffect(() => {
    // Fetch job details by job ID
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://mela-backend.vercel.app/customer/getBookedServiceById?id=${id}`);
        setJobDetails(response.data.booking);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!jobDetails) {
    return <Loader />;
  }

  const { business, service, bookingDate, status } = jobDetails;

  // Function to handle job acceptance
  const acceptJob = async () => {
    setLoading(true); // Start loader when button is clicked
    try {
      const response = await axios.put(`https://mela-backend.vercel.app/customer/completed`,{
        bookingId: id,
      });
      if (response.status === 200) {
        toast.success('Job accepted successfully!'); // Show success toast
        navigate(-1); // Navigate back
      } else {
        toast.error('Error accepting job.'); // Show error toast if status is not 200
      }
    } catch (error) {
      toast.error('An error occurred while accepting the job.'); // Handle network error
      console.error('Error accepting job:', error);
    } finally {
      setLoading(false); // Stop loader after response
    }
  };

  return (
    // Card Container
    <div className='bg-gradient-to-r from-blue-500 to-blue-700 min-h-screen flex items-center justify-center p-6'>
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Back Button */}
        <div className="flex items-center p-4 border-b">
          <button
            onClick={() => navigate(-1)} // Navigate back
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg focus:outline-none"
          >
            Back
          </button>
        </div>

        {/* Header Section */}
        <div className="flex items-center p-6 border-b">
          <img
            src={business.pic || 'https://via.placeholder.com/150'}
            alt="Business Avatar"
            className="w-24 h-24 rounded-full border-2 border-blue-500"
          />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-gray-800">{business.name}</h2>
            <p className="text-gray-600">{business.email}</p>
          </div>
        </div>

        {/* Service and Booking Information */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Information */}
          <div className="bg-gray-50 rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold text-gray-700">Service Details</h3>
            <img src={service.pic} alt={service.speciality.join(', ')} className="w-full h-48 object-cover rounded-lg mt-4" />
            <h4 className="text-blue-600 text-lg font-bold mt-4">{service.speciality.join(', ')}</h4>
            <p className="mt-2 text-gray-600">{service.description}</p>
            <p className="mt-4 text-lg text-green-600 font-semibold">Price: ${service.price}</p>
          </div>

          {/* Booking Information */}
          <div className="bg-gray-50 rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold text-gray-700">Booking Information</h3>
            <p className="mt-4 text-gray-600">
              <span className="font-semibold">Booking Date: </span>
              {new Date(bookingDate).toLocaleDateString()} at {new Date(bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="mt-4 text-gray-600">
              <span className="font-semibold">Status: </span>
              <span className={`px-2 py-1 rounded-md ${status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' : status === 'Delivered' ? 'bg-green-100 text-green-600' : ''}`}>
                {status}
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 p-6 flex justify-end bg-gray-50 rounded-lg border-t">
          {/* Show 'Accept' button only if status is 'Delivered' */}
          {status === 'Delivered' && (
            <button 
              onClick={acceptJob} 
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div className="flex items-center justify-center">
                <Spinner animation="border" size="sm" className="mr-2" /> {/* Loader here */}
                Loading...
              </div>
              ) : (
                'Accept'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerJobDetails;
