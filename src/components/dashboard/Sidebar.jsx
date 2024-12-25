// Sidebar.js
import React from 'react';
import { LogOut } from 'lucide-react';

export const Sidebar = ({ tabs, activeTab, setActiveTab, userProfile }) => {
  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-screen">
      <div className="p-6 ">
        <span className="text-2xl font-bold text-blue-600"></span>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-md
                ${activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <img
            src={userProfile.avatar}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">{userProfile.name}</p>
            <p className="text-xs text-gray-500 truncate">{userProfile.email}</p>
          </div>
          <button 
            className="p-1.5 hover:bg-gray-100 rounded-lg"
            onClick={() => console.log('logout')}
          >
            <LogOut className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};