import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <Helmet>
        <title>About Us | Marathon Management</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">About Us</h1>
          <p className="mt-2 text-lg text-gray-600">
            Empowering runners and communities through seamless marathon management.
          </p>
        </div>

        {/* About Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The <span className="text-cyan-600 font-semibold">Marathon Management System</span> is a cutting-edge platform designed to simplify the organization, registration, and tracking of marathon events. Our mission is to make marathon management effortless for organizers and an enjoyable experience for participants.
          </p>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-cyan-600 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To create a seamless digital ecosystem for marathon management, ensuring smooth registration, event organization, and real-time tracking for all stakeholders.
            </p>
          </div>
          <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              To become the leading marathon management platform worldwide, empowering communities and individuals to participate in healthy and well-organized running events.
            </p>
          </div>
        </div>

        {/* Why Choose Us? */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
            <li><span className="text-cyan-600 font-semibold">User-Friendly</span>: Easy-to-use platform for both organizers and participants.</li>
            <li><span className="text-cyan-600 font-semibold">Real-Time Tracking</span>: Keep track of marathon progress with live updates.</li>
            <li><span className="text-cyan-600 font-semibold">Secure Payments</span>: Safe and seamless transaction processing.</li>
            <li><span className="text-cyan-600 font-semibold">Community Focused</span>: Bringing runners together for a greater cause.</li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8">
          <Link
            to="/contact"
            className="px-8 py-4 bg-cyan-600 text-white rounded-lg shadow-lg hover:bg-cyan-700 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
