import React, { useState } from "react";
import {
  UserCircle,
  Settings,
  Shield,
  Clock,
  LogOut,
  Trash2,
  Grip as MenuIcon,
  X,
  Loader,
  Moon,
  Users,
} from "lucide-react";
import { TabContent } from "./TabContent";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "../api/authAPI/authApiSlice";
import { toast } from "../helper/toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserDropdown from "../auth/UserDropdown";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggedOut] = useLogoutMutation();
  const navigate = useNavigate();

  let email;
  try {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    email = decodedToken?.email;
  } catch (e) {
    console.error("Error decoding token:", e);
  }

  const { data: userData, isLoading } = useGetUserQuery(email);

  const displayImageOrInitials = () => {
    if (!userData?.data) {
      return (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white">
          XX
        </div>
      );
    }

    const user = userData.data;

    if (user.picture) {
      return (
        <img
          src={user.picture}
          alt="User avatar"
          className="w-16 h-16 rounded-full"
        />
      );
    }

    const initials = user.name
      ? user.name.slice(0, 2).toUpperCase()
      : user.email.slice(0, 2).toUpperCase();

    return (
      <div className="w-10 h-10 flex items-center font-semibold justify-center rounded-full bg-blue-600 text-white">
        {initials}
      </div>
    );
  };

  const handleLogOut = async () => {
    try {
      const response = await isLoggedOut().unwrap();
      if (response.status === 200) {
        localStorage.clear();
        toast.success(response.message || "Logout successful!");
        navigate("/login");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.data?.message || "Something went wrong");
    }
  };
  const handleSwitchAccount = () => {
    navigate("/add-account");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "sessions", label: "Sessions", icon: Clock },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "delete", label: "Delete Account", icon: Trash2 },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin h-16 w-16 text-blue-600" />
      </div>
    );
  }

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
              {isMenuOpen ? <X size={24} /> : <MenuIcon className="text-blue-600" size={28} />}
            </button>
            <a href="/" className="text-2xl font-bold text-blue-600">
              SooraAuth
            </a>
          </div>

          {/* User Dropdown */}
          <div className="relative right-4">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
            >
              {displayImageOrInitials()}
            </button>
            {isUserDropdownOpen && userData?.data && (
              <UserDropdown
                isOpen={isUserDropdownOpen}
                userData={userData}
                handleLogOut={handleLogOut}
                onClose={() => setIsUserDropdownOpen(false)}
                displayImageOrInitials={displayImageOrInitials}
                handleSwitchAccount={handleSwitchAccount}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isMenuOpen ? "block" : "hidden"
          } min-h-screen lg:block fixed lg:relative left-0 w-64 bg-white border-r transform lg:transform-none lg:translate-x-0 transition-transform duration-200 ease-in-out z-20`}
        >
          <div className="flex flex-col h-full">
            <nav className="p-4 space-y-1 flex-grow">
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
            </nav>
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg mt-4"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-1 lg:p-4 w-full lg:ml-2">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              {userData?.data && (
                <TabContent activeTab={activeTab} userProfile={userData.data} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
