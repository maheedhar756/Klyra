"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/utils/index";

export default function CartPreview() {
  const { items, total, removeItem } = useCart() as any;
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-expanded={open ? 'true' : 'false'}
        aria-label="Open cart preview"
        onClick={() => setOpen((v) => !v)}
        className="p-2 hover:text-blue-600"
      >
        <span className="sr-only">Cart</span>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4h-2l-1 2h2l1.6 7.59a3 3 0 0 0 2.94 2.41h7.96v-2H10.54a1 1 0 0 1-.98-.79L8.3 6H20V4H7z" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {items?.length || 0}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h4 className="font-semibold mb-3">Cart</h4>
            {(!items || items.length === 0) && (
              <p className="text-sm text-gray-600">Your cart is empty.</p>
            )}

            {items && items.length > 0 && (
              <div className="space-y-3 max-h-56 overflow-auto">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 relative rounded overflow-hidden bg-gray-100">
                      {item.images?.[0]?.url && (
                        <Image src={item.images[0].url} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 mt-1">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{formatPrice(total || 0)}</span>
              </div>
              <div className="flex gap-2">
                <Link href="/shop/cart" className="flex-1 text-center px-3 py-2 border rounded">View Cart</Link>
                <Link href="/shop/checkout" className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded">Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
