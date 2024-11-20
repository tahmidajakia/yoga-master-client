import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Import useAxiosPublic
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // Import SweetAlert2

const Classes = () => {
  const { currentUser } = useUser(); // Fetch currentUser from custom hook
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [classes, setClasses] = useState([]);
  const axiosPublic = useAxiosPublic(); // Use useAxiosPublic instead of useAxiosFetch
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    // Fetch the list of available classes
    axiosPublic
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));

    // Fetch the user's enrolled classes when logged in
    if (currentUser) {
      axiosPublic
        .get(`/enrolled-classes/${currentUser?.email}`)
        .then((res) => setEnrolledClasses(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentUser, axiosPublic]);

  const handleSelect = (id) => {
    // Fetch updated enrolled classes
    axiosPublic
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((err) => console.log(err));
  
    // If the user is not logged in, show an error toast
    if (!currentUser) {
      return toast.error("Please Login First");
    }
  
    // Check if the class is already selected or enrolled
    axiosPublic
      .get(`/cart-item/${id}?email=${currentUser.email}`)
      .then((res) => {
        if (res.data.classId === id) {
          return toast.error("Already Selected");
        } else if (enrolledClasses.find((item) => item.classes._id === id)) {
          return toast.error("Already Enrolled");
        } else {
          const data = {
            classId: id,
            userMail: currentUser.email,
            date: new Date(),
          };
  
          // Send the request to add to cart
          axiosPublic
            .post("/add-to-cart", data)
            .then((res) => {
              console.log(res.data);
              toast.success("Selected Successfully"); // Show success toast directly
            })
            .catch((err) => {
              console.error(err);
              toast.error("Error: Unable to select class");
            });
        }
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div>
      <div className="mt-20 pt-3">
        <h1 className="text-4xl font-bold text-center text-dark-primary">
          Classes
        </h1>
      </div>

      <div className="my-16 w-[90%] gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
        {classes.map((cls, index) => (
          <div
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${
              cls.availableSeats < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            {/* Image Container */}
            <div className="relative h-48">
              <img
                src={cls.image}
                alt="Course Image"
                className="object-cover w-full h-full"
              />
              {/* Overlay for Add to Cart Button */}
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <button
                    onClick={() => handleSelect(cls._id)}
                    title={
                      role === "admin" || role === "instructor"
                        ? "Instructor/Admin Cannot Select Classes"
                        : cls.availableSeats < 1
                        ? "No Seats Available"
                        : "Click to Select Class"
                    }
                    disabled={
                      role === "admin" ||
                      role === "instructor" ||
                      cls.availableSeats < 1
                    }
                    className="px-4 py-2 text-white bg-secondary duration-300 rounded hover:bg-red-700"
                  >
                    Select
                  </button>
                </div>
              </Transition>
            </div>

            {/* Class Details */}
            <div className="px-6 py-2">
              <h3
                className={`${
                  cls.name.length > 25 ? "text-[14px]" : "text-[16px]"
                } font-bold`}
              >
                {cls.name}
              </h3>
              <p className="text-gray-500 text-xs">
                Instructor : {cls.instructorName}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-600 text-xs">
                  Available Seats:{" "}
                  <span className="text-secondary">{cls.availableSeats}</span>
                </span>
                <span className="text-green-500 font-semibold">
                  ${cls.price}
                </span>
              </div>
              <Link to={`/class/${cls._id}`}>
                <button className="px-4 py-2 mt-4 w-full mx-auto text-white bg-secondary duration-300 rounded hover:bg-red-700">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
