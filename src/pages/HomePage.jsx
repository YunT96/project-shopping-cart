// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-xl mb-8">
            Discover amazing products at affordable prices
          </p>
          <Link
            to="/shop"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">👕</div>
            <h3 className="text-xl font-semibold mb-2">Clothing</h3>
            <p className="mb-4">Discover our latest fashion items</p>
            <Link
              to="/shop?category=clothing"
              className="text-blue-600 font-medium hover:underline"
            >
              Browse Clothing
            </Link>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">💎</div>
            <h3 className="text-xl font-semibold mb-2">Jewelry</h3>
            <p className="mb-4">Elegant jewelry for every occasion</p>
            <Link
              to="/shop?category=jewelery"
              className="text-blue-600 font-medium hover:underline"
            >
              Browse Jewelry
            </Link>
          </div>

          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">🖥️</div>
            <h3 className="text-xl font-semibold mb-2">Electronics</h3>
            <p className="mb-4">The latest gadgets and devices</p>
            <Link
              to="/shop?category=electronics"
              className="text-blue-600 font-medium hover:underline"
            >
              Browse Electronics
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-lg mb-8">
            Explore our collection and find your perfect item today.
          </p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
