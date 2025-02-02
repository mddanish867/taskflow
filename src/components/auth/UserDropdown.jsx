import React from "react";
import { Settings, Moon, Users, LogOut } from "lucide-react";

const UserDropdown = ({
  isOpen,
  userData,
  displayInitials,
  displayImageOrInitials,
  setActiveTab,
  handleSwitchAccount,
  handleLogOut,
  onClose,
}) => {
  if (!isOpen || !userData?.data) return null;

  return (
    <div className="absolute -right-10 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-10">
      <div className="flex flex-row px-4 py-2 border-b bg-gray-100">
        <div className="w-20 h-20 rounded-full bg-blue-500 text-3xl font-bold text-white flex items-center justify-center">
          {userData.data?.name
            ? userData.data.name.slice(0, 2).toUpperCase()
            : userData.data?.email.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-col p-4">
          <div className="font-semibold text-2xl">
            {userData.data.name || userData.data.email}
          </div>
          <div className="text-sm text-gray-500">{userData.data.email}</div>
        </div>
      </div>
      <button
        onClick={() => {
          setActiveTab("security");
          onClose();
        }}
        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
      >
        <Settings size={18} />
        Account settings
      </button>

      <button
        onClick={() => {
          setActiveTab("settings");
          onClose();
        }}
        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
      >
        <Moon size={18} />
        Theme
      </button>

      <div className="border-t">
        <button
          onClick={handleSwitchAccount}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Users size={18} />
          Switch account
        </button>
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="font-bold" size={18} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
