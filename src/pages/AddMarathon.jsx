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
    const name = user?.displayName

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

    console.log(marathon);


    fetch('http://localhost:5600/marathons', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(marathon)

    })
    .then(res => res.json())
    .then(data => {
      form.reset()
      setRegStart(null)
      setRegEnd(null)
      setStartDate(null)
      if(data.insertedId){
        Swal.fire({
          title: "You Successfully Add a Marathon!",
          icon: "success",
          draggable: true
        });
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <Helmet>
        <title>Add Marathon</title>
      </Helmet>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
       
        <div className="bg-blue-500 text-white text-center py-4">
          <h2 className="text-3xl font-semibold">Add Marathon</h2>
          <p className="text-sm mt-1">Create an inspiring event for runners</p>
        </div>

        <form onSubmit={handleAddMarathon} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6 items-center">
            <label className="flex items-center space-x-2">
              <span className="text-blue-500">
                <FiType />
              </span>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                placeholder="Title"
                required
              />
            </label>

            <label className="flex items-center space-x-2">
              <span className="text-blue-500">
                <FiCalendar />
              </span>
              <DatePicker
                selected={regStart}
                onChange={(date) => setRegStart(date)}
                className="input input-bordered w-full"
                placeholderText="Registration Start Date"
                required
              />
            </label>

            <label className="flex items-center space-x-2">
              <span className="text-blue-500">
                <FiCalendar />
              </span>
              <DatePicker
                selected={regEnd}
                onChange={(date) => setRegEnd(date)}
                className="input input-bordered w-full"
                placeholderText="Registration End Date"
                required
              />
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-blue-500">
                <FiClock />
              </span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="input input-bordered w-full"
                placeholderText="Marathon Start Date and Time"
                required
              />
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-blue-500">
                <FiMapPin />
              </span>
              <input
                type="text"
                name="location"
                className="input input-bordered w-full"
                placeholder="Location"
                required
              />
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-blue-500">
                <FiType />
              </span>
              <select
                name="distance"
                className="input input-bordered w-full"
                placeholder="Distance (e.g., 5 km)"
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
            <label className="flex items-center space-x-2 col-span-2">
              <span className="text-blue-500">
                <FiFileText />
              </span>
              <textarea
                name="desc"
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                required
              ></textarea>
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-blue-500">
                <FiImage />
              </span>
              <input
                type="url"
                name="image"
                className="input input-bordered w-full"
                placeholder="Image URL"
                required
              />
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-blue-500">
                <FiUser />
              </span>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                className="input input-bordered w-full"
                readOnly
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary px-8">Add Marathon</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarathon;
