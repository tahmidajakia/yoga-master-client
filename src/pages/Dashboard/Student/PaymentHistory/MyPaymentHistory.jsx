import { useEffect, useState } from "react";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material";
import { ScaleLoader } from "react-spinners";
import useUser from "../../../../hooks/useUser";

const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const { currentUser } = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payments.length;
  const [page, setPage] = useState(1);
  let totalPage = Math.ceil(totalItem / 5);
  let itemsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems);
  }, [page, payments]);

  useEffect(() => {
    axiosFetch
      .get(`/payment-history/${currentUser?.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentUser?.email]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF1949", // Set the primary color
      },
      secondary: {
        main: "#FF1949", // Set the secondary color
      },
    },
  });

  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ScaleLoader color="#FF1949" />
      </div>
    );
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20 md:mt-10 lg:mt-5">
      <div className="text-center mt-6 mb-16">
        <p className="text-gray-400">
          Hey,{" "}
          <span className="text-secondary font-bold">{currentUser.name}</span>{" "}
          Welcome...!
        </p>
        <h1 className="text-4xl font-bold">
          My Paym<span className="text-secondary">ent Hist</span>ory
        </h1>
        <p className="text-gray-500 text-sm my-3">
          You can see your payment history here{" "}
        </p>
      </div>

      <div className="mb-4">
        <div>
          <h1 className="font-bold">Total Payments: {payments.length}</h1>
          <h1 className="font-bold">Total Paid: {totalPaidAmount}</h1>
        </div>
      </div>

      {/* Mobile-friendly layout for small screens */}
      <div className="block sm:hidden space-y-4">
        {paginatedPayments.map((payment, idx) => (
          <div
            key={payment._id}
            className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition duration-300"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">Transaction ID</h3>
                <p>{payment.transactionId}</p>
              </div>
              <div>
                <h3 className="font-semibold">Amount</h3>
                <p>{payment.amount}</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div>
                <h3 className="font-semibold">Total Items</h3>
                <p>{payment.classesId.length}</p>
              </div>
              <div>
                <h3 className="font-semibold">Time</h3>
                <p>{moment(payment.date).format("MMMM Do YYYY, h:mm a")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table layout for larger screens */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-4">
                  Amount
                </th>
                <th scope="col" className="px-6 py-4">
                  Total Items
                </th>
                <th scope="col" className="px-6 py-4">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.map((payment, idx) => (
                <tr
                  key={payment._id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {(page - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {payment.transactionId}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{payment.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {payment.classesId.length}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {moment(payment.date).format("MMMM Do YYYY, h:mm a")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5">
        <ThemeProvider theme={theme}>
          <Pagination
            onChange={handleChange}
            count={totalPage}
            color="secondary"
            className="flex justify-center"
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MyPaymentHistory;
