
import { useLoaderData } from "react-router-dom";
import Marathon from "../components/Marathon";

const AllMarathon = () => {
    const marathons = useLoaderData()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Marathons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {marathons.map((marathon) => (
          <Marathon key={marathon._id} marathon={marathon}></Marathon>
        ))}
      </div>
    </div>
  );
};

export default AllMarathon;
