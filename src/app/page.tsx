import HeroSlider from "../components/HeroSlider";
import CollectionsGrid from "../components/CollectionsGrid";
import ProductGrid from "../components/ProductGrid";
import NewsletterSection from "../components/NewsletterSection";
import { connectDB } from "../lib/db";
import Product from "../models/Product";

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).limit(8).lean();
    return { products: JSON.parse(JSON.stringify(products)), error: null };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [], error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export default async function HomePage() {
  const { products, error } = await getProducts();

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-24 px-4">
        <div className="alert alert-error">
          <span>Error loading products: {error}</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />
      <CollectionsGrid />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <ProductGrid products={products} />
      </div>
      <NewsletterSection />
    </main>
  );
}
