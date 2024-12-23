import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../custom_hook/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const MyApply = () => {
  const { user } = useAuth();
  const [appliedMarathon, setAppliedMarathon] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5600/marathonApplication?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setAppliedMarathon(data));
  }, [user.email]);


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure want to delete!?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5600/marathonApplication/${id}`, {
            method: "DELETE",
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
                const remainingMarathon = appliedMarathon.filter(
                    (marathon) => marathon._id !== id
                  );
                  setAppliedMarathon(remainingMarathon);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  // Handle Update
  const handleUpdate = () => {};

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        My Applied Marathons
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
            {appliedMarathon.length > 0 ? (
              appliedMarathon.map((marathon, index) => (
                <tr key={marathon._id} className="hover:bg-blue-50">
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4">{marathon.title}</td>
                  <td className="py-3 px-4">{marathon.location}</td>
                  <td className="py-3 px-4">
                    {new Date(marathon.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-4">
                    <button
                      onClick={() => handleUpdate(marathon._id)}
                      className="btn btn-sm btn-info flex items-center gap-1 text-white "
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(marathon._id)}
                      className="btn btn-sm btn-error text-white flex gap-1 items-center "
                    >
                      <FaTrash />
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

export default MyApply;
