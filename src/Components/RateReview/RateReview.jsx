import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const RateReview = ({ userId, serviceId }) => {
  const [rating, setRating] = useState(4); 
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("serviceId", serviceId);
      formData.append("rating", rating);
      formData.append("comment", review);

      images.forEach((image) => {
        formData.append("pics", image);
      });

      // Post data to the API
      await axios.post("https://mela-backend.vercel.app/customer/add-review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Review submitted successfully!");
      setErrorMessage("");
    } catch (error) {
      const errorResponse = error.response?.data?.message || "Failed to submit review. Please try again.";
      setErrorMessage(errorResponse); 
      toast.error(errorResponse);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 py-6 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Rate & Review</h2>

        <div className="mb-6">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => handleRatingChange(star)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.356 4.177h4.392c.967 0 1.37 1.24.588 1.81l-3.562 2.588 1.356 4.176c.3.921-.755 1.688-1.54 1.107L10 13.495l-3.541 2.59c-.784.581-1.838-.186-1.54-1.107l1.355-4.176-3.562-2.588c-.781-.57-.38-1.81.588-1.81h4.392L9.049 2.927z" />
              </svg>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <textarea
              value={review}
              onChange={handleReviewChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write Review"
              rows="4"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center justify-center">
              <label className="w-full h-32 border-2 border-dashed rounded-lg cursor-pointer flex flex-col items-center justify-center">
                <FaPlus className="text-gray-400 text-2xl mb-1" />
                <span className="text-gray-400 text-sm">Add Picture</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Uploaded Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                  />
                ))
              ) : (
                <div className="text-gray-400 text-sm">No images selected</div>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateReview;
