// src/components/CartModal.jsx
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CartModal = () => {
  const {
    cartItems,
    cartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();

  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        cartOpen
      ) {
        toggleCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, toggleCart]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && cartOpen) {
        toggleCart();
      }
    };

    // Prevent scrollbar jump by adding padding equal to scrollbar width
    if (cartOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [cartOpen, toggleCart]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={toggleCart}
      ></div>
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md h-full overflow-auto animate-slide-in relative"
      >
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <p className="mb-4 text-gray-500">Your cart is empty</p>
            <button
              onClick={toggleCart}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex">
                  <div className="w-20 h-20 flex-shrink-0 mr-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4 bg-gray-50 sticky bottom-0">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">${getCartTotal().toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  onClick={toggleCart}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
