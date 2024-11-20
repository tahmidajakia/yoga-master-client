import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import image1 from "../../../assets/gallary/big2.jpg";
import image2 from "../../../assets/gallary/big.jpg";
import image3 from "../../../assets/gallary/img1.jpg";
import image4 from "../../../assets/gallary/img2.jpg";
import image5 from "../../../assets/gallary/image2.png";

const Gallary = () => {
  // State to track scroll position and trigger animations
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) { // You can adjust this to trigger at different scroll positions
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center">
          Our <span className="text-secondary"></span> Gallary
        </h1>
      </div>
      <div className="md:grid grid-cols-2 items-center justify-center border gap-4">
        {/* Large Image Animation triggered by scroll position */}
        <motion.div
          className="mb-4 md:mb-0"
          initial={{ x: -1000 }}
          animate={scrolling ? { x: 0 } : { x: -1000 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <img src={image1} alt="Gallery Image 1" className="md:h-[720px] w-full mx-auto" />
        </motion.div>

        {/* Smaller Images Animation triggered by scroll position */}
        <motion.div
          className="gap-4 grid grid-cols-2 items-start"
          initial={{ x: 1000 }}
          animate={scrolling ? { x: 0 } : { x: 1000 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={scrolling ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img src={image2} alt="Gallery Image 2" className="md:h-[350px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={scrolling ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <img src={image3} alt="Gallery Image 3" className="md:h-[350px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={scrolling ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <img src={image4} alt="Gallery Image 4" className="md:h-[350px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={scrolling ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <img src={image5} alt="Gallery Image 5" className="md:h-[350px]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallary;
