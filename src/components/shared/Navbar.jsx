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
        <NavLink to="/" className="hover:text-blue-500">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/marathons" className="hover:text-blue-500">
          Marathons
        </NavLink>
      </li>
      {user?.email ? (
        <>
          <li>
            <NavLink to="/dashboard" className="hover:text-blue-500">
              Dashboard
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="hover:text-blue-500">
              Logout
            </button>
          </li>
          <li>
            <div className="avatar">
              <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} alt="User Avatar" />
              </div>
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login" className="hover:text-blue-500">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className="hover:text-blue-500">
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className=" shadow-md ">
      <div className="navbar bg-white border-b fixed top-0 right-0 left-0 mx-auto z-50 px-4">
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
              className="menu menu-sm dropdown-content bg-base-100 z-[10] mt-3 w-52 rounded-box shadow"
            >
              {links}
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost text-xl font-bold">
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
