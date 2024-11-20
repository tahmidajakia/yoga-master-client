import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Instructors from "../pages/instructors/Instructors";
import Classes from "../pages/classes/Classes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import SingleClasses from "../pages/classes/SingleClasses";
import DashboardLayout from "../layout/DashboardLayout"
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Student/PaymentHistory/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/PaymentHistory/Payment";
import CourseDetails from "../pages/Dashboard/Student/Enroll/CourseDetails";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import PendingCourse from "../pages/Dashboard/Instructor/PendingCourse";
import ApproveCourse from "../pages/Dashboard/Instructor/ApproveCourse";
import AdminCP from "../pages/Dashboard/Admin/AdminCP";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admin/UpdateUser";
import InstructorApplication from "../pages/Dashboard/Admin/InstructorApplication";
// import FindOutMore from "../pages/home/FindOutMore";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "instructors",
            element: <Instructors></Instructors>
        },
        {
            path: "classes",
            element: <Classes></Classes>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        {
          path: '/class/:id',
          element: <SingleClasses></SingleClasses>,
          loader: ({ params }) => fetch(`http://localhost:5000/class/${params.id}`),
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout></DashboardLayout>,
      children: [
        {
          index: true,
          element: <Dashboard></Dashboard>
        },
        // admin
        {
           path: "admin-home",
           element: <AdminCP></AdminCP>
        },
        {
          path: "manage-users",
          element: <ManageUsers></ManageUsers>
        },
        {
          path: "manage-class",
          element: <ManageClasses></ManageClasses>
        },
        {
           path: "applied-instructor",
           element: <InstructorApplication></InstructorApplication>
        },
        {
          path: "update-user/:id",
          element: <UpdateUser></UpdateUser>,
          loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
        },

        // instructor
        {
           path: "instructor-cp",
           element: <InstructorCP></InstructorCP>
        },
        {
          path: "add-class",
          element: <AddClass></AddClass>
        },
        {
          path: "my-classes",
          element: <MyClasses></MyClasses>
        },
        {
          path: "my-pending",
          element: <PendingCourse></PendingCourse>
        },
        {
          path: "my-approved",
          element: <ApproveCourse></ApproveCourse>
        },

        // student
        {
          path: "student-cp",
          element: <StudentCP></StudentCP>
        },
        {
          path: "enrolled-class",
          element: <EnrolledClasses></EnrolledClasses>
        },
        {
          path: 'my-selected',
          element: <SelectedClass></SelectedClass>
        },
        {
          path: 'my-payments',
          element: <MyPaymentHistory></MyPaymentHistory>
        },
        {
          path: 'apply-instructor',
          element: <AsInstructor></AsInstructor>
        },
        {
          path: 'user/payment',
          element: <Payment></Payment>
        },
        {
          path: 'course-details',
          element: <CourseDetails></CourseDetails>
        }
      ]
    }
    
  ]);

