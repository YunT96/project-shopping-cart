// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartModal from "../components/CartModal";

const Navbar = () => {
  const { getItemsCount, toggleCart } = useCart();

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="font-bold text-xl text-blue-600">
              ShopApp
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
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
                  className="flex items-center p-2 hover:text-blue-600 transition-colors cursor-pointer"
                  aria-label="Shopping Cart"
                >
                  {/* This would typically be an SVG icon */}
                  <span className="text-xl">🛒</span>

                  {/* Item Count Badge */}
                  {getItemsCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getItemsCount()}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Menu Button (would be expanded with functionality) */}
              <button className="md:hidden p-2" aria-label="Toggle Menu">
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Modal */}
      <CartModal />
    </>
  );
};

export default Navbar;
