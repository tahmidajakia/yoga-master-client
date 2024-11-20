import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useUser from "../../../hooks/useUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddClass = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
  const axiosPublic = useAxiosPublic();
  const { currentUser, isLoading } = useUser();
  const [image, setImage] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = Object.fromEntries(formData);
    formData.append("file", image);

    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          newData.image = data.data.display_url;
          newData.instructorName = currentUser.name;
          newData.instructorEmail = currentUser.email;
          newData.status = "pending";
          newData.submitted = new Date();
          newData.totalEnrolled = 0;

          axiosPublic.post("/new-class", newData).then((res) => {
            console.log(res.data);
            toast.success("Class added successfully!"); // Toast message for success
          });
        } else {
          toast.error("Failed to upload the image."); // Toast for image upload failure
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred while adding the class."); // General error toast
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-24 md:mt-5 lg:mt-5">
      {/* Toast container for notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">Add Your Class</h1>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className=" mx-auto p-6 bg-white rounded shadow"
      >
        <div className="grid grid-cols-2 w-full gap-3">
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Class name
            </label>
            <input
              className=" w-full px-4 py-2  border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              required
              placeholder="Your Class Name"
              name="name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="font-bold">
              Thumbnail Photo
            </label>
            <input
              type="file"
              required
              onChange={handleImageChange}
              name="image"
              className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500    file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4 "
            />
          </div>
        </div>
        <div className="">
          <h1 className="text-[12px] my-2 ml-2 text-secondary">
            You cannot change your name or email
          </h1>
          <div className="grid gap-3 grid-cols-2">
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="instructorName"
              >
                Instructor name
              </label>
              <input
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                type="text"
                value={currentUser?.name}
                readOnly
                disabled
                placeholder="Instructor Name"
                name="instructorName"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="instructorEmail"
              >
                Instructor email
              </label>
              <input
                title="You cannot update your email"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                type="email"
                value={currentUser?.email}
                disabled
                readOnly
                name="instructorEmail"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="availableSeats"
            >
              Available seats
            </label>
            <input
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="number"
              required
              placeholder="How many seats are available?"
              name="availableSeats"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="number"
              required
              placeholder="How much does it cost?"
              name="price"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Youtube Link
          </label>
          <p className="text-[12px] my-2 mt-2 text-secondary">
            Only youtube videos are supported
          </p>
          <input
            required
            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="text"
            placeholder="Your course intro video link"
            name="videoLink"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Description About your course
          </label>
          <textarea
            placeholder="Description about your course"
            name="description"
            className="resize-none border w-full p-2 rounded-lg border-secondary outline-none"
            rows="4"
          ></textarea>
        </div>
        <div className="text-center w-full">
          <button
            className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
