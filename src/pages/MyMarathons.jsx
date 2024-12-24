import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../custom_hook/useAuth";

const MyMarathons = () => {
  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);

  // Fetch marathons created by the logged-in user
  useEffect(() => {
    fetch(`http://localhost:5600/marathons?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMarathons(data);
      })
      .catch((err) => console.log(err));
  }, [user.email]);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are You Sure Want To Delete?",
      text: "This Marathon Will be Deleted Permanently!",
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
              const remainingMarathons = marathons.filter(
                (marathon) => marathon._id !== id
              );
              setMarathons(remainingMarathons);
              Swal.fire("Deleted!", "Your Marathon Has Been Deleted.", "success");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // Handle Update (Placeholder)
  const handleUpdate = (id) => {
    console.log(`Update marathon with ID: ${id}`);
    Swal.fire("Update feature coming soon!", "", "info");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        My Created Marathons
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200 shadow-lg">
          {/* Table Header */}
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
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
                    {/* Update Button */}
                    <button
                      onClick={() => handleUpdate(marathon._id)}
                      className="btn btn-sm btn-info flex items-center gap-1 text-white"
                    >
                      <FaEdit /> Update
                    </button>
                    {/* Delete Button */}
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
    </div>
  );
};

export default MyMarathons;
