import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllMarathons = () => {
  const [marathons, setMarathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5600/allMarathon")
      .then((res) => res.json())
      .then((data) => setMarathons(data))
      .catch((err) => console.error("Error fetching marathons:", err));
  }, []);

  return (
    <div className="w-4/5 mx-auto p-6 my-10">
      <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-center mb-2">
        Explore Marathons
      </h2>
      <p>Populer Marathons, You Can Explore Now</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((marathon) => (
          <div
            key={marathon._id}
            className="border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 overflow-hidden"
          >
            
            <div className="h-48 overflow-hidden">
              <img
                src={marathon.image}
                alt={marathon.title}
                className="w-full h-full object-cover"
              />
            </div>

            
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{marathon.title}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Location:</span>{" "}
                {marathon.location}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Registration:</span>{" "}
                {new Date(marathon.regStart).toLocaleDateString()} -{" "}
                {new Date(marathon.regEnd).toLocaleDateString()}
              </p>
              <button
                className="mt-4 btn btn-primary w-full"
                onClick={() => navigate(`/marathons/${marathon._id}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMarathons;
