// src/pages/ProductPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ProductPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">
            Error: {error || "Product not found"}
          </p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/shop"
          className="text-blue-600 hover:underline flex items-center"
        >
          ← Back to Shop
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-contain max-h-96"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

            <div className="mb-4">
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-b py-4 my-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">Category</h2>
              <div className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                {product.category}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-l"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 h-10 text-center border-gray-200 border-y"
                />
                <button
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-r"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
