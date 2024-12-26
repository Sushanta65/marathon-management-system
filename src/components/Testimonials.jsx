import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      photo: "https://i.ibb.co.com/Zmbp4NZ/user-1.png",
      marathonName: "Dhaka City Run",
      quote:
        "Running the Dhaka City Run was an unforgettable experience. The energy was amazing!",
    },
    {
      id: 2,
      name: "Mohammad Hossain",
      photo: "https://i.ibb.co.com/Jc8mF5m/user-2.jpg",
      marathonName: "Cox's Bazar Coastal Run",
      quote:
        "The Cox's Bazar marathon was breathtaking! Running along the beach was magical.",
    },
    {
      id: 3,
      name: "Anika Rahman",
      photo: "https://i.ibb.co.com/XbwGX8D/user-3.webp",
      marathonName: "Sylhet Green Trail",
      quote: "The Sylhet Green Trail was well-organized and absolutely stunning.",
    },
  ];

  return (
    <div className="w-4/5 mx-auto p-6 mt-10">
      
      <div className="text-center mb-10 py-5">
        <h2 className="text-4xl font-bold">
          What Our Runners Say
        </h2>
        <p className="text-gray-600">
          Explore What Our Runners saying about us.
        </p>
      </div>
      
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        
        
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="rounded-lg shadow-lg"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white rounded-lg shadow-md p-6 md:flex md:items-center md:gap-6">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mx-auto md:mx-0"
              />
              <div className="mt-4 md:mt-0 text-center md:text-left">
                <h3 className="text-lg font-bold">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm italic mb-2">
                  {testimonial.marathonName}
                </p>
                <p className="text-gray-600">{testimonial.quote}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
