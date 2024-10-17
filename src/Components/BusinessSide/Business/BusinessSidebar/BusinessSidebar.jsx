import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdHomeRepairService } from "react-icons/md";

import { useContext } from "react";

import { UserContext } from "../../../ContextApi/UserContext";
import LogoutModal from "../../../LogoutModal/LogoutModal";

const BusinessSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const{setBusinessId}=useContext(UserContext)
  const sidebarItems = [
    { icon: <FaHome />, label: "Home", route: "/businesshome" },
    { icon: <IoChatboxEllipses />, label: "Chat", route: "/business-chat" },
    { icon: <FaCalendarAlt />, label: "Jobs", route: "/jobs" },
    { icon: <FaUser />, label: "Account", route: "/myservices/business-profile" },
    { icon: <MdHomeRepairService />, label: "Services", route: "/myservices" },
  ];


  const handleLogoutConfirm = () => {
    localStorage.removeItem('businessid')
    localStorage.removeItem('loginTime')
    toast.success("Logout successfully");
    setIsLogoutModalOpen(false);  
    navigate("/splash");
    setBusinessId(null)
   
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center justify-start p-4 bg-gray-800 text-white fixed top-4 left-4 z-50 rounded-full">
        <FaBars
          className="text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white flex flex-col items-center py-8 fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-48 w-64`}
      >
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.route}
            className="flex items-center w-full px-4 py-3 mb-4 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            <div className="text-2xl">{item.icon}</div>
            <span
              className={`ml-4 text-base font-medium ${
                isOpen ? "block" : "hidden md:block"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}

        {/* Logout Button */}
        <div
          className="mt-auto flex items-center w-full px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
          onClick={() => setIsLogoutModalOpen(true)}  
        >
          <FaSignOutAlt className="text-2xl" />
          <span className="ml-4 text-base font-medium">Logout</span>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default BusinessSidebar;