import Marathon from "../components/Marathon";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

const AllMarathon = () => {
  const [marathons, setMarathons] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://marathon-management-system-server.vercel.app/marathons?sort=${sortOrder}`
      )
      .then((res) => {
        setMarathons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="w-4/5 mx-auto px-4 py-8">
      <Helmet>
        <title>Marathons</title>
      </Helmet>
      <div className="text-center mb-16 bg-gradient-to-r from-cyan-700 to-cyan-900 text-white py-12 px-6 rounded-lg shadow-lg">
        <h2 className="text-5xl font-extrabold mb-4 text-white">
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
      <div className="mb-10">
        <label htmlFor="sortOrder" className="text-gray-700 font-semibold">
          Sort By:
        </label>
        <select
          onChange={handleSortChange}
          className="bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:ring-2 ml-3 focus:ring-cyan-600 focus:border-cyan-600 px-4 py-2 transition duration-200 hover:bg-gray-100"
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py0">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {marathons.map((marathon) => (
            <Marathon key={marathon._id} marathon={marathon}></Marathon>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMarathon;
