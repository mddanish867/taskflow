import React, { useState } from "react";
import {
  UserCircle,
  Settings,
  Shield,
  Clock,
  LogOut,
  Trash2,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { TabContent } from "./TabContent";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "sessions", label: "Sessions", icon: Clock },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "delete", label: "Delete Account", icon: Trash2 },
  ];

  const userInfo = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/api/placeholder/40/40",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
            <div className="flex items-center">
              <a href="/">
                <span className="text-2xl font-bold text-blue-600">
                  SooraAuth
                </span>
              </a>
            </div>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
            >
              <img
                src={userInfo.avatar}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <div className="px-4 py-2 border-b">
                  <div className="font-medium">{userInfo.name}</div>
                  <div className="text-sm text-gray-500">{userInfo.email}</div>
                </div>
                <button
                  onClick={() => console.log("Logout clicked")}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:block fixed lg:relative  left-0 w-64 bg-white border-r transform lg:transform-none lg:translate-x-0 transition-transform duration-200 ease-in-out z-20`}
        >
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-sm rounded-lg ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}

            <button
              onClick={() => console.log("Logout clicked")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg mt-4"
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-1">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Content for each tab would go here */}
              <p className="text-gray-600">
                <TabContent activeTab={activeTab} userProfile={userInfo} />
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
