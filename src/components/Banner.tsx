"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="relative h-[400px] my-16">
      <Image
        src="/images/banner/main-banner.jpg"
        alt="Special Offer"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="container mx-auto h-full flex items-center px-4">
          <div className="text-white max-w-xl">
            <span className="text-lg mb-4 block">Limited Time Offer</span>
            <h2 className="text-5xl font-bold mb-6">Season Sale</h2>
            <p className="text-xl mb-8">Up to 50% Off New Arrivals</p>
            <Link
              href="/shop/products"
              className="inline-block bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
