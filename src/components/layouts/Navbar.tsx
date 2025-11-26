"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import MegaMenu from "../MegaMenu";
import CartPreview from "./CartPreview";
import { FaHeart, FaUser, FaBars, FaSearch } from "react-icons/fa";
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  return (
    <header className="bg-white shadow-md">

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Klyra
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/shop" className="hover:text-blue-600">
              Shop
            </Link>
            <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
              <button aria-haspopup="menu" aria-expanded={megaOpen} className="hover:text-blue-600">Categories</button>
              {megaOpen && <MegaMenu isOpen={false} onClose={function (): void {
                throw new Error("Function not implemented.");
              } } />}
            </div>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <Link href="/shop/wishlist" className="p-2 hover:text-blue-600" aria-label="Wishlist"><FaHeart /></Link>
            </div>

            <CartPreview />

            <div className="relative" ref={userMenuRef}>
              {session ? (
                <div className="flex items-center">
                  <button aria-label="Open user menu" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100" onClick={() => { /* TODO: toggle user menu */ }}>
                    <FaUser />
                    <span className="hidden sm:inline">{session.user?.name ?? 'Account'}</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className="px-3 py-1 rounded hover:bg-gray-100">Sign in</Link>
                  <Link href="/register" className="px-3 py-1 rounded hover:bg-gray-100">Register</Link>
                </>
              )}
            </div>

            {/* Mobile search toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsSearchOpen((s) => !s)} aria-label="Open search" className="p-2"><FaSearch /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/shop" className="hover:text-blue-600">
                Shop
              </Link>
              <Link href="/categories" className="hover:text-blue-600">
                Categories
              </Link>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      <ThemeSwitcher />
    </header>
  );
}