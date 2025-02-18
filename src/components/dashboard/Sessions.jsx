// import React from 'react'
// import { Smartphone } from "lucide-react";
// import {
//   useGetSessionsQuery,  
// } from "../api/authAPI/authApiSlice";
// import { toast } from "../helper/toast";
//   const { data: userData, isLoading } = useGetSessionsQuery('');
//   console.log(userData)

// const Sessions = () => {
//   return (
//     <div className="space-y-6">
//           <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <Smartphone className="h-5 w-5 text-blue-500" />
//                 <div>
//                   <p className="font-medium">Current Session</p>
//                   <p className="text-sm text-gray-500">
//                     Windows • Chrome • New York, USA
//                   </p>
//                 </div>
//               </div>
//               <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
//                 Active
//               </span>
//             </div>
//           </div>

//           <div className="space-y-4">
//             {[1, 2, 3].map((session) => (
//               <div key={session} className="border rounded-md p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Smartphone className="h-5 w-5 text-gray-400" />
//                     <div>
//                       <p className="font-medium">iPhone 13</p>
//                       <p className="text-sm text-gray-500">
//                         iOS • Safari • London, UK
//                       </p>
//                     </div>
//                   </div>
//                   <button className="text-red-600 hover:text-red-700">
//                     Revoke
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//   )
// }

// export default Sessions

import React from 'react';
import { Smartphone } from "lucide-react";
import { useGetSessionsQuery } from "../api/authAPI/authApiSlice";
import { toast } from "../helper/toast";
const Sessions = () => {
  const { data: sessionData, isLoading, error } = useGetSessionsQuery('');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-24 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-24 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      toast.error("An error occured!")
    );
  }

  // Function to format session information
  const formatSessionInfo = (session) => {
    const device = session.device || 'Unknown Device';
    const browser = session.browser || 'Unknown Browser';
    const location = session.location || 'Unknown Location';
    return `${device} • ${browser} • ${location}`;
  };

  // Find current active session
  const currentSession = sessionData?.sessions?.find(session => session.isCurrent);
  const otherSessions = sessionData?.sessions?.filter(session => !session.isCurrent) || [];

  return (
    <div className="space-y-6">
      {/* Current Session */}
      {currentSession && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-gray-500">
                  {formatSessionInfo(currentSession)}
                </p>
              </div>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
        </div>
      )}

      {/* Other Sessions */}
      <div className="space-y-4">
        {otherSessions.map((session) => (
          <div key={session.id} className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{session.device || 'Unknown Device'}</p>
                  <p className="text-sm text-gray-500">
                    {formatSessionInfo(session)}
                  </p>
                </div>
              </div>
              <button 
                className="text-red-600 hover:text-red-700 transition-colors"
                onClick={() => handleRevokeSession(session.id)}
              >
                Revoke
              </button>
            </div>
          </div>
        ))}

        {otherSessions.length === 0 && (
          <p className="text-center text-gray-500">No other active sessions</p>
        )}
      </div>
    </div>
  );
};

export default Sessions;