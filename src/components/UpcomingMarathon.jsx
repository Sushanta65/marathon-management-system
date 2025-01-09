import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const UpcomingMarathons = () => {
  const [upcomingMarathons, setUpcomingMarathons] = useState([]);

  useEffect(() => {
    const fetchUpcomingMarathons = async () => {
      try {
        const response = await fetch(
          "https://marathon-management-system-server.vercel.app/upcomingMarathon"
        );
        const data = await response.json();
        const now = new Date();
        const filteredMarathons = data.filter(
          (marathon) => new Date(marathon.startDate) > now
        );
        setUpcomingMarathons(filteredMarathons.slice(0, 7));
      } catch (error) {
        console.error("Error fetching upcoming marathons:", error);
      }
    };

    fetchUpcomingMarathons();
  }, []);

  const getRemainingTime = (startDate) => {
    const now = new Date();
    const marathonStartDate = new Date(startDate);
    const leftTime = marathonStartDate - now;

    const days = Math.ceil(leftTime / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} Days Left` : "Starting Soon";
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto py-10">
      <Helmet>
        <title>Upcoming Marathons</title>
      </Helmet>

      <div className="text-center pb-10">
        <h2 className="text-4xl font-bold pb-5">Upcoming Marathons</h2>
        <p className="text-gray-600">
          Discover marathons happening soon and be part of the excitement!
        </p>
      </div>

      {upcomingMarathons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcomingMarathons.map((marathon) => {
            const remainingTime = getRemainingTime(marathon.startDate);
            const formattedStartDate = new Date(
              marathon.startDate
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={marathon._id}
                className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                {/* Image Section */}
                <img
                  src={marathon.image}
                  alt={marathon.title}
                  className="w-full h-56 object-cover object-center"
                />

                {/* Content Section */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {marathon.title}
                  </h3>
                  <p className="text-gray-700 text-md mb-2">
                    <span className="font-medium">Location:</span>{" "}
                    {marathon.location}
                  </p>
                  <p className="text-red-500 text-md font-semibold mb-4">
                    Starts on: {formattedStartDate}
                  </p>
                  <div className="bg-green-100 text-green-800 text-center font-semibold text-sm py-2 rounded-lg mb-4">
                    {remainingTime}
                  </div>
                  <div className="text-gray-600 mb-4">
                    <p className="text-sm">
                      <span className="font-medium">Distance:</span>{" "}
                      {marathon.distance}
                    </p>
                    <p className="text-sm mt-2">
                      {marathon.description || "No description available"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-600">No upcoming marathons found.</div>
      )}
    </div>
  );
};

export default UpcomingMarathons;
