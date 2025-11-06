"use client";

import HeroSlider from "../components/HeroSlider";
import FeaturedCategories from "../components/FeaturedCategories";
import ProductGrid from "../components/ProductGrid";
import NewsletterSection from "../components/NewsletterSection";
import TopRatedProducts from "../components/TopRatedProducts";
import Banner from "../components/Banner";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      
      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <FeaturedCategories />
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <ProductGrid />
        </div>
      </section>

      {/* Banner Section */}
      <Banner />

      {/* Top Rated Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Rated</h2>
          <TopRatedProducts />
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
