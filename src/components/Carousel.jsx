import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";

const MarathonCarousel = () => {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/zmy2f2P/marathon-slider-1.jpg",
      title: "Run for a Cause",
      description: "Join the biggest marathon in New York and support impactful campaigns."
    },
    {
      id: 2,
      image: "https://i.ibb.co/GxPX334/marathon-slider-2.jpg",
      title: "Push Your Limits",
      description: "Challenge yourself with the most scenic and adventurous marathons."
    },
    {
      id: 3,
      image: "https://i.ibb.co/hKmTn7y/marathon-slider-3.jpg",
      title: "Experience the Adventure",
      description: "Participate in breathtaking trail runs and create lifelong memories."
    },
  ];

  return (
    <div className="w-full mx-auto rounded-lg overflow-hidden shadow-xl">
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="rounded-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[600px] flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              <div className="relative z-10 text-center text-white px-6 max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="mt-4 text-lg md:text-xl drop-shadow-md">
                  {slide.description}
                </p>
                <button className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all">
                  Explore More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MarathonCarousel;