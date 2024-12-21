import useAuth from "../custom_hook/useAuth";

const LoginPage = () => {

const {userLogin, setUser} = useAuth()

const handleLogin = (e) => {
  e.preventDefault()
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;
  userLogin(email, password)
  .then(data => {
    setUser(data.user)
  })
  .catch(err => {
    console.log(err.message)
  })
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
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
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
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
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center">
          <button className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 ease-in-out mt-4">
            Login with Google
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
