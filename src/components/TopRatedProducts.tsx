"use client";

import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    price: 199.99,
    rating: 4.8,
    reviews: 128,
    image: "/images/products/leather-jacket.jpg"
  },
  {
    id: 2,
    name: "Premium Denim Jeans",
    price: 89.99,
    rating: 4.9,
    reviews: 96,
    image: "/images/products/jeans.jpg"
  },
  {
    id: 3,
    name: "Casual Sneakers",
    price: 129.99,
    rating: 4.7,
    reviews: 156,
    image: "/images/products/sneakers.jpg"
  },
  {
    id: 4,
    name: "Designer Watch",
    price: 299.99,
    rating: 4.9,
    reviews: 84,
    image: "/images/products/watch.jpg"
  }
];

export default function TopRatedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          href={`/shop/product/${product.id}`}
          key={product.id}
          className="group"
        >
          <div className="relative aspect-square mb-4 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>
          <p className="text-xl font-bold text-blue-600">${product.price}</p>
        </Link>
      ))}
    </div>
  );
}