import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../../ContextApi/UserContext';
import BusinessLoader from '../../BusinessLoader/BusinessLoader';
import { RiMessage2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { BusinessBaseURL } from '../../../../APIS/APIS';

const BusinessHome = () => {
  const [loading, setLoading] = useState(true);
  const [bookedServices, setBookedServices] = useState([]);
  const { businessId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedServices = async () => {
      try {
        const response = await axios.get(`${BusinessBaseURL}/getBookedServices?businessId=${businessId.businessId}`);
        
        // Filter out services with status "Delivered"
        const filteredServices = response.data.bookings.filter((service) => service.status !== 'Delivered');
        setBookedServices(filteredServices);
      } catch (error) {
        console.error('Error fetching booked services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedServices();
  }, [businessId.businessId]);

  if (loading) {
    return <BusinessLoader />;
  }

  const handleViewDetails = (id) => {
    // Navigate to the service details page
    navigate(`/jobs/jobdetails/${id}`);
  };

  return (
    <div className="p-2">
      <h1 className="font-bold text-2xl md:text-3xl text-custom-blue text-center mb-8 mt-8">Your Upcoming Jobs</h1> {/* Centered Heading with Increased Font Size and Margins */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 pr-8  gap-4">
        {bookedServices.map((job) => {
          const formattedDateTime = new Date(job.bookingDate).toLocaleString(); // Format date and time

          return (
            <div key={job._id} className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col transition-transform duration-500 transform hover:scale-105 min-h-[300px] w-full mx-4 border border-gray-300">
              <button
                className="absolute top-2 right-4 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={() => navigate("/business-chat")}
              >
                <RiMessage2Fill className="text-blue-500" size={20} />
              </button>

              <div className="mb-4">
                <h2 className="text-custom-blue font-bold text-lg md:text-xl mb-1">
                  {job.user.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  {formattedDateTime} {/* Display both date and time */}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-700 font-semibold text-md mb-1">Service Description:</h3>
                <p className="text-gray-600">{job.service.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-blue-400 font-bold text-md">Speciality:</h3>
                <p className="text-gray-700">{job.service.speciality.join(', ')}</p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <p className={`font-bold text-md ${job.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                  Status: <span className="text-sm font-normal">{job.status}</span>
                </p>

                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleViewDetails(job._id)} // Calls handleViewDetails with job ID
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessHome;
