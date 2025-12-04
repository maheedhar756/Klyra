"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const collections = [
  {
    id: 1,
    title: "Men's Collection",
    image: "/images/collections/men's.png",
    link: "/shop/men",
    size: "small"
  },
  {
    id: 2,
    title: "Women's Collection",
    image: "/images/collections/women's.png",
    link: "/shop/women",
    size: "small"
  },
  {
    id: 3,
    title: "Accessories",
    image: "/images/collections/access.png",
    link: "/shop/accessories",
    size: "small"
  },
  {
    id: 4,
    title: "Footwear",
    image: "/images/collections/footwar.png",
    link: "/shop/footwear",
    size: "small"
  }
];

export default function CollectionsGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
           {collections.filter(c => c.size === 'small').map((collection) => (
            <Link 
              href={collection.link} 
              key={collection.id}
              className="group relative h-[300px] overflow-hidden block"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider group-hover:underline">
                  Shop Now <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
