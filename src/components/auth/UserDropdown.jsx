import React from 'react';
import { Settings, Moon, Users, LogOut } from 'lucide-react';

const UserDropdown = ({
  isOpen,
  userData,
  displayInitials,
  displayImageOrInitials,
  setActiveTab,
  handleSwitchAccount,
  handleLogOut,
  onClose
}) => {
  if (!isOpen || !userData?.data) return null;
  
  return (
   <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-10">
                   <div className="px-4 py-2 border-b bg-gray-100">
                     <div className="font-semibold text-2xl">
                       {userData.data.name || userData.data.email}
                     </div>
                     <div className="text-sm text-gray-500">
                       {userData.data.email}
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