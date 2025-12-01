"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useCart } from "../../../../../hooks/useCart";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { formatPrice } from "../../../../../lib/utils/index";
import toast from "react-hot-toast";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success("Added to cart!");
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square mb-4">
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="mb-6">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Rating - Placeholder as it's not in the model */}
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className="text-gray-300"
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              (0 reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-l"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-16 px-3 py-1 border-t border-b text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded-r"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}