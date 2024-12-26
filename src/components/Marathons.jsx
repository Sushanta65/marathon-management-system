import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AllMarathons = () => {
  const [marathons, setMarathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5600/allMarathon")
      .then((res) => res.json())
      .then((data) => setMarathons(data))
      .catch((err) => console.error("Error fetching marathons:", err));
  }, []);

  // ChatGpt Halped Me to Do That
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="w-full lg:w-4/5 mx-auto p-6 my-10 pt-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-2 text-gray-800">
          Explore Marathons
        </h2>
        <p className="text-gray-600 text-lg">
          Popular Marathons You Can Explore Now
        </p>
      </div>

      {marathons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {marathons.map((marathon) => (
            <div
              key={marathon._id}
              className="border rounded-lg shadow-md bg-white transform hover:-translate-y-2 transition duration-300 flex flex-col justify-between"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={marathon.image}
                  alt={marathon.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {marathon.title}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold text-blue-600">Location:</span>{" "}
                  {marathon.location}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold text-blue-600">
                    Registration:
                  </span>{" "}
                  {formatDate(marathon.regStart)} -{" "}
                  {formatDate(marathon.regEnd)}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold text-blue-600">Distance:</span>{" "}
                  {marathon.distance}
                </p>
              </div>

              <div className="p-5 mt-auto flex flex-col justify-end">
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => navigate(`/marathons/${marathon._id}`)}
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AllMarathons;
