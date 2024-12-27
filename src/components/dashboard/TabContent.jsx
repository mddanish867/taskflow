// TabContent.js
import React from "react";
import { Camera, Key, Smartphone, AlertTriangle } from "lucide-react";
import SettingForm from "./SettingForm";

export const TabContent = ({ activeTab, userProfile }) => {
  switch (activeTab) {
    case "profile":
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-8">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium">{userProfile.name}</h3>
              <p className="text-gray-500">Joined on Dec 25, 2024</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={userProfile.name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={userProfile.email}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="tel"
                value={userProfile.mobile}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      );

    case "sessions":
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-gray-500">
                    Windows • Chrome • New York, USA
                  </p>
                </div>
              </div>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((session) => (
              <div key={session} className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">iPhone 13</p>
                      <p className="text-sm text-gray-500">
                        iOS • Safari • London, UK
                      </p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700">
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "security":
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                {[
                  "Current Password",
                  "New Password",
                  "Confirm New Password",
                ].map((label) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="password"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-medium mb-4">
                Two-Factor Authentication
              </h3>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      );

    case "delete":
      return (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-red-600 font-medium">
                  Delete Your Account
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="DELETE"
              />
            </div>

            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      );
    case "settings":
      return <SettingForm />;

    default:
      return null;
  }
};
