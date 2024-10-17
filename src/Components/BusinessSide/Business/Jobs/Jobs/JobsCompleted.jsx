import React, { useState, useEffect, useContext } from 'react';
import { RiMessage2Fill } from "react-icons/ri";
import axios from 'axios';
import { UserContext } from '../../../../ContextApi/UserContext';
import { useNavigate } from 'react-router-dom';
import { BusinessBaseURL } from '../../../../APIS/APIS';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  console.log(jobs);
  const [activeLink, setActiveLink] = useState('upcoming');
  const { businessId } = useContext(UserContext);
  const navigate = useNavigate(); // To navigate to the JobDetails page

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${BusinessBaseURL}/getBookedServices?businessId=${businessId.businessId}`
      );
      if (response.data.bookings) {
        setJobs(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleNavigation = (tab) => {
    setActiveLink(tab);
  };

  const handleViewDetails = (id) => {
    navigate(`/jobs/jobdetails/${id}`); // Navigates to JobDetails component with the booking ID
  };

  const completedJobs = jobs.filter((job) => job.status === 'Delivered');
  const upcomingJobs = jobs.filter((job) => job.status !== 'Delivered');

  const JobCard = ({ job }) => {
    const formattedDateTime = new Date(job.bookingDate).toLocaleString(); // Includes both date and time
  
    return (
      <div className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col transition-transform duration-500 transform hover:scale-105 min-h-[300px] w-full mx-4 border border-gray-300">
        {/* Message Icon */}
        <button
          className="absolute top-2 right-4 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
          onClick={() => navigate("/business-chat")}
        >
          < RiMessage2Fill className="text-blue-500" size={20} />
        </button>

        {/* Job Header */}
        <div className="mb-4">
          <h2 className="text-custom-blue font-bold text-lg md:text-xl mb-1">
            {job.user.name}
          </h2>
          <p className="text-gray-500 text-sm">
            {formattedDateTime} {/* Display both date and time */}
          </p>
        </div>

        {/* Service Description */}
        <div className="mb-4">
          <h3 className="text-gray-700 font-semibold text-md mb-1">Service Description:</h3>
          <p className="text-gray-600">{job.service.description}</p>
        </div>

        {/* Speciality */}
        <div className="mb-4">
          <h3 className="text-blue-400 font-bold text-md">Speciality:</h3>
          <p className="text-gray-700">{job.service.speciality.join(', ')}</p>
        </div>

        {/* Booking Status */}
        <div className="flex items-center justify-between mt-auto">
          <p
            className={`font-bold text-md ${
              job.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'
            }`}
          >
            Status: <span className="text-sm font-normal">{job.status}</span>
          </p>

          {/* View Details Button */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => handleViewDetails(job._id)} // Calls handleViewDetails with job ID
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 mt-5 flex flex-col items-center relative px-4">
        <div className="flex justify-center items-center w-full">
          <h1 className="text-custom-blue font-bold text-2xl md:text-3xl">
            My Jobs
          </h1>
        </div>

        {/* Navigation between Completed and Upcoming */}
        <div className="mt-8 text-center">
          <div className="inline-flex justify-between items-center w-48 md:w-64 mx-auto text-custom-blue">
            <button
              onClick={() => handleNavigation('completed')}
              className={`text-xl md:text-2xl transition-all duration-300 pb-2 ${
                activeLink === 'completed'
                  ? 'font-bold border-b-4 border-custom-blue'
                  : 'font-normal border-b-4 border-transparent'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleNavigation('upcoming')}
              className={`text-xl md:text-2xl transition-all duration-300 pb-2 ${
                activeLink === 'upcoming'
                  ? 'font-bold border-b-4 border-custom-blue'
                  : 'font-normal border-b-4 border-transparent'
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mt-6 p-4 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeLink === 'completed' ? (
            completedJobs.length > 0 ? (
              completedJobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <p className="text-gray-500">No completed jobs found.</p>
            )
          ) : upcomingJobs.length > 0 ? (
            upcomingJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p className="text-gray-500">No upcoming jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
