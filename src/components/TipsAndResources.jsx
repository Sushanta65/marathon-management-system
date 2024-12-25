
const TipsAndResources = () => {
  return (
    <div className="py-10 mt-16 bg-blue-50">
      <div className="text-center mb-10 py-5">
        <h2 className="text-4xl font-bold">
          Tips & Resources
        </h2>
        <p className="text-gray-600">
          Everything you need to prepare for your marathon
        </p>
      </div>
      <div className=" w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Training Plans
          </h3>
          <p className="text-gray-600 mb-4">
            Marathon training requires dedication and preparation. Our training
            plans are designed for all levels, from beginner to advanced. They
            cover everything from basic endurance runs to speedwork, long runs,
            and rest days. Stick to the plan and you'll be prepared for race
            day.
          </p>
          <h4 className="font-semibold text-lg text-gray-800 mt-4">
            Key Features:
          </h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Flexible schedules for beginners and advanced runners</li>
            <li>Personalized pace recommendations</li>
            <li>Easy-to-follow weekly workout plans</li>
          </ul>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Marathon Gear
          </h3>
          <p className="text-gray-600 mb-4">
            Wearing the right gear is crucial for your marathon performance.
            We’ve compiled a list of essential gear for every runner. From shoes
            to hydration packs, wearing the proper equipment can help you avoid
            injuries and improve your comfort during the race.
          </p>
          <h4 className="font-semibold text-lg text-gray-800 mt-4">
            Recommended Gear:
          </h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Comfortable running shoes with the right support</li>
            <li>Moisture-wicking socks to prevent blisters</li>
            <li>Running clothes suited for different weather conditions</li>
            <li>Hydration packs or belts for long runs</li>
          </ul>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Nutrition Tips
          </h3>
          <p className="text-gray-600 mb-4">
            Proper nutrition is key to maximizing your marathon performance. The
            right foods and hydration can boost your endurance, improve
            recovery, and prevent fatigue. Our nutrition tips cover everything
            from pre-race meals to race day fueling strategies.
          </p>
          <h4 className="font-semibold text-lg text-gray-800 mt-4">
            Essential Nutrition Tips:
          </h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>
              Eat a balanced diet rich in carbohydrates, proteins, and healthy
              fats
            </li>
            <li>Stay hydrated before, during, and after your runs</li>
            <li>Refuel with easily digestible snacks during long runs</li>
            <li>Consider electrolyte drinks to replace lost minerals</li>
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Additional Tips for Marathon Day
        </h3>
        <div className="bg-white p-8 shadow-md rounded-lg max-w-4xl mx-auto">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            On Marathon Day:
          </h4>
          <p className="text-gray-600 mb-4">
            Here are some final tips for the day of your marathon:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Arrive early to the start line to warm up and prepare</li>
            <li>Stick to your training plan – pace yourself early on</li>
            <li>Don’t try anything new on race day (gear, nutrition, etc.)</li>
            <li>Remember to hydrate and fuel during the race</li>
            <li>Celebrate your achievements, no matter the finish time!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TipsAndResources;
