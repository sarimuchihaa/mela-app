import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AiFillStar, AiOutlineClockCircle, AiOutlineCalendar } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../Loader/Loader';
import { UserContext } from '../ContextApi/UserContext';
import { CustomerBaseURL } from '../APIS/APIS';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`${CustomerBaseURL}/getServiceDetails?serviceId=${serviceId}`);
        setServiceDetails(response.data);
      } catch (error) {
        toast.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  // Get today's date for min value in date input
  const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time.');
      return;
    }

    setIsSubmitting(true);

    // Convert selectedTime from 'hh:mm AM/PM' to 'HH:mm'
    const [time, modifier] = selectedTime.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    } else if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    const formattedTime = `${hours}:${minutes}`;
    const bookingDate = `${selectedDate}T${formattedTime}:00Z`;

    try {
      const scheduleData = {
        userId: userId.userId,
        businessId: serviceDetails?.service?.business,
        serviceId,
        bookingDate,
      };

      const response = await axios.post(`${CustomerBaseURL}/book-service`, scheduleData);

      if (response.data) {
        toast.success('Appointment scheduled successfully!');
        setSelectedDate(null);
        setSelectedTime(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];

  const currentDate = new Date(); // Current date and time

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto py-10 px-4 md:px-10">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row">
            <img
              src={serviceDetails?.service?.pic || 'https://via.placeholder.com/300x200'}
              alt={serviceDetails?.service?.serviceName || 'Service Image'}
              className="w-full md:w-1/2 h-64 object-cover"
            />
            <div className="p-6 flex-1">
              <h2 className="text-3xl font-bold text-gray-800">{serviceDetails?.service?.serviceName || 'Service Name'}</h2>
              <div className="flex items-center text-gray-600 mt-2">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {serviceDetails?.service?.location || 'Service Location'}
              </div>
              <div className="flex items-center mt-4">
                <AiFillStar className="text-yellow-500 mr-1" />
                <span className="text-gray-800 font-semibold">{serviceDetails?.reviews[0]?.rating || '0.0'}</span>
                <span className="ml-2 text-gray-500">({serviceDetails?.reviews.length || '0'} Reviews)</span>
              </div>
              <div className="text-2xl font-bold text-gray-800 mt-4">${serviceDetails?.service?.price || '0.00'}</div>
              <p className="text-gray-600 mt-2">
                {serviceDetails?.service?.description || 'No description available.'}
              </p>
            </div>
          </div>

          {/* Set Your Time Section */}
          <div className="p-6 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Date & Time</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Choose Date</h4>
                <div className="relative">
                  <AiOutlineCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-gray-800 w-full"
                    value={selectedDate || ''}
                    min={today} // Disable past dates
                    onChange={(e) => handleDateSelect(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Choose Time</h4>
                <div className="flex flex-wrap gap-3">
                  {times.map((time, index) => {
                    const [timeHour, timeModifier] = time.split(' ');
                    const [hour] = timeHour.split(':');
                    const selectedDateObj = new Date(selectedDate);
                    const isToday = selectedDateObj.toDateString() === currentDate.toDateString();
                    const currentHour = currentDate.getHours();

                    const isPastTime = isToday && (
                      (timeModifier === 'AM' && parseInt(hour) <= currentHour && currentHour < 12) ||
                      (timeModifier === 'PM' && parseInt(hour) + 12 <= currentHour)
                    );

                    return (
                      <button
                        key={index}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-2 px-4 text-sm rounded-md transition-colors duration-200 ${
                          selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
                        }`}
                        disabled={isPastTime} // Disable past times
                      >
                        <AiOutlineClockCircle className="inline mr-1" />
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Button */}
          <div className="p-6 bg-gray-50 text-center">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              onClick={handleSchedule}
              className={`bg-blue-600 text-white font-semibold py-2 w-full px-4 rounded-lg shadow-lg transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
