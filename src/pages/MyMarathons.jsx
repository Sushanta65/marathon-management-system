import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../custom_hook/useAuth";
import { Helmet } from "react-helmet";

const MyMarathons = () => {
  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetch(
      `http://localhost:5600/marathons?sort=${sortOrder}&email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setMarathons(data))
      .catch((err) => console.error(err));
  }, [sortOrder, user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This marathon will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5600/marathons/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMarathons((prev) =>
                prev.filter((marathon) => marathon._id !== id)
              );
              Swal.fire(
                "Deleted!",
                "Your marathon has been deleted.",
                "success"
              );
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const handleEdit = (marathon) => {
    setSelectedMarathon(marathon);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const location = form.location.value;
    const startDate = form.startDate.value;
    const distance = form.distance.value;
    const description = form.description.value;
    const regStart = form.regStart.value;
    const regEnd = form.regEnd.value;
    const image = form.image.value;

    const updatedMarathon = {
      title,
      location,
      startDate,
      distance,
      description,
      regStart,
      regEnd,
      image,
    };

    fetch(`http://localhost:5600/marathons/${selectedMarathon._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMarathon),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          //ChatGPT helped me to do that
          setMarathons((prevMarathon) =>
            prevMarathon.map((marathon) =>
              marathon._id === selectedMarathon._id
                ? { ...marathon, ...updatedMarathon }
                : marathon
            )
          );
          Swal.fire(
            "Marathon Updated!",
            "Your marathon has been updeted.",
            "success"
          );
          setIsModalOpen(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>My Marathons</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6">
        My Created Marathons
      </h2>
      <div className="sort-controls flex items-center space-x-4 mb-6 ">
        <label htmlFor="sortOrder" className="text-gray-700 font-semibold">
          Sort By:
        </label>
        <select
          onChange={handleSortChange}
          className="bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 px-4 py-2 transition duration-200 hover:bg-gray-100"
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200 shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {marathons.length > 0 ? (
              marathons.map((marathon, index) => (
                <tr key={marathon._id} className="hover:bg-blue-50">
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4">{marathon.title}</td>
                  <td className="py-3 px-4">{marathon.location}</td>
                  <td className="py-3 px-4">
                    {new Date(marathon.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-4">
                    <button
                      onClick={() => handleEdit(marathon)}
                      className="btn btn-sm btn-info flex items-center gap-1 text-white"
                    >
                      <FaEdit /> Update
                    </button>

                    <button
                      onClick={() => handleDelete(marathon._id)}
                      className="btn btn-sm btn-error flex items-center gap-1 text-white"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-6 text-lg"
                >
                  No marathons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedMarathon && (
        <dialog open className="modal">
          <div className="modal-box max-w-4xl p-6">
            <h3 className="font-bold text-xl text-center mb-6 text-blue-600">
              Update Marathon
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <label>
                  Title
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedMarathon.title}
                    className="input input-bordered w-full"
                    placeholder="Title"
                    required
                  />
                </label>

                <label>
                  Location
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedMarathon.location}
                    className="input input-bordered w-full"
                    placeholder="Location"
                    required
                  />
                </label>
                <label>
                  Registration Start
                  <input
                    type="date"
                    name="regStart"
                    defaultValue={
                      new Date(selectedMarathon.regStart)
                        .toISOString()
                        .split("T")[0]
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                <label>
                  Registration End
                  <input
                    type="date"
                    name="regEnd"
                    defaultValue={
                      new Date(selectedMarathon.regEnd)
                        .toISOString()
                        .split("T")[0]
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                <label>
                  Marathon Start
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={
                      new Date(selectedMarathon.startDate)
                        .toISOString()
                        .split("T")[0]
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                <label>
                  Distance
                  <select
                    name="distance"
                    className="input input-bordered w-full"
                    defaultValue={selectedMarathon.distance}
                    required
                  >
                    <option value="3k">3k</option>
                    <option value="5k">5k</option>
                    <option value="10k">10k</option>
                    <option value="15k">15k</option>
                    <option value="25k">25k</option>
                  </select>
                </label>

                <label>
                  {" "}
                  Description
                  <textarea
                    name="description"
                    defaultValue={selectedMarathon.description}
                    className="textarea textarea-bordered w-full"
                    placeholder="Description"
                    required
                  ></textarea>
                </label>

                <label>
                  Image URL
                  <input
                    type="url"
                    name="image"
                    defaultValue={selectedMarathon.image}
                    className="input input-bordered w-full"
                    placeholder="Image URL"
                    required
                  />
                </label>
              </div>

              <div className="modal-action flex justify-end mt-6">
                <button type="submit" className="btn btn-primary px-6">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-error px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyMarathons;
