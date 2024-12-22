import { Link, useLoaderData, useNavigate } from 'react-router-dom';

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
        email
    } = marathon;

 
    const registrationStart = new Date(regStart);
    const registrationEnd = new Date(regEnd);
    const currentDate = new Date();

   
    const isRegistrationOpen = currentDate >= registrationStart && currentDate <= registrationEnd;

    

    return (
        <div className="max-w-7xl mx-auto p-6">
            
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                <p className="text-lg text-gray-600">{location}</p>
            </div>

            
            <div className="grid md:grid-cols-2 gap-8">
                
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>

               
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Event Information</h2>
                        <p className="text-gray-700">{description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Registration Period</h3>
                            <p className="text-gray-600">From: {new Date(regStart).toLocaleDateString()}</p>
                            <p className="text-gray-600">To: {new Date(regEnd).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Event Start Date</h3>
                            <p className="text-gray-600">{new Date(startDate).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Distance</h3>
                            <p className="text-gray-600">{distance}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                            <p className="text-gray-600">Name: {name}</p>
                            <p className="text-gray-600">Email: {email}</p>
                        </div>
                    </div>
                </div>
            </div>

           
            <div className="mt-8 flex justify-center">
                {isRegistrationOpen ? (
                    <Link 
                        to={`/marathon/registration/${_id}`}
                        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Register Now
                    </Link>
                ) : (
                    <button
                        disabled
                        className="px-6 py-3 text-white bg-gray-400 rounded-lg cursor-not-allowed"
                    >
                        Registration Closed
                    </button>
                )}
            </div>

            <div className="mt-8 flex justify-center">
                <Link
                    to="/marathons"
                    className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Back to Marathons
                </Link>
            </div>
        </div>
    );
};

export default MarathonDetails;
