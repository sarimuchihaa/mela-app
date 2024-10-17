import React from 'react';
import BusinessSidebar from '../BusinessSidebar/BusinessSidebar';

const BusinessLayout = ({ children }) => {
  return (
    <div className="flex h-screen"> {/* Add h-screen here */}
      <BusinessSidebar/>
      <main className="flex-1 overflow-y-auto"> {/* overflow-y-auto for scrolling if content overflows */}
        {children}
      </main>
    </div>
  );
};

export default BusinessLayout;