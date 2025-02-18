import React, { useState } from 'react';
import { Smartphone, ScreenShare } from "lucide-react";
import { useGetSessionsQuery, useRevokeSessionMutation } from "../api/authAPI/authApiSlice";
import { toast } from "../helper/toast";

const Sessions = () => {
  const { data: sessionData, isLoading, error } = useGetSessionsQuery('');
  const [revokeSession] = useRevokeSessionMutation();
  const [revokingIds, setRevokingIds] = useState(new Set());

  const handleRevokeSession = async (sessionId) => {
    try {
      setRevokingIds(prev => new Set(prev).add(sessionId));
      await revokeSession(sessionId).unwrap();
      toast.success('Session revoked successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to revoke session');
    } finally {
      setRevokingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(sessionId);
        return newSet;
      });
    }
  };

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
    toast.error("An error occurred!");
    return null;
  }

  const formatSessionInfo = (session) => {
    const device = session?.device || 'Unknown Device';
    const browser = session?.browser || 'Unknown Browser';
    const location = session?.location || 'Unknown Location';
    return `${device} • ${browser} • ${location}`;
  };

  const activeSessions = sessionData?.sessions?.filter(session => session.isActive) || [];
  const inactiveSessions = sessionData?.sessions?.filter(session => !session.isActive) || [];

  return (
    <div className="space-y-6">
      {/* Active Sessions Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div key={session.id} className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {session.device === 'Windows' 
                    ? <ScreenShare className="h-5 w-5 text-blue-500" /> 
                    : <Smartphone className="h-5 w-5 text-blue-500" />
                  }
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-gray-500">
                      {formatSessionInfo(session)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                  <button 
                    className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                    onClick={() => handleRevokeSession(session.id)}
                    disabled={revokingIds.has(session.id)}
                  >
                    {revokingIds.has(session.id) ? 'Revoking...' : 'Revoke'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {activeSessions.length === 0 && (
            <p className="text-center text-gray-500">No active sessions</p>
          )}
        </div>
      </div>

      {/* Inactive Sessions Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Inactive Sessions</h3>
        <div className="space-y-4">
          {inactiveSessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {session.device === 'Windows' 
                    ? <ScreenShare className="h-5 w-5 text-gray-400" /> 
                    : <Smartphone className="h-5 w-5 text-gray-400" />
                  }
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-gray-500">
                      {formatSessionInfo(session)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  Inactive
                </span>
              </div>
            </div>
          ))}
          {inactiveSessions.length === 0 && (
            <p className="text-center text-gray-500">No inactive sessions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sessions;