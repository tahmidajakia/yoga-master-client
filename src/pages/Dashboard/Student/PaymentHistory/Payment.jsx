import { Navigate, useLocation } from "react-router-dom";
import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPayment from "./CheckoutPayment";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
  const key = import.meta.env.VITE_STRIPE;
  console.log(key);

  const location = useLocation();
  const price = location.state?.price;
  const cartItm = location.state?.itemId;
  console.log(cartItm, "itm form payment");
  if (!price) {
    return <Navigate to="/dashboard/my-selected" replace />;
  }

  const stripePromise = loadStripe(key);
  return (
    <div className="my-40 stripe-custom-class">
      <Elements stripe={stripePromise}>
        <CheckoutPayment price={price} cartItm={cartItm}></CheckoutPayment>
      </Elements>
    </div>
  );
};

export default Payment;
