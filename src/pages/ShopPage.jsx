// src/pages/Shop/ShopPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useCart } from "../../contexts/CartContext/CartContext";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from FakeStore API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
      >
        To Homepage
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center">Shop Our Products</h1>

      {/* This will later be extracted to a ProductGrid component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// This will later be moved to its own file
const ProductCard = ({ product }) => {
  // const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="h-48 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-gray-500 text-sm mb-2 flex-grow line-clamp-2">
        {product.description}
      </p>
      <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>

      <div className="flex items-center mb-4">
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l"
          onClick={handleDecrement}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-12 h-8 text-center border-gray-200 border-y"
        />
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ShopPage;
