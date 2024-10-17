import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai';
import Loader from '../Loader/Loader';

const ServicePage = () => {
  const location = useLocation();
  const { services } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!services) {
      // Simulate a delay for fetching data
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [services]);

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const filteredServices = services?.filter(service =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex-grow p-4 md:p-8">
        {/* Category Title */}
        {services?.length > 0 && (
          <div className="w-full max-w-4xl text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {services[0].serviceName}
            </h1>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white w-full max-w-4xl rounded-full shadow-lg p-4 flex items-center mx-auto mb-6">
          <AiOutlineSearch className="text-gray-500 text-2xl mr-4" />
          <input
            type="text"
            placeholder={`Search for ${
              services?.length > 0 ? services[0].serviceName.toLowerCase() : 'services'
            }, movers, repairing...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 focus:bg-white transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Services Grid or No Services Available Message */}
        {filteredServices?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-6 w-full max-w-6xl mx-auto">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-xl"
                onClick={() => handleServiceClick(service._id)}
              >
                <img
                  src={service.pic || "https://via.placeholder.com/150"}
                  alt={service.business}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {service.serviceName}
                  </h2>
                  <p className="text-gray-600">{service.speciality}</p>
                  <div className="flex items-center mt-3">
                    <AiFillStar className="text-yellow-500 mr-1" />
                    <span className="text-gray-800">
                      {service.promoted ? '5.0' : '4.5'}
                    </span>
                  </div>
                  <div className="mt-3 text-xl font-bold text-gray-900">
                    ${service.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex justify-center'>
            <div className="w-full max-w-4xl text-center mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                No services available for your search criteria.
              </h2>
              <p className="text-gray-600 mt-4">
                Please check your search terms or explore other categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
