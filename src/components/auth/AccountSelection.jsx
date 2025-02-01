import React from 'react';
import { LogOut, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccountSelection = ({ userData, handleLogOut }) => {
  const displayInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'MA';
  };

  const AddnewAccount = () => {
    navigate("/login")
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Atlas Logo */}
        <div className="flex justify-center mb-8">
          <h1 
            className="text-2xl font-bold text-blue-600" 
            
          >
           SooraAuth
          </h1>
        </div>

        <h1 className="text-xl font-semibold text-center mb-8">
          Choose or add another account
        </h1>

        {/* Current User */}
        <div className="mb-4">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {displayInitials(userData?.name)}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">{userData?.name || 'Md Danish Akhtar'}</div>
              <div className="text-sm text-gray-500">{userData?.email || 'mddanish867@gmail.com'}</div>
            </div>
          </button>
        </div>

        {/* Add Account Button */}
        <div className="border-t border-b py-4 my-4">
          <button onClick={AddnewAccount} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400">
              <UserPlus size={24} />
            </div>
            <div className="flex-1 text-left font-medium">
              Add another account
            </div>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogOut}
          className="w-full flex items-center justify-center gap-2 text-blue-600 p-3 hover:underline"
        >
          Log out
        </button>

        {/* Footer */}
        <div className="mt-8 text-center">
          SooraAuth
          <p className="text-sm text-gray-600">
            One account for Trello, Jira, Confluence and{' '}
            <Link to="#" className="text-blue-600 hover:underline">
              more
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSelection;