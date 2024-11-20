import React, { useEffect, useState } from "react";
import Card from './Card';

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  // Custom getData function to fetch data
  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      const data = await getData("http://localhost:5000/classes"); // Updated URL
      setClasses(data); // Set the data to state
    };
    fetchClasses();
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div className="">
        <h1 className="text-5xl font-bold text-center">
          Our <span className="text-secondary">Popular</span> Classes
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-500">
            Explore our Popular Classes. Here are some popular classes based on
            how many students have enrolled.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {classes.slice(0, 6).map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
