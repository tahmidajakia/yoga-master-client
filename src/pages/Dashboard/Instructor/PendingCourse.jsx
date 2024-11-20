import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Fade, Slide } from "react-awesome-reveal";
import moment from "moment";

const PendingCourse = () => {
  const [pending, setPending] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (isLoading || !currentUser?.email) return;

    // Fetch approved classes using the current user's email
    axiosPublic
      .get(`/pending-classes/${currentUser.email}`)
      .then((res) => setPending(res.data))
      .catch((err) => console.log(err));
  }, [isLoading, currentUser?.email]);

  return (
    <div>
      <div>
        <div className="my-9 px-4 sm:px-6 lg:px-8 mt-24 md:mt-5 lg:mt-5">
          <h1 className="text-4xl font-bold text-center">
            My <span className="text-secondary">Classes</span>
          </h1>
          <div className="text-center">
            <Fade duration={100} className="text-[12px] text-center" cascade>
              Here you can see how many classes added by you and all classes
              status
            </Fade>
          </div>

          <div className="mt-9">
            {pending.length === 0 ? (
              <div className="text-center text-2xl font-bold mt-10">
                You have not added any class yet
              </div>
            ) : (
              <div>
                {pending.map((cls, index) => (
                  <Slide
                    duration={1000}
                    key={index}
                    className="mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg"
                  >
                    <div className="bg-white flex flex-col md:flex-row rounded-lg gap-8 shadow p-4 sm:p-6 md:p-8">
                      <div className="w-full md:w-1/3">
                        <img
                          className="max-h-[200px] max-w-full object-cover rounded-lg"
                          src={cls.image}
                          alt="Class Image"
                        />
                      </div>
                      <div className="w-full md:w-2/3">
                        <h1 className="text-[21px] font-bold text-secondary border-b pb-2 mb-2">
                          {cls.name}
                        </h1>
                        <div className="flex flex-col md:flex-row gap-5">
                          <div className="w-full md:w-1/2">
                            <h1 className="font-bold mb-3">Some Info :</h1>
                            <h1 className="text-secondary my-2">
                              <span className="text-black">Total Student</span>{" "}
                              : {cls.totalEnrolled ? cls.totalEnrolled : 0}
                            </h1>
                            <h1 className="text-secondary">
                              <span className="text-black">Total Seats</span> :{" "}
                              {cls.availableSeats}
                            </h1>
                            <h1 className="text-secondary my-2">
                              <span className="text-black">Status</span> :{" "}
                              <span
                                className={`font-bold ${
                                  cls.status === "pending"
                                    ? "text-orange-400"
                                    : cls.status === "checking"
                                    ? "text-yellow-300"
                                    : cls.status === "approved"
                                    ? "text-green-500"
                                    : "text-red-600"
                                }`}
                              >
                                {cls.status}
                              </span>
                            </h1>
                          </div>
                          <div className="w-full md:w-1/3">
                            <h1 className="font-bold mb-3">.....</h1>
                            <h1 className="text-secondary my-2">
                              <span className="text-black">Price</span> :{" "}
                              {cls.price} <span className="text-black">$</span>
                            </h1>
                            <h1 className="text-secondary my-2">
                              <span className="text-black">Submitted</span> :{" "}
                              <span className="">
                                {cls.submitted
                                  ? moment(cls.submitted).format("MMMM Do YYYY")
                                  : "Not Get Data"}
                              </span>
                            </h1>
                          </div>
                          <div className="w-full md:w-1/3">
                            <h1 className="font-bold mb-3">Action : </h1>
                            <button
                              onClick={() => handleFeedback(cls._id)}
                              className="px-3 bg-orange-400 font-bold py-1 text-white w-full rounded-lg mb-3"
                            >
                              View Feedback
                            </button>
                            <button className="px-3 bg-green-500 font-bold py-1 text-white w-full mb-3 rounded-lg">
                              View Details
                            </button>
                            <button
                              className="px-3 bg-secondary font-bold py-1 text-white w-full rounded-lg"
                              onClick={() =>
                                navigate(`/dashboard/update/${cls._id}`)
                              }
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingCourse;
