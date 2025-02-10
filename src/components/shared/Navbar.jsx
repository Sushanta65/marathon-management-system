import { NavLink } from "react-router-dom";
import useAuth from "../../custom_hook/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { user, userLogout } = useAuth();

  const handleLogout = () => {
    userLogout();
  };

  const links = (
    <>
      <li>
        <NavLink to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/marathons">
          Marathons
        </NavLink>
      </li>
      {user?.email ? (
        <>
          <li>
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>
              Logout
            </button>
          </li>
          <li>
            <div className="avatar">
              <div className="w-6 rounded-full ring ring-teal-500 ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} alt="User Avatar" />
              </div>
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login" className="hover:text-teal-400">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className="hover:text-teal-400">
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="shadow-md bg-cyan-700 text-white fixed top-0 right-0 left-0 w-full z-50">
      <div className="w-5/6 mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-white z-[10] mt-3 w-52 rounded-box shadow"
            >
              {links}
            </ul>
          </div>
          <NavLink to="/" className="text-xl font-bold text-white">
            Marathon Management
          </NavLink>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal space-x-4">{links} </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;