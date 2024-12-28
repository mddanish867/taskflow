import React from 'react'
import { Camera } from "lucide-react";

const Profile = ({userProfile}) => {
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
  )
}

export default Profile