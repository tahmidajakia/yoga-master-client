import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useUser from "../../../../hooks/useUser";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPayment = ({ price, cartItm }) => {
  const URL = `http://localhost:5000/payment-info${
    cartItm ? `?classId=${cartItm}` : ""
  }`;
  console.log(URL);

  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { currentUser, isLoading } = useUser();
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState("");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  if (price < 0 || !price) {
    return <Navigate to="/dashboard/my-selected" replace />;
  }

  useEffect(() => {
    axiosPublic
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        const classesId = res.data.map((item) => item._id);
        setCart(classesId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosPublic, currentUser]);

  console.log(cart);

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", { price: price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching clientSecret:", err));
  }, [axiosPublic, price]);

  const handleSubmit = async (event) => {
    setMessage("");
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setMessage(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser.name || "Unknown",
            email: currentUser.email || "Anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("[error]", confirmError);
      setMessage(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      const paymentMethod = paymentIntent.payment_method;
      const amount = paymentIntent.amount / 100;
      const currency = paymentIntent.currency;
      const paymentStatus = paymentIntent.status;
      const userName = currentUser.name;
      const userEmail = currentUser.email;

      const data = {
        transactionId,
        paymentMethod,
        amount,
        currency,
        paymentStatus,
        userName,
        userEmail,
        classesId: cartItm ? [cartItm] : cart,
        date: new Date(),
      };

      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (
            res.deletedResult?.deletedCount > 0 &&
            res.paymentResult?.insertedId &&
            res.updatedResult?.modifiedCount > 0
          ) {
            setSucceeded("Payment Successful, You can now access your classes");
            toast.success("Payment Successful!");
          } else {
            setSucceeded("Payment Failed, Please try again");
            toast.error("Payment Failed!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred during payment.");
        });
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Payment Amount: <span className="text-secondary">{price}$</span>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || isLoading}
          className="mt-4 bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Pay
        </button>
      </form>

      {succeeded && (
        <ul className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <li>{succeeded}</li>
        </ul>
      )}
      {message && (
        <ul className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <li>{message}</li>
        </ul>
      )}
    </>
  );
};

export default CheckoutPayment;
