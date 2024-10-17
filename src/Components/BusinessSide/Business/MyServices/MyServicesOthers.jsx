import React, { useState, useEffect, useContext } from 'react';
import { FaBell, FaEllipsisH, FaThumbtack, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; 
import { useNavigate, Link } from 'react-router-dom';
import BusinessLoader from '../BusinessLoader/BusinessLoader.jsx';
import { UserContext } from '../../../ContextApi/UserContext.jsx';
import PromoteModal from './PromoteModal.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BusinessBaseURL } from '../../../APIS/APIS.js';

const MyBusinessServices = () => {
  const [activeLink, setActiveLink] = useState('others');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const { businessId } = useContext(UserContext);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const handleNavigation = (section) => {
    setActiveLink(section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BusinessBaseURL}/getServices?businessId=${businessId.businessId}`);
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [businessId]);

  if (loading) {
    return <BusinessLoader />;
  }

  const filteredServices = services.filter(service => 
    activeLink === 'promoted' ? service.promoted : !service.promoted
  );

  const handleDropdownToggle = (serviceId) => {
    setDropdownOpen(dropdownOpen === serviceId ? null : serviceId);
  };

  const handlePromoteClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    setIsPromoteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPromoteModalOpen(false);
    setSelectedServiceId(null);
  };

  const handlePromoteService = (serviceId) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === serviceId ? { ...service, promoted: true } : service
      )
    );
  };

  const handleDepromoteService = async (serviceId) => {
    try {
      await axios.post(`${BusinessBaseURL}/depromote-service`, {
        serviceId: serviceId,
        durationInDays: 3,
        subscriptionType: 'daily',
      });

      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId ? { ...service, promoted: false } : service
        )
      );

      toast.success('Service depromoted successfully!');
    } catch (error) {
      console.error('Error depromoting service:', error);
      toast.error('Error depromoting service. Please try again.');
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.post(`${BusinessBaseURL}/delete-service`, {
        serviceId: serviceId,
      });

      setServices((prevServices) => prevServices.filter((service) => service._id !== serviceId));
      toast.success('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Error deleting service. Please try again.');
    }
  };

  const handleEditService = (serviceId) => {
    navigate(`/myservices/editservice/${serviceId}`); // Navigate to the edit route with serviceId
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 mt-5 flex flex-col items-center relative px-4">
        <div className="flex justify-center items-center w-full">
          <h1 className="text-custom-blue text-2xl md:text-3xl font-bold text-center mt-4">
            My Services
          </h1>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex justify-between items-center w-48 md:w-64 mx-auto text-custom-blue">
            <button
              onClick={() => handleNavigation('promoted')}
              className={`text-lg md:text-2xl transition-all duration-300 ${activeLink === 'promoted' ? 'font-bold underline underline-offset-4 decoration-#3f607e decoration-4 md:decoration-5' : 'font-normal no-underline'}`}
            >
              Promoted
            </button>
            <button
              onClick={() => handleNavigation('others')}
              className={`text-lg md:text-2xl transition-all duration-300 ${activeLink === 'others' ? 'font-bold underline underline-offset-4 decoration-#3f607e decoration-4 md:decoration-5' : 'font-normal no-underline'}`}
            >
              Others
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map(service => (
            <div key={service._id} className="w-full h-60 mx-auto bg-white shadow-xl rounded-lg p-6 relative duration-500 transition-transform transform hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{service.serviceName}</h2>
                <div className="relative">
                  <button className="cursor-pointer" onClick={() => handleDropdownToggle(service._id)}>
                    <FaEllipsisH className="text-orange-400 hover:text-blue-500 transition-colors" />
                  </button>
                  {/* Dropdown Menu */}
                  {dropdownOpen === service._id && (
                    <div className="absolute top-1 right-0 mt-2 bg-white shadow-md rounded-lg p-2 z-10">
                      <div className="space-y-2">
                        <button
                          className="flex items-center w-full p-2 bg-purple-50 hover:bg-purple-100 rounded-lg"
                          onClick={() => {
                            if (service.promoted) {
                              handleDepromoteService(service._id);
                            } else {
                              handlePromoteClick(service._id);
                            }
                          }}
                        >
                          <FaThumbtack className="text-purple-500 mr-2" />
                          <span className="text-purple-500">{service.promoted ? 'Depromote' : 'Promote'}</span>
                        </button>
                        <button 
                          className="flex items-center w-full p-2 bg-blue-50 hover:bg-blue-100 rounded-lg"
                          onClick={() => handleEditService(service._id)} // Navigate to edit page
                        >
                          <FaEdit className="text-blue-500 mr-2" />
                          <span className="text-blue-500">Edit</span>
                        </button>
                        <button 
                          className="flex items-center w-full p-2 bg-red-50 hover:bg-red-100 rounded-lg"
                          onClick={() => handleDeleteService(service._id)} // Call the delete function here
                        >
                          <FaTrash className="text-red-500 mr-2" />
                          <span className="text-red-500">Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-blue-500 text-sm">{service.speciality}</span>
                <span className="text-blue-500 text-xl font-semibold">${service.price}</span>
              </div>
              <span className="text-gray-600 text-sm">{service.description}</span>
            </div>
          ))}
        </div>

        <div className="fixed bottom-4 right-4 flex items-center justify-center">
          <div className="relative group">
            <button className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300">
              <Link to="/myservices/addservice" className="flex items-center justify-center w-full h-full bg-transparent rounded-full text-white">
                <FaPlus className="text-xl md:text-2xl lg:text-3xl" />
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Promote Modal */}
      {isPromoteModalOpen && (
        <PromoteModal
          onClose={handleCloseModal}
          serviceId={selectedServiceId}
          onPromoteService={handlePromoteService}
        />
      )}
    </div>
  );
};

export default MyBusinessServices;
