import { Link, useLoaderData } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MarathonDetails = () => {
  const marathon = useLoaderData();

  const {
    _id,
    title,
    regStart,
    regEnd,
    startDate,
    location,
    distance,
    description,
    image,
    name,
    email,
    regCount,
    maxRegistrations,
  } = marathon;

  const registrationStart = new Date(regStart);
  const registrationEnd = new Date(regEnd);
  const eventStart = new Date(startDate);
  const currentDate = new Date();

  const isRegistrationOpen =
    currentDate >= registrationStart && currentDate <= registrationEnd;

  const timeLeft = Math.max((eventStart - currentDate) / 1000, 0);

  const registrationPercentage =
    maxRegistrations > 0 ? (regCount / maxRegistrations) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-12">
          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-center p-6">
            <div>
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="mt-2 text-lg">{location}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-12 space-x-6">
          <div className="flex flex-col items-center bg-white rounded-lg p-8 shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Time Left
            </h2>
            <CountdownCircleTimer
              isPlaying
              duration={timeLeft}
              colors={["#4CAF50", "#F7B801", "#A30000"]}
              colorsTime={[3600, 1800, 0]}
              size={150}
              onComplete={() => ({ shouldRepeat: false })}
            >
              {({ remainingTime }) => {
                const days = Math.floor(remainingTime / 86400);
                const hours = Math.floor((remainingTime % 86400) / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;

                return (
                  <div>
                    <p className="text-3xl font-semibold text-gray-800">
                      {days}d {hours}h
                    </p>
                    <p className="text-xl font-medium text-gray-600">
                      {minutes}m {seconds}s
                    </p>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>

          <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-8 shadow-lg w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Registrations</h2>
            <div className="w-full mb-4">
              <div className="bg-gray-300 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${registrationPercentage}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xl font-medium">
              {regCount > 0 ? regCount : 0} of {maxRegistrations} Registered
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Event Details
          </h2>
          <p className="text-lg text-gray-700 mb-6">{description}</p>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Registration Period
              </h3>
              <p className="text-gray-600">
                From: {new Date(regStart).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                To: {new Date(regEnd).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Event Start Date
              </h3>
              <p className="text-gray-600">
                {new Date(startDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Distance</h3>
              <p className="text-gray-600">{distance}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h3>
              <p className="text-gray-600">Name: {name}</p>
              <p className="text-gray-600">Email: {email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          {isRegistrationOpen ? (
            <Link
              to={`/marathon/registration/${_id}`}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Register Now
            </Link>
          ) : (
            <button
              disabled
              className="px-8 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed shadow-md"
            >
              Registration Closed
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <Link
            to="/marathons"
            className="px-8 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Back to Marathons
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;
