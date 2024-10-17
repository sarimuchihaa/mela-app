import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai'; // Star icon
import { FaMapMarkerAlt } from 'react-icons/fa'; // Location pin icon
import { IoPricetags } from "react-icons/io5";
import BusinessLoader from '../../BusinessLoader/BusinessLoader';
import { toast } from 'react-toastify'; // Import toast
import { Spinner } from 'react-bootstrap'; // Import Bootstrap Spinner for loader
import { BusinessBaseURL } from '../../../../APIS/APIS';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `${BusinessBaseURL}/getBookedServiceById/?id=${id}`
      );
      if (response.data.booking) {
        setBooking(response.data.booking);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast.error('Error fetching job details'); // Show error toast
    }
  };

  const markAsComplete = async () => {
    setLoading(true); // Set loading to true when starting the API call
    try {
      const response = await axios.put(`${BusinessBaseURL}/delivered`, {
        bookingId: id, // Using the id from useParams
      });
      toast.success(response.data.message); // Show success toast
      // Navigate to '/jobs' and refresh the page
      navigate('/jobs');
      window.location.reload(); // Optional: Force reload to fetch new data
    } catch (error) {
      console.error('Error marking as complete:', error);
      toast.error('Error marking as complete'); // Show error toast
    } finally {
      setLoading(false); // Set loading to false after the API call is done
    }
  };

  if (!booking) {
    return <BusinessLoader />;
  }

  const averageRating = booking.averageRating || "0.0";
  const reviewsCount = booking.reviews ? booking.reviews.length : 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative">
          {/* Service Image with placeholder */}
          <img
            src={booking.service.pic || 'https://via.placeholder.com/600x400.png?text=No+Image+Available'}
            alt={booking.service.serviceName}
            className="w-full h-72 object-cover "
          />
          <button
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
        <div className="p-6 md:p-8 lg:p-10">
          {/* User Details */}
          <div className="flex items-center mb-4">
            <img
              src={booking.user.pic || 'https://via.placeholder.com/40'}
              alt={booking.user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{booking.user.name}</h3>
              <p className="text-gray-600 text-sm">{booking.user.email}</p>
            </div>
          </div>

          {/* Service Name and Rating */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
              {booking.service.speciality.join(', ')}
            </h2>
            <div className="flex items-center mt-4 md:mt-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar
                    key={i}
                    className={`text-yellow-400 w-6 h-6 ${i < averageRating ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm md:text-base text-gray-600">
                {averageRating} ({reviewsCount} Reviews)
              </span>
            </div>
          </div>

          {/* Price and Location */}
          <div className="flex items-center font-semibold text-lg md:text-xl mb-4">
            <IoPricetags className="w-5 text-green-600 h-5 mr-2" />
            <span className='text-gray-600'> ${booking.service.price}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="w-5 text-red-600 h-5 mr-2" />
            <span>{booking.service.location}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
            {booking.service.description}
          </p>

          {/* Actions and Booking Date */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            {/* Only show 'Mark as Complete' button if the status is not 'Delivered' */}
            {booking.status !== 'Delivered' && (
              <button
                className={`w-full sm:w-auto bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition-colors text-base md:text-lg ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={markAsComplete}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Spinner animation="border" size="sm" className="mr-2" /> {/* Loader here */}
                    Loading...
                  </div>
                ) : (
                  'Mark as Complete'
                )}
              </button>
            )}
            <p className="text-sm md:text-base text-gray-500 mt-4 sm:mt-0">
              {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}{' '}
              |{' '}
              {new Date(booking.bookingDate).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
