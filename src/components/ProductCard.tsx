"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { formatPrice } from "../lib/utils/index";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    images: { url: string; alt: string }[];
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success("Added to cart!");
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist!");
  };

  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative aspect-square mb-4">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToWishlist}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
          >
            <FaHeart className="text-gray-600" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
            aria-label="Add to cart"
          >
            <FaShoppingCart className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <Link href={`/shop/product/${product.id}`}>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
      </Link>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-blue-600">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>
    </div>
  );
}
