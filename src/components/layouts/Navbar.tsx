"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MegaMenu from "../MegaMenu";
import CartPreview from "./CartPreview";
import { FaHeart, FaUser, FaSearch, FaBars } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { SHOP_CATEGORIES } from "@/lib/constants";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-2" : "bg-white py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars size={20} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
            Klyra
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <div 
              className="relative group" 
              onMouseEnter={() => setMegaOpen(true)} 
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Link 
                href="/shop" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
              >
                Shop
              </Link>
              {megaOpen && (
                <div className="absolute top-full left-0 w-[200px] pt-2">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2">
                    {SHOP_CATEGORIES.map((category) => (
                      <Link
                        key={category}
                        href={`/shop/products?category=${category}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        onClick={() => setMegaOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Journal
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <FaSearch size={18} />
            </button>

            <div className="hidden md:block">
              <Link href="/shop/wishlist" className="text-gray-600 hover:text-primary transition-colors" aria-label="Wishlist">
                <FaHeart size={18} />
              </Link>
            </div>

            <CartPreview />

            <div className="relative" ref={userMenuRef}>
              {session ? (
                <Link href="/account" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                  <FaUser size={18} />
                </Link>
              ) : (
                <Link href="/login" className="text-gray-600 hover:text-primary transition-colors">
                  <FaUser size={18} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 py-4 animate-in slide-in-from-top-2">
          <div className="container mx-auto px-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-1 focus:ring-primary text-gray-900 placeholder-gray-400"
                autoFocus
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                onClick={() => setIsSearchOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/" className="text-gray-700 font-medium">Home</Link>
            <Link href="/shop" className="text-gray-700 font-medium">Shop</Link>
            <Link href="/blog" className="text-gray-700 font-medium">Journal</Link>
            <Link href="/contact" className="text-gray-700 font-medium">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}