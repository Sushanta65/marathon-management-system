import { Link, useLoaderData } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Helmet } from "react-helmet";

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
    name,
    email,
    regCount,
    image
  } = marathon;

  const registrationStart = new Date(regStart);
  const registrationEnd = new Date(regEnd);
  const eventStart = new Date(startDate);
  const currentDate = new Date();

  const isRegistrationOpen =
    currentDate >= registrationStart && currentDate <= registrationEnd;

  const timeLeft = Math.max((eventStart - currentDate) / 1000, 0);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <Helmet>
        <title>{title} | Marathon Details</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Marathon Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
          <p className="mt-2 text-lg text-gray-600">{location}</p>
        </div>

        {/* Time Left & Registration Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Countdown Timer */}
          <div className="p-5 w-full h-[400px]">
            <img className="w-full h-full" src={image} alt="" />
          </div>
          <div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Time Left</h2>
            <CountdownCircleTimer
              isPlaying
              duration={timeLeft}
              colors={["#06B6D4", "#e0e0e0", "#FF5733"]}
              size={150}
              strokeWidth={5}
              trailColor="#e0e0e0"
              onComplete={() => ({ shouldRepeat: false })}
            >
              {({ remainingTime }) => {
                const days = Math.floor(remainingTime / 86400);
                const hours = Math.floor((remainingTime % 86400) / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;

                return (
                  <div>
                    <p className="text-4xl font-bold text-gray-900">{days}d {hours}h</p>
                    <p className="text-xl text-gray-600">{minutes}m {seconds}s</p>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>

          {/* Registration Count */}
          <div className="bg-cyan-600 text-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-4xl font-semibold mb-2">{regCount}</h2>
            <p className="text-xl">Registered Participants</p>
          </div>
          </div>
          
        </div>

        {/* Event Details */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Event Details</h2>
          <p className="text-lg text-gray-700 mb-6">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Registration Period</h3>
              <p className="text-gray-600">From: {formatDate(regStart)}</p>
              <p className="text-gray-600">To: {formatDate(regEnd)}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Start Date</h3>
              <p className="text-gray-600">{formatDate(eventStart)}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Distance</h3>
              <p className="text-gray-600">{distance}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Information</h3>
              <p className="text-gray-600">Name: {name}</p>
              <p className="text-gray-600">Email: {email}</p>
            </div>
          </div>
        </div>

        {/* Registration Button */}
        <div className="flex justify-center mb-6">
          {isRegistrationOpen ? (
            <Link
              to={`/marathon/registration/${_id}`}
              className="px-8 py-4 bg-cyan-600 text-white rounded-lg shadow-lg hover:bg-cyan-700 transition duration-300"
            >
              Register Now
            </Link>
          ) : (
            <button
              disabled
              className="px-8 py-4 bg-gray-400 text-white rounded-lg shadow-lg cursor-not-allowed"
            >
              Registration Closed
            </button>
          )}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link
            to="/marathons"
            className="px-8 py-4 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
          >
            Back to Marathons
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;
