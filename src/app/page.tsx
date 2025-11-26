"use client";

import HeroSlider from "../components/HeroSlider";
import FeaturedCategories from "../components/FeaturedCategories";
import ProductGrid from "../components/ProductGrid";
import NewsletterSection from "../components/NewsletterSection";
import TopRatedProducts from "../components/TopRatedProducts";
import Banner from "../components/Banner";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with DaisyUI */}
      <div className="hero min-h-[600px] bg-gradient-to-r from-primary to-secondary">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold">Welcome to Klyra! 🎨</h1>
            <p className="mb-5 text-xl">
              Discover luxury fashion with a splash of color. Premium quality meets vibrant style.
            </p>
            <Link href="/shop/products" className="btn btn-accent btn-lg gap-2">
              Start Shopping
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat place-items-center">
              <div className="stat-title">Products</div>
              <div className="stat-value text-primary">1,000+</div>
              <div className="stat-desc">Premium quality items</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Customers</div>
              <div className="stat-value text-secondary">50K+</div>
              <div className="stat-desc">Happy shoppers worldwide</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Reviews</div>
              <div className="stat-value text-accent">4.9/5</div>
              <div className="stat-desc">Average rating</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Shop by Category 🛍️</h2>
            <p className="text-lg text-base-content/70">Explore our curated collections</p>
          </div>
          <FeaturedCategories />
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="badge badge-secondary badge-lg mb-4">TRENDING</div>
            <h2 className="text-4xl font-bold mb-4">Featured Products ✨</h2>
            <p className="text-lg text-base-content/70">Handpicked just for you</p>
          </div>
          <ProductGrid />
        </div>
      </section>

      {/* Banner Section */}
      <Banner />

      {/* Top Rated Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="badge badge-accent badge-lg mb-4">TOP RATED</div>
            <h2 className="text-4xl font-bold mb-4">Customer Favorites ⭐</h2>
            <p className="text-lg text-base-content/70">Most loved by our community</p>
          </div>
          <TopRatedProducts />
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
