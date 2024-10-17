import React, { useState, useContext, useEffect } from "react";
import { ArrowLeft, Image } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextApi/UserContext";
import axios from "axios";
import { BusinessBaseURL } from "../../../APIS/APIS";

export default function AddService() {
  const [formData, setFormData] = useState({
    serviceName: "",
    categoryName: "",
    speciality: "",
    price: "",
    description: "",
    location: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State for categories
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate();
  const { businessId } = useContext(UserContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BusinessBaseURL}/getCategories`);
        if (response.status === 200) {
          setCategories(response.data.categories); // Set categories from the response
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error for the current field
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.serviceName) newErrors.serviceName = "Service Name is required.";
    if (!formData.categoryName) newErrors.categoryName = "Category Name is required.";
    if (!formData.speciality) newErrors.speciality = "Speciality is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.profileImage) newErrors.profileImage = "Profile Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return; // Stop submission if there are validation errors
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("businessId", businessId.businessId); // Assuming user has businessId in context
      formDataToSend.append("categoryName", formData.categoryName);
      formDataToSend.append("serviceName", formData.serviceName);
      formDataToSend.append("speciality", formData.speciality);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("pic", formData.profileImage);
      formDataToSend.append("location", formData.location);

      const response = await axios.post(
        `${BusinessBaseURL}/addservice`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Service added successfully!");
        navigate("/myservices");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 min-h-screen">
      <div className="w-full mx-auto font-sans rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            className="bg-none border-none cursor-pointer mr-4"
            onClick={() => navigate("/myservices")}
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-center mb-6 text-3xl font-bold text-gray-700">
            Add Service
          </h2>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {formData.profileImage ? (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Profile"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <>
                <Image size={48} className="text-gray-300 mb-2" />
                <p className="text-gray-600">Add Picture</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={handleImageUpload}
            />
            {errors.profileImage && <p className="text-red-500">{errors.profileImage}</p>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg mb-2 font-bold text-gray-700">
                Service Name
              </label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                placeholder="Enter Service Name"
                className="w-full p-3 border border-blue-500 rounded-lg"
              />
              {errors.serviceName && <p className="text-red-500">{errors.serviceName}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2 font-bold text-gray-700">
                Category Name
              </label>
              <select
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="w-full p-3 border border-blue-500 rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryName && <p className="text-red-500">{errors.categoryName}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2 font-bold text-gray-700">
                Speciality
              </label>
              <input
                type="text"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                placeholder="Enter Your Speciality"
                className="w-full p-3 border border-blue-500 rounded-lg"
              />
              {errors.speciality && <p className="text-red-500">{errors.speciality}</p>}
            </div>

            <div>
              <label className="block text-lg mb-2 font-bold text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter Price"
                className="w-full p-3 border border-blue-500 rounded-lg"
              />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-lg mb-2 font-bold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-3 border border-blue-500 rounded-lg min-h-[120px] resize-y"
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
          </div>

          <div className="mb-5">
            <label className="block text-lg mb-2 font-bold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location"
              className="w-full p-3 border border-blue-500 rounded-lg"
            />
            {errors.location && <p className="text-red-500">{errors.location}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg flex justify-center items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
            ) : null}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
