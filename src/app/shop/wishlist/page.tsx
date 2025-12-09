"use client";

import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, HeartOff } from "lucide-react";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success("Moved to cart");
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <HeartOff className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like you haven't added anything to your wishlist yet. Explore
          our collection and find something you love!
        </p>
        <Link href="/shop">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-3/4 bg-gray-100">
              {product.images?.[0]?.url ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="p-4">
              <Link href={`/shop/product/${product.id}`}>
                <h3 className="font-medium text-gray-900 mb-2 truncate hover:text-primary">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg">
                  {formatPrice(product.price)}
                </span>
              </div>

              <Button
                className="w-full gap-2"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag size={16} />
                Move to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
