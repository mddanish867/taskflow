import React from 'react'
import { Key } from "lucide-react";

const Security = () => {
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
  )
}

export default Security