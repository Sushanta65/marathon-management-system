import Marathon from "../components/Marathon";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <h1 className="text-3xl font-semibold text-center mb-6">Marathons</h1>
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
