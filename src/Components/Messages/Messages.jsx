import React from "react";
import { AiOutlineSearch, AiOutlineSend } from "react-icons/ai";

const conversations = [
  { id: 1, name: "Ibrahim", role: "Support", time: "2:34 pm", avatar: "https://via.placeholder.com/40", online: true },
  { id: 2, name: "Jason", role: "Cleaner", time: "8:04 pm", avatar: "https://via.placeholder.com/40", online: false },
  { id: 3, name: "Samaltman", role: "Cleaner", time: "3:44 am", avatar: "https://via.placeholder.com/40", online: false },
  { id: 4, name: "Christiano Ronalado", role: "Cleaner", time: "12:34 pm", avatar: "https://via.placeholder.com/40", online: true },
];

const Messages = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar - Conversations List */}
      <div className="w-full lg:w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header with Search */}
        <div className="p-4 bg-blue-800 text-white flex items-center justify-between">
          <h1 className="text-xl font-semibold">Chats</h1>
          <div className="relative w-full max-w-xs ml-4">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((msg) => (
            <div
              key={msg.id}
              className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-12 h-12 rounded-full"
                />
                {msg.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="ml-4 flex-grow">
                <div className="text-lg font-semibold text-gray-900">{msg.name}</div>
                <div className="text-sm text-gray-500">{msg.role}</div>
              </div>
              <div className="text-sm text-gray-500">{msg.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-blue-800 text-white flex items-center justify-between">
          <h2 className="text-lg font-semibold">Abubaker</h2>
          <div className="text-sm text-gray-300">Online</div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {/* Example message */}
          <div className="flex items-start mb-4">
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-gray-800">Hey, how can I assist you today?</p>
              </div>
              <div className="text-xs text-gray-500 mt-1">2:34 pm</div>
            </div>
          </div>
          {/* End of example message */}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="ml-4 text-blue-600 hover:text-blue-800">
            <AiOutlineSend className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
