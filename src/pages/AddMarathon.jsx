import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiFileText,
  FiImage,
  FiMapPin,
  FiType,
  FiUser,
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../custom_hook/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddMarathon = () => {
  const { user } = useAuth();

  const [regStart, setRegStart] = useState();
  const [regEnd, setRegEnd] = useState();
  const [startDate, setStartDate] = useState();

  const handleAddMarathon = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const location = form.location.value;
    const distance = form.distance.value;
    const description = form.desc.value;
    const image = form.image.value;
    const email = user?.email;
    const name = user?.displayName;

    const marathon = {
      title,
      regStart,
      regEnd,
      startDate,
      location,
      distance,
      description,
      image,
      name,
      email,
      createdAt: new Date().toISOString(),
      regCount: 0,
    };

    fetch("https://marathon-management-system-server.vercel.app/marathons", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(marathon),
    })
      .then((res) => res.json())
      .then((data) => {
        form.reset();
        setRegStart(null);
        setRegEnd(null);
        setStartDate(null);
        if (data.insertedId) {
          Swal.fire({
            title: "You Successfully Added a Marathon!",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-start mt-5  bg-gray-100">
      <Helmet>
        <title>Add Marathon</title>
      </Helmet>

      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-md bg-opacity-90 border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-cyan-700">Add Marathon</h2>
          <p className="text-gray-500">Create an exciting event for runners</p>
        </div>

        <form onSubmit={handleAddMarathon} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200">
              <FiType className="text-cyan-700 mr-2" />
              <input
                type="text"
                name="title"
                className="w-full outline-none bg-transparent"
                placeholder="Title"
                required
              />
            </label>

            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200">
              <FiMapPin className="text-cyan-700 mr-2" />
              <input
                type="text"
                name="location"
                className="w-full outline-none bg-transparent"
                placeholder="Location"
                required
              />
            </label>

            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200">
              <FiCalendar className="text-cyan-700 mr-2" />
              <DatePicker
                selected={regStart}
                onChange={(date) => setRegStart(date)}
                className="w-full outline-none bg-transparent"
                placeholderText="Registration Start Date"
                dateFormat="dd MMM yyyy"
                required
              />
            </label>

            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200">
              <FiCalendar className="text-cyan-700 mr-2" />
              <DatePicker
                selected={regEnd}
                onChange={(date) => setRegEnd(date)}
                className="w-full outline-none bg-transparent"
                placeholderText="Registration End Date"
                dateFormat="dd MMM yyyy"
                required
              />
            </label>

            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200">
              <FiClock className="text-cyan-700 mr-2" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full outline-none bg-transparent"
                placeholderText="Marathon Start Date and Time"
                dateFormat="dd MMM yyyy"
                required
              />
            </label>

            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200">
              <FiType className="text-cyan-700 mr-2" />
              <select
                name="distance"
                className="w-full outline-none bg-transparent"
                required
              >
                <option>Select Distance</option>
                <option>3k</option>
                <option>5k</option>
                <option>10k</option>
                <option>15k</option>
                <option>25k</option>
              </select>
            </label>

            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200 col-span-2">
              <FiFileText className="text-cyan-700 mr-2" />
              <textarea
                name="desc"
                className="w-full outline-none bg-transparent"
                placeholder="Description"
                required
              ></textarea>
            </label>

            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200">
              <FiImage className="text-cyan-700 mr-2" />
              <input
                type="url"
                name="image"
                className="w-full outline-none bg-transparent"
                placeholder="Image URL"
                required
              />
            </label>

            <label className="flex items-center bg-white shadow p-3 rounded-lg border border-gray-200">
              <FiUser className="text-cyan-700 mr-2" />
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                className="w-full outline-none bg-gray-100"
                readOnly
              />
            </label>
          </div>

          <div className="flex justify-center mt-6">
            <button className="w-full bg-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-cyan-700 transition duration-300">
              Add Marathon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarathon;
