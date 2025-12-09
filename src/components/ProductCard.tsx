"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { formatPrice } from "../lib/utils";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
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
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success("Added to cart");
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative">
      {/* Product Image */}
      <div className="relative aspect-3/4 mb-4 overflow-hidden rounded-sm bg-gray-100">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        {product.compareAtPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
            -
            {Math.round(
              ((product.compareAtPrice - product.price) /
                product.compareAtPrice) *
                100
            )}
            %
          </span>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleAddToWishlist}
            className={`p-3 rounded-full transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg hover:cursor-pointer ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white text-gray-900 hover:bg-primary hover:text-white"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>
          <Link
            href={`/shop/product/${product.id}`}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150 shadow-lg"
            aria-label="View details"
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link href={`/shop/product/${product.id}`}>
          <h3 className="text-base font-medium text-gray-900 mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-2">
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          <span className="text-sm font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
