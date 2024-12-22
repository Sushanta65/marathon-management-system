import React from "react";
import { Link, useLoaderData } from "react-router-dom";
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


// https://i.ibb.co.com/sVLzvMt/marathon-1.jpg
// https://i.ibb.co.com/dL9sh3X/marathon-2.jpg
// https://i.ibb.co.com/M26Y0sL/marathon-3.jpg
// https://i.ibb.co.com/cxL9bmc/marathon-4.webp
// https://i.ibb.co.com/4P0tfry/marathon-5.jpg
// https://i.ibb.co.com/NTp4N2p/marathon-6.jpg
// https://i.ibb.co.com/7WHv2wW/marathon-7.jpg
// https://i.ibb.co.com/JyWTGrV/marathon-8.jpg
// https://i.ibb.co.com/Tg6Km47/marathon-9.jpg
// https://i.ibb.co.com/SKcx8cB/marathon-10.jpg