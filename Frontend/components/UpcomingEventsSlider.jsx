import { FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const upcomingEvents = [
  {
    title: "Animation Workshop: Basics of 2D Animation",
    date: "May 15, 2024",
    location: "Virtual Event",
    description:
      "Join us for an introductory workshop covering the fundamentals of 2D animation techniques.",
    poster: "/thumb1.jpg", // Adjust image path
  },
  {
    title: "Animation Conference 2024",
    date: "June 10-12, 2024",
    location: "Bellary, India",
    description:
      "The annual Animation Conference returns with a lineup of industry experts, panel discussions, and networking opportunities.",
    poster: "/thumb2.jpg", // Adjust image path
  },
  // Add more events as needed
];

const UpcomingEventsSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      className="h-[500px]"
    >
      {upcomingEvents.map((event, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-16">
            {/* Event poster */}
            <div className="w-full max-w-[300px] relative mx-auto xl:mx-0">
              <div className="mb-4">
                <Image
                  src={event.poster}
                  width={300}
                  height={400}
                  alt={event.title}
                />
              </div>
            </div>

            {/* Event details */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-lg">{event.title}</div>
              <div className="text-[12px] uppercase font-extralight tracking-widest">
                <FaCalendarAlt className="inline-block mr-1" />
                {event.date} - {event.location}
              </div>
              <div className="text-lg xl:text-base text-center md:text-left">
                {event.description}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default UpcomingEventsSlider;
