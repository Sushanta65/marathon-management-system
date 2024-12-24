import React, { useEffect } from "react";

const Modal = () => {

// useEffect(() => {
//     fetch(`http://localhost:5600/marathonApplication/${id}`)
//     .then(res => res.json())
//     .then(data => console.log("idivitual", data))
// }, [])

  const handleUpdateMarathon = (e) => {
    e.preventDefault();
    console.log("hello");

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const additionalInfo = form.additionalInfo.value;

  };


  

  const handleClose = () => {
    const modal = document.getElementById("my_modal_4");
    modal.close();
  };

  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box w-11/12 max-w-5xl p-10">
        <h3 className="font-bold text-xl mb-6 text-center">
          Edit Marathon Application
        </h3>
        <form onSubmit={handleUpdateMarathon} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                readOnly
                className="input input-bordered w-full"
                placeholder="Marathon Title"
                required
              />
            </div>

            <div className="form-control">
              <label className="label text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                className="input input-bordered w-full"
                placeholder="Marathon Location"
                required
              />
            </div>

            <div className="form-control">
              <label className="label text-sm font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label text-sm font-medium">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                className="input input-bordered w-full"
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="form-control">
              <label className="label text-sm font-medium">
                Additional Info
              </label>
              <textarea
                name="additionalInfo"
                className="textarea textarea-bordered w-full"
                placeholder="Any additional information"
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label text-sm font-medium">Description</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                placeholder="Marathon Description"
                required
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label text-sm font-medium">Image URL</label>
              <input
                type="url"
                name="image"
                className="input input-bordered w-full"
                placeholder="Marathon Image URL"
                required
              />
            </div>
          </div>

          <div className="modal-action mt-6">
            <button type="submit" className="btn btn-primary py-2 px-6">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-error py-2 px-6"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
