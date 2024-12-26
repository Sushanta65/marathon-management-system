import { Link } from 'react-router-dom';
import Loading from './Loading';

const Marathon = ({ marathon }) => {
  const {
    _id,
    title,
    regStart,
    regEnd,
    startDate,
    location,
    distance,
    image,
  } = marathon;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <>
      {marathon ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col h-full">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex-grow">
            <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-2 font-medium">{location}</p>
            <div className="text-gray-600 mt-2 flex justify-between">
              <p>Reg Start: <span className="font-semibold">{formatDate(regStart)}</span></p>
              <p>Reg End: <span className="font-semibold">{formatDate(regEnd)}</span></p>
            </div>
            <div className="text-gray-600 mt-2">
              Start At: <span className="font-semibold">{formatDate(startDate)}</span>
            </div>
            <p>Distance: <span className="font-semibold text-gray-600">{distance} </span></p>
          </div>

          {/* Button Container */}
          <div className="mt-auto mb-4 flex justify-end">
            <Link
              to={`/marathons/${_id}`}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
