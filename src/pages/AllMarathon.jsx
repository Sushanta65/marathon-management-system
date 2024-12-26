import Marathon from "../components/Marathon";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

const AllMarathon = () => {
  const [marathons, setMarathons] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    axios
      .get(`http://localhost:5600/marathons?sort=${sortOrder}`)
      .then((res) => {
        setMarathons(res.data);
      })
      .catch((err) => console.error("Error:", err));
  }, [sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Marathons</title>
      </Helmet>
      <div>
        <div className="text-center mb-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12 px-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Explore Marathons
          </h2>
          <p className="text-lg mb-4">
            Discover exciting marathons happening around the world.
          </p>
          <p className="text-sm text-gray-200 max-w-3xl mx-auto">
            Whether you're a seasoned runner or just getting started, there's a
            marathon for everyone. Browse through a variety of marathons, from
            local events to global races. Find one that suits your passion and
            start preparing today!
          </p>
        </div>
      </div>
      <div className="sort-controls flex items-center space-x-4 mb-6 ">
        <label htmlFor="sortOrder" className="text-gray-700 font-semibold">
          Sort By:
        </label>
        <select
          onChange={handleSortChange}
          className="bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 px-4 py-2 transition duration-200 hover:bg-gray-100"
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {marathons.map((marathon) => (
          <Marathon key={marathon._id} marathon={marathon}></Marathon>
        ))}
      </div>
    </div>
  );
};

export default AllMarathon;
