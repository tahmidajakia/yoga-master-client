import React, { useState } from "react";
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import {
  MdExplore,
  MdOfflineBolt,
  MdPayments,
  MdPendingActions,
} from "react-icons/md";
import { GiFigurehead } from "react-icons/gi";
import { FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

import { IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { TbBrandAppleArcade } from "react-icons/tb";
import { ToastContainer } from "react-toastify";

const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard Home",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUsers className="text-2xl" />,
    label: "Manage Users",
  },
  {
    to: "/dashboard/manage-class",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "Manage Class",
  },
  {
    to: "/dashboard/applied-instructor",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Instructor Applications",
  },
];

const instructorNavItem = [
  {
    to: "/dashboard/instructor-cp",
    icon: <FaHome className="text-2xl" />,
    label: "Home",
  },
  {
    to: "/dashboard/add-class",
    icon: <MdExplore className="text-2xl" />,
    label: "Add A Class",
  },
  {
    to: "/dashboard/my-classes",
    icon: <IoSchoolSharp className="text-2xl" />,
    label: "My Classes",
  },
  {
    to: "/dashboard/my-pending",
    icon: <MdPendingActions className="text-2xl" />,
    label: "Pending Classes",
  },
  {
    to: "/dashboard/my-approved",
    icon: <IoMdDoneAll className="text-2xl" />,
    label: "Approved Classes",
  },
];

const student = [
  {
    to: "/dashboard/student-cp",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/enrolled-class",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "My Enroll",
  },
  {
    to: "/dashboard/my-selected",
    icon: <BiSelectMultiple className="text-2xl" />,
    label: "My Selected",
  },
  {
    to: "/dashboard/my-payments",
    icon: <MdPayments className="text-2xl" />,
    label: "Payment History",
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <SiInstructure className="text-2xl" />,
    label: "Apply for Instructor",
  },
];

const lastMenuItems = [
  { to: "/", icon: <BiHomeAlt className="text-2xl" />, label: "Main Home" },
  {
    to: "/trending",
    icon: <MdOfflineBolt className="text-2xl" />,
    label: "Trending",
  },
  {
    to: "/browse",
    icon: <GiFigurehead className="text-2xl" />,
    label: "Following",
  },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle
  const { loading, logOut } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(
              "Logged out!",
              "You have successfully logged out.",
              "success"
            );
            navigate("/");
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  const role = currentUser?.role;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#FF1949" size={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
        <div className="flex gap-x-4 items-center md:hidden fixed top-4 left-4 z-50 ">
          <img
            src="/yoga-logo.png"
            onClick={() => setOpen(!open)}
            className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}
            onClick={() => setOpen(!open)}
          >
            Yoga Master
          </h1>
        </div>
      {/* Mobile Hamburger Menu */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-secondary p-3 rounded-md text-white"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-72 overflow-y-auto bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
      >
        <div className="flex gap-x-4 items-center ">
          <img
            src="/yoga-logo.png"
            onClick={() => setOpen(!open)}
            className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}
            onClick={() => setOpen(!open)}
          >
            Yoga Master
          </h1>
        </div>
        {/* Role-Based Navigation */}
        <ul className="pt-6">
          <p className={`ml-3 text-light-gray-4 ${!open && "hidden"}`}>
            {/* <small>MENU</small> */}
          </p>

          {/* Conditional Rendering for Admin */}
          {role === "admin" &&
            adminNavItems.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}

          {/* Conditional Rendering for Instructor */}
          {role === "instructor" &&
            instructorNavItem.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}

          {/* Conditional Rendering for Student */}
          {
                    role === 'user' && <ul className="pt-6">
                        <p className={`ml-3 text-light-gray-4 ${!open && "hidden"}`}><small>MENU</small></p>
                        {student.map((menuItem, index) => (
                            <li key={index} className="mb-2">
                                <NavLink
                                    to={menuItem.to}
                                    className={({ isActive }) =>
                                        `flex ${isActive ? "bg-red-500 text-white " : "text-[#413F44]"
                                        }  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white  font-bold text-sm items-center gap-x-4  `
                                    }
                                >
                                    {menuItem.icon}
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {menuItem.label}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                }
          {/* Last Menu Items */}
          {lastMenuItems.map((menuItem, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={menuItem.to}
                className={({ isActive }) =>
                  `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                }
              >
                {menuItem.icon}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {menuItem.label}
                </span>
              </NavLink>
            </li>
          ))}

          {/* Logout Button */}
          <li>
            <NavLink
              to="#"
              onClick={handleLogout}
              className="flex text-[#413F44] p-2 rounded-md cursor-pointer hover:bg-red-600 w-full font-bold text-sm gap-x-4"
            >
              <BiLogInCircle className="text-xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
