"use client";

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: "Women's Fashion",
    image: "/images/categories/women.jpg",
    slug: "womens-fashion",
    itemCount: 450
  },
  {
    id: 2,
    name: "Men's Collection",
    image: "/images/categories/men.jpg",
    slug: "mens-collection",
    itemCount: 380
  },
  {
    id: 3,
    name: "Accessories",
    image: "/images/categories/accessories.jpg",
    slug: "accessories",
    itemCount: 230
  },
  {
    id: 4,
    name: "Footwear",
    image: "/images/categories/footwear.jpg",
    slug: "footwear",
    itemCount: 120
  }
];

export default function FeaturedCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link 
          href={`/shop/products?category=${category.slug}`}
          key={category.id}
          className="group relative overflow-hidden block"
        >
          <div className="aspect-square relative">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity group-hover:bg-opacity-20" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-sm opacity-90">{category.itemCount} Items</p>
          </div>
        </Link>
      ))}
    </div>
  );
}