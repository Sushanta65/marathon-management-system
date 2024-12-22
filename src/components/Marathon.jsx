import React from 'react';
import { Link } from 'react-router-dom';

const Marathon = ({marathon}) => {
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
        email
      } = marathon;
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-600 mt-2">{location}</p>
              <div className="text-gray-600 mt-1 flex justify-between">
               <p>Reg Start: {new Date(regStart).toLocaleDateString()}</p>
               <p>Reg End: {new Date(regEnd).toLocaleDateString()}</p>
              </div>
              <div>
                Start At: {new Date(startDate).toLocaleDateString()}
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/marathons/${_id}`}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
    );
};

export default Marathon;