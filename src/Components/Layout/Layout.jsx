import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen"> {/* Add h-screen here */}
      <Sidebar />
      <main className="flex-1 overflow-y-auto"> {/* overflow-y-auto for scrolling if content overflows */}
        {children}
      </main>
    </div>
  );
};

export default Layout;