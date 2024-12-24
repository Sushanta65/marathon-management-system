import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../custom_hook/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const MyApply = () => {
  const { user } = useAuth();
  const [appliedMarathon, setAppliedMarathon] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarathon, setSelectedMarathon] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5600/marathonApplication?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setAppliedMarathon(data));
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are You Sure Want To Delete?",
      text: "The Application Will Delete Parmanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5600/marathonApplication/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remainingMarathon = appliedMarathon.filter(
                (marathon) => marathon._id !== id
              );
              setAppliedMarathon(remainingMarathon);
              Swal.fire("Deleted!", "The Application Has Been Deleted!.", "success");
            }
          });
      }
    });
  };

  const handleEdit = (marathon) => {
    setSelectedMarathon(marathon);
    setIsModalOpen(true);
  };

  const handleUpdateMarathon = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const startDate = form.startDate.value;
    const location = form.location.value;
    const description = form.description.value;
    const additionalInfo = form.additionalInfo.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const image = form.image.value;
    const updateAbleData = {
      firstName,
      lastName,
      title,
      startDate,
      phoneNumber,
      location,
      description,
      additionalInfo,
      image,
    };

    fetch(`http://localhost:5600/marathonApplication/${selectedMarathon._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateAbleData),
    })
      .then((res) => {
        if (res.status === 200) {
          // I don't get any confirm (modifiedCount) message after updated. Thats why I do like that.
          Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true,
          });
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        My Applied Marathons
      </h2>
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
                      onClick={() => handleEdit(marathon)}
                      className="btn btn-sm btn-info flex items-center gap-1 text-white"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(marathon._id)}
                      className="btn btn-sm btn-error text-white flex gap-1 items-center"
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

      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-xl mb-6 text-center">
              Edit Marathon Application
            </h3>
            <form onSubmit={handleUpdateMarathon} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedMarathon?.title}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={
                      new Date(selectedMarathon?.startDate)
                        .toISOString()
                        .split("T")[0] //ChatGPT Helped Me to do that.
                    }
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={selectedMarathon?.firstName}
                    className="input input-bordered w-full"
                    placeholder="firstName"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={selectedMarathon?.lastName}
                    className="input input-bordered w-full"
                    placeholder="Last Name"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedMarathon?.location}
                    className="input input-bordered w-full"
                    placeholder="Marathon Location"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Phone Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    defaultValue={selectedMarathon?.phoneNumber}
                    className="input input-bordered w-full"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedMarathon?.description}
                    className="textarea textarea-bordered w-full"
                    placeholder="Marathon Description"
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label font-medium">Additional Info</label>
                  <textarea
                    name="additionalInfo"
                    defaultValue={selectedMarathon?.additionalInfo}
                    className="textarea textarea-bordered w-full"
                    placeholder="Any additional information"
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label font-medium">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    defaultValue={selectedMarathon?.image}
                    className="input input-bordered w-full"
                    placeholder="Marathon Image URL"
                  />
                </div>
              </div>

              <div className="modal-action justify-end">
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

export default MyApply;
