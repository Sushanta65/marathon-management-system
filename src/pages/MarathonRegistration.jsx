import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../custom_hook/useAuth";

const MarathonRegistration = () => {
  const marathon = useLoaderData();
    const {user} = useAuth()
  const { _id, title, startDate, location, image, description } = marathon;

  const handleRegistration = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const additionalInfo = form.additionalInfo.value;

    const marathonApplication = {
      title,
      startDate,
      location,
      image,
      description,
      firstName,
      lastName,
      phoneNumber,
      additionalInfo,
      email: user.email
    };

    axios
      .post("http://localhost:5600/marathonApplication", marathonApplication)
      .then((res) => {
        
        fetch(`http://localhost:5600/marathons/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(marathon)
        })
        if(res.data.insertedId){
            Swal.fire({
                title: "Registration Successfull!",
                icon: "success",
                draggable: true
              });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-72 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-3xl font-semibold text-white">{title}</h1>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Registration Form
          </h2>
          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Marathon Title
                </label>
                <input
                  type="text"
                  value={title}
                  readOnly
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Start Date
                </label>
                <input
                  type="text"
                  value={new Date(startDate).toLocaleDateString()}
                  readOnly
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Contact Number
                </label>
                <input
                  type="number"
                  placeholder="Contact Number"
                  name="phoneNumber"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={user?.email}
                  readOnly
                  name="email"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Additional Info
              </label>
              <textarea
                placeholder="Any additional information"
                name="additionalInfo"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md text-gray-700"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarathonRegistration;
