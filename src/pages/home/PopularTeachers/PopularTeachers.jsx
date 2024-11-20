import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import img from "../../../assets/home/girl.jpg";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

const PopularTeachers = () => {
  const axiosFetch = useAxiosFetch();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axiosFetch.get("/instructors").then((data) => {
      setInstructors(data.data).catch((err) => {
        console.log(err);
      });
    });
  }, []);
 

  console.log(instructors);

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div className="">
        <h1 className="text-5xl font-bold text-center">
          Our <span className="text-secondary">Best</span> Instructors
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-500">
            Explore our Popular Classes. Here are some popular classes based on
            how many students enrolled.
          </p>
        </div>
      </div>

      {instructors.length > 0 ? (
        <div className="grid mb-28 md:grid-cols-2 lg:grid-cols-4 mx-auto w-[90%] gap-6">
          {instructors.map((instructor, i) => (
            <div
              key={i}
              className="flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md"
            >
              <div className="flex flex-col gap-6 md:gap-8">
                <img
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={instructor.photoUrl || img}
                  alt="Instructor"
                />
                <div className="flex flex-col text-center">
                  <div className="font-medium text-lg dark:text-white text-gray-800">
                    {instructor.name}
                  </div>
                  <div className="text-gray-500 whitespace-nowrap">
                    Instructor
                  </div>
                  <div className="text-gray-500 mb-4 whitespace-nowrap">
                    Total Students: {instructor.totalEnrolled || "N/A"}
                  </div>
                  <div className="flex flex-row items-center justify-center gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0">
                    <a
                      href={instructor.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:cursor-pointer text-secondary duration-300"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={instructor.facebook || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:cursor-pointer text-secondary duration-300"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href={instructor.instagram || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:cursor-pointer text-secondary duration-300"
                    >
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Instructors Available</p>
      )}
    </div>
  );
};

export default PopularTeachers;
