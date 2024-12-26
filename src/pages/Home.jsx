import { Helmet } from "react-helmet";
import Carousel from "../components/Carousel";
import Marathons from "../components/Marathons";
import Testimonial from "../components/Testimonials";
import TipsAndResources from "../components/TipsAndResources";
import UpcomingMarathons from "../components/UpcomingMarathon";

const Home = () => {
    return (
        <div>
            <Helmet>
        <title>Home - Marathon Management</title>
      </Helmet>
          <Carousel></Carousel>
         <Marathons></Marathons>
         <UpcomingMarathons></UpcomingMarathons>
         
         <TipsAndResources></TipsAndResources>
         <Testimonial></Testimonial>
        </div>
    );
};

export default Home;