import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { CustomerBaseURL } from "../APIS/APIS";
import { toast } from "react-toastify";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${CustomerBaseURL}/getCategories`);
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle category click
  const handleCategoryClick = async (categoryName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${CustomerBaseURL}/getServiceByCategory?category=${categoryName}`
      );
      navigate(`/services/${categoryName}`, { state: { services: response.data.services } });
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch services");
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />; // Show the Loader component while fetching data
  }

  return (
    <div className="flex">
      <div className="flex-1 p-4 bg-gray-100 min-h-screen overflow-y-auto">
        {/* Hero Section */}
        <div className="relative mb-8 p-8 bg-cover bg-center rounded-lg shadow-lg flex flex-col items-center justify-center bg-[url('/frame.jpg')]">
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Discover Our Services
            </h1>
            <p className="text-lg text-white mb-6">
              Browse through our categories to find the best services tailored to your needs.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="group cursor-pointer flex flex-col items-center border border-gray-300 bg-white text-black p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                onClick={() => handleCategoryClick(category.name)} // Trigger navigation on click
              >
                <img
                  src={category.picture}
                  alt={category.name}
                  className="w-24 h-24 object-cover mb-4 rounded-full duration-300 border-2 border-gray-200 group-hover:border-indigo-500 transition-all "
                />
                <span className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                  {category.name}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-700 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">No Categories Found</h2>
              <p className="text-gray-600">
                We couldn't find any categories at the moment. Please check back later or contact support.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
