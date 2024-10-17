import React, { useState, useEffect, useContext } from 'react';
import { FaCamera, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../../ContextApi/UserContext';
import BusinessLoader from '../BusinessLoader/BusinessLoader';
import { BusinessBaseURL } from '../../../APIS/APIS';

const BusinessProfile = () => {
  const { businessId } = useContext(UserContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [initialFormState, setInitialFormState] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!businessId) {
      toast.error('Business ID is not available.');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BusinessBaseURL}/getBusiness/?businessId=${businessId.businessId}`);
        const { user } = response.data;
        const { name, address, city, zipCode, pic } = user;
        setName(name);
        setAddress(address);
        setCity(city);
        setZipCode(zipCode);
        if (pic) {
          setProfileImage(pic);
        }
        setInitialFormState({ name, address, city, zipCode, pic });
      } catch (error) {
        toast.error('Failed to fetch user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [businessId]);

  const hasChanges = () => {
    return (
      name !== initialFormState.name ||
      address !== initialFormState.address ||
      city !== initialFormState.city ||
      zipCode !== initialFormState.zipCode ||
      profileImage !== initialFormState.pic
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address || !city || !zipCode) {
      toast.error('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('zipCode', zipCode);
    formData.append('businessId', businessId.businessId);
    if (profileImage) {
      formData.append('pic', profileImage);
    }

    setUpdating(true);
    try {
      const response = await axios.put(
        `${BusinessBaseURL}/edit-profile`,
        formData
      );

      if (response.data.message) {
        toast.success('Profile updated successfully!');
        setInitialFormState({ name, address, city, zipCode, pic: profileImage });
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Error updating profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    toast.info('You can now edit your profile.');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BusinessLoader />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-700 relative"
    >
      <div className="relative bg-white bg-opacity-80 p-10 rounded-xl shadow-xl max-w-4xl w-full space-y-6 backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-gray-900">Business Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center shadow-lg">
            {profileImage ? (
              <img
                src={typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-400 text-6xl" />
            )}
            <label
              htmlFor="fileInput"
              className={`absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-800 transition-all z-10 ${
                !isEditing && 'opacity-50 cursor-not-allowed'
              }`}
            >
              <FaCamera className="text-white text-sm" />
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={handleImageUpload}
              disabled={!isEditing}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter business name"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-lg font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-lg font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zip code"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex justify-evenly mt-6">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 cursor-pointer px-8 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
              onClick={handleEdit}
              disabled={isEditing}
            >
              Edit
            </button>
            <button
              type="submit"
              className={`bg-green-500 text-white py-2 px-8 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 ${
                updating || !hasChanges() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isEditing || updating || !hasChanges()}
            >
              {updating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessProfile;
