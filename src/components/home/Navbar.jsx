import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { EllipsisVertical, X } from 'lucide-react';
import UserDropdown from '../auth/UserDropdown';
import { useGetUserQuery } from '../api/authAPI/authApiSlice'; // Import the query hook
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State for UserDropdown visibility
  const navigate = useNavigate();

  // Fetch user data
  let email;
  try {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    email = decodedToken?.email;
  } catch (e) {
    console.error("Error decoding token:", e);
  }

  const { data: userData } = useGetUserQuery(email); // Fetch user data

  useEffect(() => {
    // Check authentication status whenever component mounts or updates
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  };

  const handleGetStarted = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleSwitchAccount = () => {
    navigate("/add-account")
  }
  const displayInitials = () => {
    if (!userData?.data) {
      return (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
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
          className="w-10 h-10 rounded-full"
        />
      );
    }

    const initials = user.name
      ? user.name.slice(0, 2).toUpperCase()
      : user.email.slice(0, 2).toUpperCase();

    return (
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
        {initials}
      </div>
    );
  };
  
  const displayImageOrInitials = () => {
    if (!userData?.data) {
      return (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
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
          className="w-10 h-10 rounded-full"
        />
      );
    }

    const initials = user.name
      ? user.name.slice(0, 2).toUpperCase()
      : user.email.slice(0, 2).toUpperCase();

    return (
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-3xl">
        {initials}
      </div>
    );
  };
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <a href='/'>
                <span className="text-2xl font-bold text-blue-600">SooraAuth</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              
              {isAuthenticated ? (
                <div className='relative'>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
                  >
                    {displayInitials()}
                  </button>
                  <UserDropdown
                    isOpen={isUserDropdownOpen}
                    userData={userData}
                    handleLogOut={handleLogout}
                    onClose={() => setIsUserDropdownOpen(false)}
                    displayImageOrInitials={displayImageOrInitials}
                    handleSwitchAccount={handleSwitchAccount}
                  />
                </div>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex flex-row">
            {isAuthenticated && (
                <div className='relative'>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
                  >
                    {displayInitials()}
                  </button>
                  <div className='right-10'>
                  <UserDropdown
                    isOpen={isUserDropdownOpen}
                    userData={userData}
                    handleLogOut={handleLogout}
                    onClose={() => setIsUserDropdownOpen(false)}
                    displayImageOrInitials={displayImageOrInitials}
                    handleSwitchAccount={handleSwitchAccount}
                  />
                  </div>
                </div>
              ) }
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  
                  <EllipsisVertical className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="min-h-screen px-2 pt-2 pb-3 space-y-1 bg-white border-b text-center">
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            {!isAuthenticated &&  (
              <button
                onClick={handleGetStarted}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;