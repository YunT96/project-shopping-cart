// src/components/ProductCard.jsx
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image container with fixed height */}
      <div className="h-48 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Title container with fixed height */}
      <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
        {product.title}
      </h3>

      {/* Price with fixed margin to create consistent spacing */}
      <p className="text-xl font-bold mb-4 text-right pt-4 pr-4">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
