import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Trash2,
  History,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { TabContent } from './TabContent';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+1 234 567 8900',
    avatar: '/api/placeholder/150/150'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'sessions', label: 'Sessions', icon: History },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'delete', label: 'Delete Account', icon: Trash2 }
  ];

  return (
    <div className="flex bg-gray-50 py-10">
      <div className="fixed inset-y-0 left-0 lg:relative">
        <div className="flex h-full">
          {/* Sidebar for small screens (icons only) */}
          <div className="w-16 bg-white shadow-lg lg:hidden">
            <div className="flex flex-col h-full py-4">
              <div className="flex-shrink-0 flex justify-center pb-4">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <nav className="flex-1 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex justify-center p-3 ${
                        activeTab === tab.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Sidebar for large screens (icons with labels) */}
          <div className="hidden lg:flex lg:w-64 lg:flex-col lg:bg-white lg:shadow-sm py-10">
            <div className="flex flex-col h-full p-4">
              
              <nav className="flex-1 space-y-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${
                        activeTab === tab.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="flex-shrink-0 flex items-center space-x-3 pb-4">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userProfile.name}</span>
                  <span className="text-xs text-gray-500">{userProfile.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 lg:ml-1 sm:ml-28">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <TabContent activeTab={activeTab} userProfile={userProfile} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;