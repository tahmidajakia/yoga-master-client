import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Pagination, ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageClasses = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosPublic = useAxiosPublic();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemPerPage = 5;
  const totalPage = Math.ceil(classes.length / 5);

  useEffect(() => {
    axiosFetch
      .get("/classes-manage")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    if (lastIndex > classes.length) {
      lastIndex = classes.length;
    }
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, totalPage]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff0000", // Set the primary color
      },
      secondary: {
        main: "#00ff00", // Set the secondary color
      },
    },
  });

  const handleApprove = (id) => {
    axiosPublic
      .put(`/change-status/${id}`, { status: "approved" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setClasses(
            classes.map((cls) =>
              cls._id === id ? { ...cls, status: "approved" } : cls
            )
          );
          toast.success("Class approved successfully!");
        }
      })
      .catch((err) => {
        toast.error("Failed to approve class.");
        console.log(err);
      });
  };

  const handelReject = (id) => {
    Swal.fire({
      title: "Reason for reject",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
      showLoaderOnConfirm: true,
      preConfirm: async (text) => {
        try {
          const res = await axiosPublic.put(`/change-status/${id}`, {
            status: "rejected",
            reason: text,
          });
          if (res.data.modifiedCount > 0) {
            setClasses(
              classes.map((cls) =>
                cls._id === id ? { ...cls, status: "rejected" } : cls
              )
            );
            toast.error("Class rejected successfully!");
          }
          return res.data;
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Changed!", "You rejected this class.", "success");
      }
    });
  };

  const handleChange = (event, value) => setPage(value);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-24 md:mt-5 lg:mt-5">
      <h1 className="text-4xl text-secondary font-bold text-center my-10">
        Manage <span className="text-black">Classes</span>
      </h1>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-4 py-2 sm:px-6 lg:px-8">
                    PHOTO
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 lg:px-8">
                    COURSE NAME
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 lg:px-8">
                    INSTRUCTOR NAME
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 lg:px-8">
                    STATUS
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 lg:px-8">
                    DETAILS
                  </th>
                </tr>
              </thead>
              <tbody>
                {classes.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-2xl font-bold"
                    >
                      No Classes Found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((cls) => (
                    <tr
                      key={cls._id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-4 py-2 sm:px-6 lg:px-8">
                        <img
                          src={cls.image}
                          className="h-[35px] w-[35px] sm:h-[45px] sm:w-[45px]"
                          alt=""
                        />
                      </td>
                      <td className="whitespace-pre-wrap px-4 py-2 sm:px-6 lg:px-8">
                        {cls.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 sm:px-6 lg:px-8">
                        {cls.instructorName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 sm:px-6 lg:px-8">
                        <span
                          className={`font-bold ${cls.status === "pending"
                            ? "bg-orange-400"
                            : cls.status === "checking"
                            ? "bg-yellow-500"
                            : cls.status === "approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                          } px-2 py-1 uppercase text-white rounded-xl`}
                        >
                          {cls.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleApprove(cls._id)}
                            className="text-[12px] cursor-auto disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white"
                          >
                            Approve
                          </button>
                          <button
                            disabled={
                              cls.status === "rejected" ||
                              cls.status === "checking"
                            }
                            onClick={() => handelReject(cls._id)}
                            className="cursor-pointer disabled:bg-red-800 bg-red-600 py-1 rounded-md px-2 text-white"
                          >
                            Deny
                          </button>
                          <button
                            disabled={
                              cls.status === "rejected" ||
                              cls.status === "checking"
                            }
                            onClick={() => handelReject(cls._id)}
                            className="cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white"
                          >
                            Feedback
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ThemeProvider theme={theme}>
        <div className="w-full h-full flex justify-center items-center my-10">
          <Pagination
            onChange={handleChange}
            count={totalPage}
            color="primary"
          />
        </div>
      </ThemeProvider>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default ManageClasses;
