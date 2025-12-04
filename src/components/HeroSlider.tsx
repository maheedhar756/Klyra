"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    image: '/images/hero/sli1.png',
    title: 'Summer Elegance',
    subtitle: 'Discover the new collection',
    buttonText: 'Shop Now',
    buttonLink: '/shop/products'
  },
  {
    id: 2,
    image: '/images/hero/sli2.png',
    title: 'Modern Classics',
    subtitle: 'Timeless pieces for every occasion',
    buttonText: 'View Lookbook',
    buttonLink: '/shop/products'
  },
  {
    id: 3,
    image: '/images/hero/sli3.png',
    title: 'New Arrivals',
    subtitle: 'Timeless pieces for every occasion',
    buttonText: 'View Lookbook',
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
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover opacity-80"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-linear-gradient-to-r from-black/60 to-transparent">
            <div className="container mx-auto h-full flex items-center px-4">
              <div className="max-w-xl text-white pl-4 md:pl-12 animate-in slide-in-from-left-10 duration-700 fade-in">
                <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm uppercase tracking-wider mb-6 backdrop-blur-sm">
                  New Arrivals
                </span>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-lg font-medium rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  {slide.buttonText}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-5 h-5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}