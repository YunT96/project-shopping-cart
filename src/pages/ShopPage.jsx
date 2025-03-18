// src/pages/Shop/ShopPage.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Get category from URL query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");

  // Simplified categories with clothing combined
  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "Clothing" },
    { id: "jewelery", name: "Jewelry" },
    { id: "electronics", name: "Electronics" },
  ];

  // Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // Set active category from URL or default to "all"
        const category = categoryParam || "all";
        setActiveCategory(category);

        // Handle special case for clothing category which combines men's and women's
        if (category === "clothing") {
          const menResponse = await fetch(
            "https://fakestoreapi.com/products/category/men's clothing"
          );
          const womenResponse = await fetch(
            "https://fakestoreapi.com/products/category/women's clothing"
          );

          if (!menResponse.ok || !womenResponse.ok) {
            throw new Error("Failed to fetch products");
          }

          const menData = await menResponse.json();
          const womenData = await womenResponse.json();

          // Combine both clothing categories
          setProducts([...menData, ...womenData]);
        } else {
          // For all other categories use standard endpoint
          let url = "https://fakestoreapi.com/products";
          if (category !== "all") {
            url = `https://fakestoreapi.com/products/category/${category}`;
          }

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }

          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam]);

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">
          {activeCategory === "all"
            ? "Shop All Products"
            : `Shop ${
                categories.find((c) => c.id === activeCategory)?.name ||
                activeCategory
              }`}
        </h1>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop${
              category.id === "all" ? "" : `?category=${category.id}`
            }`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
