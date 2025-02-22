import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AllMarathons = () => {
  const [marathons, setMarathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        const response = await fetch(
          "https://marathon-management-system-server.vercel.app/allMarathon"
        );
        const data = await response.json();
        setMarathons(data);
      } catch (error) {
        console.error("Error fetching marathons:", error);
      }
    };

    fetchMarathons();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="w-4/5 mx-auto p- my-10 pt-20">
      <header className="text-center mb-16">
        <h2 className="text-4xl font-bold text-cyan-700">Explore Marathons</h2>
        <p className="text-gray-600 text-lg mt-2">
          Discover popular marathons near you
        </p>
      </header>

      {marathons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {marathons
            .slice(0, 4)
            .map(
              ({ _id, image, title, location, regStart, regEnd, distance }) => (
                <div
                  key={_id}
                  className="flex flex-col border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                >
                 <div className="p-3">
                 <img
                    src={image}
                    alt={title}
                    className=" h-48 w-full  object-cover rounded-lg"
                  />
                 </div>

                  <div className="flex-grow px-3">
                    <h3 className="text-xl font-semibold text-gray-600 ">
                      {title}
                    </h3>
                    <p className="text-gray-700 my-2 text-base">
                      <span className="font-semibold text-gray-600">
                        Location:
                      </span>{" "}
                      {location}
                    </p>
                    <p className="text-gray-700 text-base">
                      <span className="font-semibold text-gray-600">
                        Registration:
                      </span>{" "}
                      {formatDate(regStart)} - {formatDate(regEnd)}
                    </p>
                    <p className="text-gray-700 text-base">
                      <span className="font-semibold text-gray-600">
                        Distance:
                      </span>{" "}
                      {distance}
                    </p>
                  </div>

                  <div className="p-5">
                    <button
                      className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                      onClick={() => navigate(`/marathons/${_id}`)}
                    >
                      See Details
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AllMarathons;
