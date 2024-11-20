import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { GrUpdate } from 'react-icons/gr'
import { FcDeleteDatabase } from 'react-icons/fc';
import Swal from 'sweetalert2';
import axios from "axios";

const ManageUsers = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/delete-user/${id}`)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //       .delete(`/delete-user/${id}`)
  //         .then((res) => {
  //           if (res.data.deletedCount > 0) {
  //             Swal.fire(
  //               "Deleted!",
  //               "Your selected class has been deleted.",
  //               "success"
  //             );
  //             const newUser = users.filter((item) => item._id !== id);
  //             setUsers(newUser);
  //           }
  //         })
  //         .catch((err) => console.error(err));
  //     }
  //   });
  // };

  return (
    <div className="p-4 sm:p-6 md:p-8 mt-10 md:mt-5 lg:mt-5">
      <h1 className="text-center text-3xl sm:text-4xl font-bold my-7">
        Manage <span className="text-secondary">Users</span>
      </h1>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">#</th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">PHOTO</th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">NAME</th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">ROLE</th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">UPDATE</th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  >
                    <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4 font-medium">
                      {idx + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4">
                      <img
                        src={user.photoUrl}
                        className="h-[35px] w-[35px] sm:h-[45px] sm:w-[45px]"
                        alt=""
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4">
                      {user.role}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4">
                      <span
                        onClick={() =>
                          navigate(`/dashboard/update-user/${user._id}`)
                        }
                        className="inline-flex items-center gap-2 cursor-pointer bg-green-500 py-1 rounded-md px-2 text-white"
                      >
                        Update <GrUpdate className="text-white" />
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4">
                      <span
                        onClick={() => handleDelete(user._id)}
                        className="inline-flex items-center gap-2 cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white"
                      >
                        Delete <FcDeleteDatabase />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
