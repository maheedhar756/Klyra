"use client";

import { useCart } from "../../../../hooks/useCart";
import { formatPrice } from "../../../../lib/utils/index";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
        <Link
          href="/shop/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="relative w-24 aspect-square">
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <Link
                    href={`/shop/product/${item.id}`}
                    className="text-lg font-semibold hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.category}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-3 py-1 border rounded-l"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.max(1, parseInt(e.target.value))
                          )
                        }
                        className="w-16 px-3 py-1 border-t border-b text-center"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 border rounded-r"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-sm text-gray-600">
                      {formatPrice(item.price)} each
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>

              <Link
                href="/shop/checkout"
                className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}