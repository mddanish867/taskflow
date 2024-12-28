import React from 'react'
import { Smartphone } from "lucide-react";

const Sessions = () => {
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
  )
}

export default Sessions