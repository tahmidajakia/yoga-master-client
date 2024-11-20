import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUser from "../../../../hooks/useUser";
import { ScaleLoader } from "react-spinners";
import { Link } from "react-router-dom";

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ScaleLoader color="#FF1949" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        {/* <img
          src="/path-to-placeholder-image.jpg" // Replace with your placeholder image URL
          alt="No Enrolled Classes"
          className="w-80 mb-6"
        /> */}
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          You have not enrolled in any classes yet.
        </h2>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Explore our yoga classes and select the one that fits your schedule and preferences. Start your journey towards better health and mindfulness today.
        </p>
        <Link to="/classes">
          <button className="bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-600 transition-all">
            Explore Classes
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 py-8">
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold text-gray-700">Enrolled Classes</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-105"
          >
            <img
              src={item.classes.image}
              className="h-56 w-full object-cover"
              alt={`Class: ${item.classes.name}`}
            />
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.classes.name}
                </h1>
                <span className="text-sm text-indigo-500">
                  by <span className="font-semibold text-gray-900">{item.classes.instructorName}</span>
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <h1 className="font-bold text-xl text-gray-600">${item.classes.price}</h1>
                <Link to="/dashboard/course-details">
                  <button className="bg-secondary font-semibold rounded-xl text-white px-4 py-2 shadow-md hover:bg-secondary-dark transition-all duration-200">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;
