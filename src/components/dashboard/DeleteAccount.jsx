import React from 'react'
import { AlertTriangle } from "lucide-react";

const DeleteAccount = () => {
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
              Confirm your email
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
              Enter your password
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
              Reason for leaving (optional)
              </label>
              <textarea
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us why you're deleting your account"
              />
            </div>
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
            Permanently Delete Account
            </button>
          </div>
        </div>
  )
}

export default DeleteAccount