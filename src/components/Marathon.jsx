import { Link } from "react-router-dom";
import Loading from "./Loading";

const Marathon = ({ marathon }) => {
  const { _id, title, regStart, regEnd, startDate, location, distance, image } =
    marathon;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      {marathon ? (
        <div className="bg-white shadow-lg rounded-lg  border border-gray-200 flex flex-col h-full transition-transform transform hover:scale-105">
          <div className="p-3 ">
            <img src={image} alt="" className="rounded-lg h-48 w-full" />
          </div>
          <h3 className="text-xl px-3 font-bold text-gray-600 mb-2">{title}</h3>
          <p className="text-gray-600 px-3 font-medium text-md">{location}</p>

          <div className="mt-4 px-3 space-y-2 text-gray-700">
            <p className="text-sm">
              <span className="text-gray-600 font-semibold">Registration:</span>{" "}
              {formatDate(regStart)} - {formatDate(regEnd)}
            </p>
            <p className="text-sm">
              <span className="text-gray-600 font-semibold">Event Date:</span>{" "}
              {formatDate(startDate)}
            </p>
            <p className="text-sm">
              <span className="text-gray-600 font-semibold">Distance:</span>{" "}
              {distance}
            </p>
          </div>

          <div className="mt-auto pt-4 p-3 ">
            <Link
              to={`/marathons/${_id}`}
              className="block w-full text-center py-2 bg-cyan-700 text-white font- rounded-lg shadow-md hover:bg-cyan-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              See Details
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Marathon;
