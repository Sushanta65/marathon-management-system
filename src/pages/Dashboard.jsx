import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../custom_hook/useAuth";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuth()

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/dashboard/addMarathon");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen mt-5">
      <header className="bg-white border-b shadow-sm p-4 flex items-center justify-between md:justify-start">
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Sidebar open and close toggle
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1 className="text-xl font-bold ml-4">Marathon Dashboard - <span className="text-cyan-700">Hi, {user.displayName}!</span></h1>
      </header>

      <div className="flex flex-grow">
        <aside
          className={`fixed z-40 top-0 left-0 h-full bg-cyan-700 text-white transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:transform-none md:relative md:translate-x-0 transition-transform duration-300 w-64`}
        >
          <div className="p-4 text-2xl font-bold border-b border-gray-700 text-center">
            Dashboard
          </div>
          <nav className="flex-grow mt-4 space-y-3 px-4">
            <NavLink
              to="/dashboard/addMarathon"
              className={({ isActive }) =>
                `block py-2 px-4 rounded transition  ${
                  isActive ? "bg-cyan-900 text-white" : "hover:bg-cyan-900"
                }`
              }
            >
              Add Marathon
            </NavLink>
            <NavLink
              to="/dashboard/myMarathons"
              className={({ isActive }) =>
                `block py-2 px-4 rounded transition ${
                  isActive ? "bg-cyan-900 text-white" : "hover:bg-cyan-900"
                }`
              }
            >
              My Marathon List
            </NavLink>
            <NavLink
              to="/dashboard/myApply"
              className={({ isActive }) =>
                `block py-2 px-4 rounded transition ${
                  isActive ? "bg-cyan-900 text-white" : "hover:bg-cyan-900"
                }`
              }
            >
              My Apply List
            </NavLink>
          </nav>
        </aside>

        <main className="flex-grow bg-gray-100 p-6">
          <div>
            <Outlet></Outlet>
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
