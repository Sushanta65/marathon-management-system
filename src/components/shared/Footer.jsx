
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-80">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-3xl font-bold mb-2">Marathon Hub</h1>
          <p className="text-sm text-gray-400 text-center sm:text-left">
            The best place to register for marathon events, track your progress, and join the running community!
          </p>
        </div>

       
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/about" className="hover:text-gray-500">About Us</a></li>
            <li><a href="/events" className="hover:text-gray-500">Upcoming Events</a></li>
            <li><a href="/contact" className="hover:text-gray-500">Contact</a></li>
            <li><a href="/privacy" className="hover:text-gray-500">Privacy Policy</a></li>
          </ul>
        </div>

       
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-sm text-gray-400 mb-2">© 2024 Marathon Hub. All Rights Reserved.</p>
          <p className="text-xs text-gray-500">Designed with ❤️ by Your Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
