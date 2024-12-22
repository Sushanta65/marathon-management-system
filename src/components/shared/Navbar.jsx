import { NavLink } from "react-router-dom";
import useAuth from "../../custom_hook/useAuth";

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const handleLogout = () => {
    userLogout()
  }
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/marathons">Marathons</NavLink>
      </li>
      
      {user?.email ? (
        <>
        <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
         
        </>
      )}
       <li>
            <span>{user?.displayName}</span>
          </li>
    </>
  );
  return (
    <div className="bg-gray-300">
      <div className="navbar w-4/5 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Marathon Management</a>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
