import React, { useState, useEffect } from "react";

const UpcomingMarathons = () => {
  const [upcomingMarathons, setUpcomingMarathons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5600/marathons")
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const filteredMarathons = data
          .slice(0, 7)
          .filter((marathon) => new Date(marathon.startDate) > now);
        setUpcomingMarathons(filteredMarathons);
      });
  }, []);

  const getRemainingTime = (startDate) => {
    const now = new Date();
    const marathonStartDate = new Date(startDate);
    const leftTime = marathonStartDate - now;

    const days = Math.floor(leftTime / (1000 * 60 * 60 * 24));

    return `${days} Days Left`;
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto py-10">
      <div className="text-center pb-10">
      <h2 className="text-4xl font-bold pb-5">
        Upcoming Marathons
      </h2>
      <p>Upcoming Marathons Can Be Useful For You. Explore These Now.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingMarathons.map((marathon, index) => {
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
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={marathon.image}
                alt={marathon.title}
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {marathon.title}
                </h3>
                <p className="text-gray-700 text-md mb-4">
                  {marathon.location}
                </p>

                <p className="text-md font-semibold text-red-500 mb-4">
                  Starts on: {formattedStartDate}
                </p>

                <div className="bg-green-100 text-green-800 text-center font-semibold text-sm py-2 rounded-lg mb-4">
                  {remainingTime}
                </div>

                <div className="text-gray-600">
                  <p className="text-sm">
                    <span className="font-medium">Distance:</span>{" "}
                    {marathon.distance}
                  </p>
                  <p className="text-sm mt-2">{marathon.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingMarathons;
