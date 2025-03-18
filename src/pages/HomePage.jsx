// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import clothingImage from "../assets/clothing.jpg";
import jewelryImage from "../assets/jewelry.jpg";
import electronicsImage from "../assets/electronics.jpg";

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
          <Link
            to="/shop?category=clothing"
            className="block p-8 rounded-lg text-center hover:opacity-90 transition-all relative overflow-hidden h-64 flex flex-col items-center justify-center"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${clothingImage})`,
              }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-white opacity-35"></div>

            {/* Content */}
            <h3 className="text-5xl text-slate-900 font-semibold mb-2 relative z-10">
              Browse Clothing
            </h3>
          </Link>

          <Link
            to="/shop?category=jewelery"
            className="block p-8 rounded-lg text-center hover:opacity-90 transition-all relative overflow-hidden h-64 flex flex-col items-center justify-center"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${jewelryImage})`,
              }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-white opacity-35"></div>

            {/* Content */}
            <h3 className="text-5xl text-slate-900 font-semibold mb-2 relative z-10">
              Browse Jewelry
            </h3>
          </Link>

          <Link
            to="/shop?category=electronics"
            className="block p-8 rounded-lg text-center hover:opacity-90 transition-all relative overflow-hidden h-64 flex flex-col items-center justify-center"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${electronicsImage})`,
              }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-white opacity-35"></div>

            {/* Content */}
            <h3 className="text-5xl text-slate-900 font-semibold mb-2 relative z-10">
              Browse Electronics
            </h3>
          </Link>
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
