import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { EllipsisVertical, X } from "lucide-react";
import UserDropdown from "../auth/UserDropdown";
import { useGetUserQuery } from "../api/authAPI/authApiSlice";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Get token and email only once on mount and cache it
  const { token, email, isAuthenticated } = useMemo(() => {
    const token = localStorage.getItem("access_token");
    let email = null;
    
    if (token) {
      try {
        email = jwtDecode(token).email;
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }

    return {
      token,
      email,
      isAuthenticated: !!token
    };
  }, []); // Empty deps array means this only runs once on mount

  // Only fetch user data if we have an email
  const { data: userData } = useGetUserQuery(email, {
    // Skip the query if we don't have an email
    skip: !email,
    // Cache the result for 5 minutes
    refetchOnMountOrArgChange: 300
  });

  // Memoized handlers to prevent unnecessary re-renders
  const handleGetStarted = useCallback(() => {
    navigate("/login");
    setIsMenuOpen(false);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("access_token");
    navigate("/login");
  }, [navigate]);

  const handleSwitchAccount = useCallback(() => {
    navigate("/add-account");
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Memoized avatar display function
  const displayUserAvatar = useCallback((size = "w-10 h-10", fontSize = "text-base") => {
    if (!userData?.data) {
      return (
        <div className={`${size} flex items-center justify-center rounded-full bg-blue-600 text-white`}>
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
          className={`${size} rounded-full`}
        />
      );
    }

    const initials = user.name
      ? user.name.slice(0, 2).toUpperCase()
      : user.email.slice(0, 2).toUpperCase();

    return (
      <div className={`${size} flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold ${fontSize}`}>
        {initials}
      </div>
    );
  }, [userData]);

  // Memoized navigation links
  const navLinks = useMemo(() => [
    { href: "/features", text: "Features" },
    { href: "/pricing", text: "Pricing" },
    { href: "/contact", text: "Contact" },
  ], []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-md border-b">
      {/* Rest of the JSX remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/">
              <span className="text-2xl font-bold text-blue-600">
                SooraAuth
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900"
              >
                {link.text}
              </a>
            ))}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
                >
                  {displayUserAvatar()}
                </button>
                <UserDropdown
                  isOpen={isUserDropdownOpen}
                  userData={userData}
                  handleLogOut={handleLogout}
                  onClose={() => setIsUserDropdownOpen(false)}
                  displayImageOrInitials={() =>
                    displayUserAvatar("w-16 h-16", "text-3xl")
                  }
                  handleSwitchAccount={handleSwitchAccount}
                />
              </div>
            ) : (
              <button
                onClick={handleGetStarted}
                className="bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex flex-row">
            {isAuthenticated && (
              <div className="relative -right-4">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
                >
                  {displayUserAvatar()}
                </button>
                <div>
                  <UserDropdown
                    isOpen={isUserDropdownOpen}
                    userData={userData}
                    handleLogOut={handleLogout}
                    onClose={() => setIsUserDropdownOpen(false)}
                    displayImageOrInitials={() =>
                      displayUserAvatar("w-16 h-16", "text-3xl")
                    }
                    handleSwitchAccount={handleSwitchAccount}
                  />
                </div>
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-4 -right-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
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
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="min-h-screen px-2 pt-20 pb-3 space-y-1 bg-white border-b text-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md font-semibold text-3xl text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </a>
          ))}
          {!isAuthenticated && (
            <button
              onClick={handleGetStarted}
              className="w-full text-center px-3 py-4 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;