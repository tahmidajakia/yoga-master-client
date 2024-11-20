
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import img from "../../assets/home/girl.jpg";
import useAxiosFetch from "../../hooks/useAxiosFetch";

const Instructors = () => {
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
            Explore our Popular Classes . Here is some popular classes based on
            How many student enrolled
          </p>
        </div>
      </div>

      {instructors ? (
        <>
          <div className="grid mb-28 md:grid-cols-2 lg:grid-cols-3 mt-6 mx-auto w-[90%] gap-6">
            {instructors?.map((instructor, i) => (
              <div
                key={i}
                className="flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8  rounded-md"
              >
                <div className="flex flex-col gap-6 md:gap-8">
                  <img
                    className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                    src={instructor?.instructor?.photoUrl || `${img}`}
                    alt=""
                  />
                  <div className="flex flex-col text-center">
                    <div className="font-medium text-lg dark:text-white text-gray-800">
                      {instructor?.instructor?.name}
                    </div>
                    <div className="text-gray-500  ">
                      Instructor
                    </div>
                    <div className="text-gray-500 mb-4 ">
                      Address : {instructor?.address}
                    </div>
                    <div className="text-gray-500 mb-4 ">
                      Email : {instructor?.email}
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0">
                      <a className="hover:cursor-pointer text-secondary duration-300">
                        <FaLinkedin />
                      </a>
                      <a className="hover:cursor-pointer text-secondary duration-300">
                        <FaFacebook />
                      </a>
                      <a className="hover:cursor-pointer text-secondary duration-300">
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No Instructor Available</p>
      )}
    </div>
  );
};

export default Instructors;
