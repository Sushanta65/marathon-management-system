import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../custom_hook/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Login = () => {
  const { userLogin, setUser, signInWithGoogle, setError, error, user } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (user?.email) {
    navigate("/");
  }

  const handleLogin = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogin(email, password)
      .then((data) => {
        setUser(data.user);
        Swal.fire({
          position: "middle-center",
          icon: "success",
          title: "Login Successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(navigate);
  };
  console.log(error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <div>
              <p className="text-red-600 mb-3">
                {error && error === "Firebase: Error (auth/invalid-credential)."
                  ? "User Not Found! Email or Password Invalid."
                  : ""}
              </p>
            </div>
            <div className="pb-4">
              <a
                href="#"
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-700 text-white font-semibold rounded-lg hover:bg-cyan-800 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-cyan-700 text-white font-semibold rounded-lg hover:bg-cyan-800 transition duration-300 ease-in-out mt-4"
          >
            Login with Google
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-700 hover:text-cyan-800 font-semibold"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
