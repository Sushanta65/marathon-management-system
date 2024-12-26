import { updateProfile } from "firebase/auth";
import useAuth from "../custom_hook/useAuth";
import { auth } from "../firebase/firebase.init";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// RegisterForm.jsx
const Register = () => {
  const {userRegistration, signInWithGoogle, setUser, user, setError, error} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoURL.value;
    console.log({name, email, password, photoUrl})

    userRegistration(email, password)
    .then(data => {
      console.log(data)
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl
      })
      .then(() => {
        setUser(data.user)
        navigate('/')
      })
      .catch(err => setError(err.message))
      
    })
    .catch(err => {
      setError(err.message)
    })
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle(navigate)
  }
console.log(user);
console.log(error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>

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
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your photo URL"
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
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <p className="text-red-600">{error && error === 'short-password'? 'Password Must Be at Least 6 Characters Long':''}</p>
          </div>
          <div>
            <p className="text-red-600">{error && error === 'easy-password'? 'The password must including at least one uppercase and one lowercase letter':''}</p>
          </div>
          <div>
            <p className="text-red-600">{error && error === 'Firebase: Error (auth/email-already-in-use).'? 'This Email is Used in Another Account.':''}</p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Register
            </button>
            <button onClick={handleGoogleSignIn} className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 ease-in-out mt-4">
            Login with Google
          </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
