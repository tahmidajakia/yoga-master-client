import { Link } from "react-router-dom";
import img from "../../assets/image/yohahome.jpg";
import React from "react";
import { motion } from "framer-motion";

const YogaSection = () => {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 100 }} // Start below and hidden
      whileInView={{ opacity: 1, y: 0 }} // End at the original position
      viewport={{ once: true }} // Trigger animation when it's in view
      transition={{ type: "spring", stiffness: 50 }} // Smooth animation
    >
      <h1 className="text-5xl font-bold text-center">
        Timing of <span className="text-secondary">Yoga</span> Classes
      </h1>
      <div className="w-[40%] text-center mx-auto my-4">
        <p className="text-gray-500">
          Explore our Popular Classes. Here are some popular classes based on
          how many students enrolled.
        </p>
      </div>

      <section className="bg-blue-500 rounded-lg py-10 px-4 flex items-center transition-all duration-300 hover:bg-blue-700">
        {/* Image */}
        <div className="flex justify-center w-full mb-6">
          <img
            src={img}
            alt="Yoga"
            className="w-64 h-auto object-cover rounded-md"
          />
        </div>

        {/* Time Slots */}
        <div className="space-y-2 justify-around w-full max-w-md mb-6">
          <div className="text-center text-white">
            <p className="text-2xl font-bold">08:10 am - 09:30 am</p>
          </div>
          <div className="text-center text-white">
            <p className="text-2xl font-bold">10:00 am - 11:00 am</p>
          </div>
          <div className="text-center text-white">
            <p className="text-2xl font-bold">03:00 pm - 04:00 pm</p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-36 w-[8px] bg-white mx-4"></div>

        {/* Additional Text */}
        <div className="flex justify-center w-full mb-6">
          <p className="text-white text-center text-lg max-w-2xl">
            Discover a balanced lifestyle through our tailored yoga sessions
            designed for all levels.
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-center w-full">
          <Link to="">
            <button className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200">
              Find Out More
            </button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default YogaSection;
