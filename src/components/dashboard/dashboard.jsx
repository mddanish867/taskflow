



// Dashboard.js
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
      <Sidebar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
      />
      
      <main className="flex-1 -ml-16">
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