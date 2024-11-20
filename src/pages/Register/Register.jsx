import { useForm } from "react-hook-form";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlinePicture,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Social/GoogleLogin";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        if (user) {
          return updateUserProfile(data.name, data.photoUrl)
            .then(() => {
              const userImp = {
                name: data.name,
                email: data.email,
                photoUrl: data.photoUrl,
                gender: data.gender,
                address: data.address,
                role: "user",
                phone: data.phone,
              };
              if (user.email && user.displayName) {
                return axios
                  .post("http://localhost:5000/new-user", userImp)
                  .then(() => {
                    toast.success("Registration successful!", {
                      position: toast.POSITION.TOP_CENTER,
                      autoClose: 3000,
                    });
                    navigate("/");
                    setError("");
                  })
                  .catch((err) => {
                    throw new Error(err);
                  });
              }
            })
            .catch((err) => {
              setError(err.code);
              throw new Error(err);
            });
        }
      })
      .catch(() => {
        setError("Registration failed. Please try again.");
      });
  };

  const password = watch("password", "");

  return (
    <div className="flex justify-center items-center py-14 bg-gray-100">
      <div className="bg-white p-10 w-full max-w-2xl rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-secondary
         mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <AiOutlineUser className="inline-block mr-2 text-lg" />
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="w-full border-gray-300 border rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <AiOutlineMail className="inline-block mr-2 text-lg" />
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="w-full border-gray-300 border rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <AiOutlineLock className="inline-block mr-2 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full border-gray-300 border rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <AiOutlineLock className="inline-block mr-2 text-lg" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === password || "Passwords do not match",
                })}
                className="w-full border-gray-300 border rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-400"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <AiOutlinePhone className="inline-block mr-2 text-lg" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone", { required: true })}
                className="w-full border-gray-300 border rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                <AiOutlinePicture className="inline-block mr-2 text-lg" />
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter your photo URL"
                {...register("photoUrl")}
                className="w-full border-gray-300 border rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
              <HiOutlineLocationMarker className="inline-block mr-2 text-lg" />
              Address
            </label>
            <textarea
              {...register("address", { required: true })}
              className="w-full border-gray-300 border rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your address"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
              Gender
            </label>
            <select
              {...register("gender", { required: true })}
              className="w-full border-gray-300 border rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition"
          >
            Register
          </button>
          {registrationError && (
            <p className="text-red-500 text-center text-sm mt-4">
              {registrationError}
            </p>
          )}
        </form>
        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
