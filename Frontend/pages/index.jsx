import { motion } from "framer-motion";
import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import UpcomingEventsSlider from "../components/UpcomingEventsSlider";
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full flex">
      {/* particles */}
      {/* <ParticlesContainer /> */}
      {/* Left Side - Content */}
      <div className="w-1/2">
        <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
  <motion.h1
    variants={fadeIn("down", 0.2)}
    initial="hidden"
    animate="show"
    exit="hidden"
    className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6"
  >
    Bring Your Imagination <br /> to Life with <span className="text-red-500">Animation</span>
  </motion.h1>
  <motion.p
    variants={fadeIn("down", 0.3)}
    initial="hidden"
    animate="show"
    exit="hidden"
    className="text-lg md:text-xl text-white mb-8"
  >
    Explore the endless possibilities of <span className="text-red-500">animation</span> and storytelling. From vibrant characters to breathtaking landscapes, let your creativity soar and captivate audiences worldwide.
  </motion.p>
  <div className="flex justify-center xl:hidden relative">
    <a href="#projects" className="text-white font-medium hover:underline">View Projects</a>
  </div>
  <motion.div
    variants={fadeIn("down", 0.4)}
    initial="hidden"
    animate="show"
    exit="hidden"
    className="hidden xl:flex"
  >
    <a href="#projects" className="text-white font-medium hover:underline">View Projects</a>
  </motion.div>
</div>

        </div>
      </div>
      {/* Right Side - Image */}
      <div className="w-1/2 relative">
        {/* bg img */}
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
          aria-hidden
        />
        
        {/* UpcomingEventsSlider */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]"
        >
          <UpcomingEventsSlider />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
