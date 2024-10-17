import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../ContextApi/UserContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Calendar = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingJobs, setUpcomingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  console.log('upcomingJobs',upcomingJobs)
  console.log('completedJobs',completedJobs)
 
  useEffect(() => {
    // Fetch the booked services data based on the userId
    const fetchJobs = async () => {
      try {
        setLoading(true); // Start loader
        const response = await fetch(
          `https://mela-backend.vercel.app/customer/getUserBookedServices?userId=${userId.userId}`
        );
        const data = await response.json();
        console.log("data", data);

        // Extract bookings from the API response
        const { bookings } = data;

        // Sort jobs by booking date (descending) to show recent jobs first
        const sortedBookings = bookings.sort(
          (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
        );

        // Filter jobs into upcoming and completed based on the status
        const upcoming = sortedBookings.filter(
          (job) => job.status !== "completed"
        );
        const completed = sortedBookings.filter(
          (job) => job.status === "completed"
        
        );


        setUpcomingJobs(upcoming);
        setCompletedJobs(completed);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false); // End loader
      }
    };

    fetchJobs();
  }, [userId]);

  const renderJobs = (jobs, jobType) => (
    <div>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg duration-300 hover:scale-105 shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {job.service.category.name || "No Name Provided"}
                </h3>
                <p className="text-gray-500">
                  {new Date(job.bookingDate).toLocaleDateString()} |{" "}
                  {new Date(job.bookingDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
  
                {/* Check if job.service is not null before rendering service details */}
                {job.service ? (
                  <>
                    <h4 className="mt-4 text-blue-600 font-semibold">
                      {job.service.speciality?.join(", ") || "No Speciality"}
                    </h4>
                    <p className="mt-2 text-gray-700">
                      {job.service.description || "No description available"}
                    </p>
                  </>
                ) : (
                  <p className="mt-4 text-red-500">Service details not available</p>
                )}
              </div>
  
              <button
                onClick={() => navigate(`/job-details/${job._id}`)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Render message if no jobs found
        <div className="text-center text-gray-500 mt-6">
          No {jobType} jobs available.
        </div>
      )}
    </div>
  );
  

  return (
    <div className="bg-white max-w-7xl mx-auto p-6">
      {/* Tabs for Upcoming and Completed */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-6 py-2 text-lg font-semibold ${
            activeTab === "upcoming"
              ? "text-blue-500 border-b-4 border-blue-500"
              : "text-gray-500"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-6 py-2 text-lg font-semibold ml-4 ${
            activeTab === "completed"
              ? "text-blue-500 border-b-4 border-blue-500"
              : "text-gray-500"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Show loader while fetching data */}
      {loading ? (
        <Loader />
      ) : (
        // Render Upcoming or Completed Jobs based on active tab
        activeTab === "upcoming"
          ? renderJobs(upcomingJobs, "upcoming")
          : renderJobs(completedJobs, "completed")
      )}
    </div>
  );
};

export default Calendar;
