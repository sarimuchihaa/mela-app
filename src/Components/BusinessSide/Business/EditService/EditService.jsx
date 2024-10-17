import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Image, Loader } from 'lucide-react';
import { BusinessBaseURL } from '../../../APIS/APIS';

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState({
    serviceName: '',
    speciality: '',
    price: '',
    description: '',
    pic: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleResize = useCallback(() => {
    setIsLargeScreen(window.innerWidth >= 1024);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    axios.get(`${BusinessBaseURL}/getServiceById?serviceId=${id}`)
      .then(response => {
        const fetchedService = response.data.service;
        setService({
          serviceName: fetchedService.serviceName,
          speciality: fetchedService.speciality.join(', '), // Joining array to display as string
          price: fetchedService.price,
          description: fetchedService.description,
          pic: fetchedService.pic || '',
        });
        if (fetchedService.pic) {
          setSelectedImage(fetchedService.pic);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the service data!', error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService(prevService => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setService(prevService => ({
          ...prevService,
          pic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios.put(`${BusinessBaseURL}/editservice`, {
      serviceId: id,
      serviceName: service.serviceName,
      speciality: service.speciality.split(',').map(item => item.trim()), // Splitting back into array
      price: service.price,
      description: service.description,
      pic: service.pic,
    })
      .then((response) => {
        setSubmitting(false);
        if (response.data.message === 'Service updated successfully') {
          navigate('/myservices/others');
        } else {
          console.error('Unexpected response:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error updating the service!', error);
        setSubmitting(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-8">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="bg-transparent border-none cursor-pointer mr-4"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold text-blue-600">Edit Service</h2>
        </div>

        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-8 cursor-pointer relative"
          onClick={triggerFileInput}
        >
          {selectedImage ? (
            <img 
              src={selectedImage} 
              alt="Service" 
              className="w-full h-64 object-cover rounded-lg" 
            />
          ) : (
            <>
              <Image size={48} className="text-gray-400 mb-2 mx-auto" />
              <p className="text-gray-500">Add Picture</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Inputs side by side for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg mb-2 font-bold text-blue-600">Service Name</label>
            <input
              type="text"
              name="serviceName"
              value={service?.serviceName}
              onChange={handleChange}
              placeholder="Enter Service"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg mb-2 font-bold text-blue-600">Specialities</label>
            <input
              type="text"
              name="speciality"
              value={service.speciality}
              onChange={handleChange}
              placeholder="Enter Your Specialities"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg mb-2 font-bold text-blue-600">Price</label>
            <input
              type="number"
              name="price"
              value={service.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg mb-2 font-bold text-blue-600">Description</label>
            <textarea
              name="description"
              value={service.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-3 border border-gray-300 rounded-md min-h-[120px] resize-y"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-4 bg-blue-600 text-white rounded-md font-bold flex items-center justify-center"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader size={20} className="animate-spin mr-2" />
              Saving...
            </>
          ) : (
            'Save'
          )}
        </button>
      </form>
    </div>
  );
}
