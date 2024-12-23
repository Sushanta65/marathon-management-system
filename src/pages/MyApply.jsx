import { useEffect, useState } from "react";
import useAuth from "../custom_hook/useAuth";

const MyApply = () => {
  const { user } = useAuth();
  const [appliedMarathon, setAppliedMarathon] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5600/marathonApplication?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setAppliedMarathon(data));
  }, [user.email]);

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
              <th className="py-3 px-4">Additional Info</th>
              <th className="py-3 px-4">Phone</th>
            </tr>
          </thead>

          
          <tbody>
            {appliedMarathon.length > 0 ? (
              appliedMarathon.map((marathon, index) => (
                <tr
                  key={marathon._id}
                  className="hover:bg-blue-50"
                >
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4">{marathon.title}</td>
                  <td className="py-3 px-4">{marathon.location}</td>
                  <td className="py-3 px-4">{new Date(marathon.startDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{marathon.additionalInfo || "N/A"}</td>
                  <td className="py-3 px-4">{marathon.phoneNumber ||"N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
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
