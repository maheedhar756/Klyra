import { JSX } from "react";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";

export default function Home() : JSX.Element {
  return (
    <>
      <HeroSection />
      <ProductGrid />
    </>
  )
}