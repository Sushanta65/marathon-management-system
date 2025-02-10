import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../custom_hook/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    userLogout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar bg-green-600 text-white shadow-lg fixed top-0 right-0 left-0 z-50">
      <div className="w-4/5 mx-auto px-4">
        <div className="flex-1">
          <NavLink to="/" className="normal-case text-xl font-bold">
            Marathon Management
          </NavLink>
        </div>
        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li className="mr-4 text-white">
              <NavLink
                to="/"
                className={`font-medium text-gray-800 hover:text-blue-500 transition duration-300 ${
                  location.pathname === "/" ? "text-blue-500" : ""
                }`}
              >
                Home
              </NavLink>
            </li>
            <li className="mr-4">
              <NavLink
                to="/marathons"
                className={`font-medium text-gray-800 hover:text-gray-500 transition duration-300 ${
                  location.pathname === "/marathons" ? "text-gray-200" : ""
                }`}
              >
                Marathons
              </NavLink>
            </li>
            {user?.email ? ( // Correct conditional rendering
              <>
                <li className="mr-4">
                  <NavLink
                    to="/dashboard"
                    className={`font-medium text-gray-800 hover:text-blue-500 transition duration-300 ${
                      location.pathname === "/dashboard" ? "text-blue-500" : ""
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-medium text-gray-800 hover:text-blue-500 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
                <li className="ml-4">
                  <div className="avatar">
                    <div className="w-5 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                      <img src={user.photoURL} alt="User Avatar" />
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="mr-4">
                  <NavLink
                    to="/login"
                    className={`font-medium text-gray-800 hover:text-blue-500 transition duration-300 ${
                      location.pathname === "/login" ? "text-blue-500" : ""
                    }`}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={`font-medium text-gray-800 hover:text-blue-500 transition duration-300 ${
                      location.pathname === "/register" ? "text-blue-500" : ""
                    }`}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* ... Mobile Menu (same as before) */}
      </div>
    </div>
  );
};

export default Navbar;