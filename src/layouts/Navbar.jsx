// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartModal from "../components/CartModal";

const Navbar = () => {
  const { getItemsCount, toggleCart } = useCart();

  return (
    <>
      {/* Added fixed positioning and z-index to keep navbar on top */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 relative">
            {/* Logo */}
            <Link to="/" className="font-bold text-xl text-blue-600">
              ShopApp
            </Link>

            {/* Navigation Links (centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Shop
              </Link>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="flex items-center p-2 hover:text-blue-600 transition-colors"
                  aria-label="Shopping Cart"
                >
                  <span className="text-xl">🛒</span>
                  {getItemsCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getItemsCount()}
                    </span>
                  )}
                </button>
              </div>
              <button className="md:hidden p-2" aria-label="Toggle Menu">
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to the body to prevent content from hiding behind the fixed navbar */}
      <div className="pt-16"></div>

      {/* Cart Modal */}
      <CartModal />
    </>
  );
};

export default Navbar;
