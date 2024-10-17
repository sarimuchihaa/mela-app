import React, { createContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
  const [businessId, setBusinessId] = useState(null);
  
  console.log("businessid",businessId)
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const encryptedCustomerId = localStorage.getItem('customerid');
    const encryptedBusinessId = localStorage.getItem('businessid');
    // const role = localStorage.getItem("role");
    
    
    if (encryptedCustomerId) {
      try {
        // Decrypt the customerId
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedCustomerId, SECRET_KEY);
        const decryptedCustomerId = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedCustomerId) {
          throw new Error("Decryption failed or returned an empty string.");
        }

        setUserId({userId:decryptedCustomerId});
        // setRole('customer');
      } catch (error) {
        console.error('Error decrypting customerId:', error);
      }
    }

    if (encryptedBusinessId) {
      try {
        // Decrypt the businessId
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedBusinessId, SECRET_KEY);
        const decryptedBusinessId = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedBusinessId) {
          throw new Error("Decryption failed or returned an empty string.");
        }

        setBusinessId({businessId:decryptedBusinessId});
  
      } catch (error) {
        console.error('Error decrypting businessId:', error);
      }
    }
    
    setIsLoading(false); // Set loading to false after decryption attempt
  }, []);
  
  // While loading, don't render the children (prevents premature redirects)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ userId, businessId, setUserId, setBusinessId }}>
      {children}
    </UserContext.Provider>
  );
};
