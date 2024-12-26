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
      photo: "https://via.placeholder.com/150",
      marathonName: "Dhaka City Run",
      quote:
        "Running the Dhaka City Run was an unforgettable experience. The energy was amazing!",
    },
    {
      id: 2,
      name: "Mohammad Hossain",
      photo: "https://via.placeholder.com/150",
      marathonName: "Cox's Bazar Coastal Run",
      quote:
        "The Cox's Bazar marathon was breathtaking! Running along the beach was magical.",
    },
    {
      id: 3,
      name: "Anika Rahman",
      photo: "https://neural.love/cdn/thumbnails/1ef6db49-2eac-6202-8d47-2d7b28cdcefb/6a1ad5e7-ee45-50d8-89eb-cd57915229ac.webp?Expires=1767225599&Signature=fIfXztANx2ZCDzQ-LOu~KzQ0GqqZgiBbjVN8bwOpbBeqKFz2iFn-HiWvx1eAEcaZ4xiP0FAMc2znTyxgr3xx9KRnHk9PpeUi~Neb6yAVQA2TCVInAuarxWIVFrMAkna~xX5WJWaYEp9oJD6dROlH-1osNHoW3PUfgIQFTnF2sCxeS4NUZ2j6T3T1aTGitMMQjJLMwg-cDL6N6MtTeR0K0qRiU53yCevnRiDPETWUXEWh3A-MmnXVkfS~EyLJOmbeOvRtaVnlyn2z7upGBxNiWEk4f5pVUQCn2gLMkN3lKqyHvFw0qA9jZkYXjDe~V0JBy2K5wWUet9PPcbauaey9IA__&Key-Pair-Id=K2RFTOXRBNSROX",
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
