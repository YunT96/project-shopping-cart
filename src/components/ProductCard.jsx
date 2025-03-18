// src/components/ProductCard.jsx
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
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

export default ProductCard;
