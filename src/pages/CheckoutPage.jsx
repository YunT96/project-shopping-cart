import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="flex flex-col items-center">
        <p className="text-xl mb-4">Your order has been placed!</p>
        <p className="text-lg text-gray-600">
          Thank you for shopping with us. You will receive an email confirmation
          shortly.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
