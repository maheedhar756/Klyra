"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: '/images/hero/slide1.jpg',
    title: 'New Collection',
    subtitle: 'Spring/Summer 2025',
    buttonText: 'Shop Now',
    buttonLink: '/shop/products'
  },
  {
    id: 2,
    image: '/images/hero/slide2.jpg',
    title: 'Top Trending',
    subtitle: 'Best Sellers',
    buttonText: 'View Collection',
    buttonLink: '/shop/products'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30">
            <div className="container mx-auto h-full flex items-center px-4">
              <div className="text-white max-w-2xl">
                <h2 className="text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-2xl mb-8">{slide.subtitle}</p>
                <Link
                  href={slide.buttonLink}
                  className="bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}