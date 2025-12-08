"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { SHOP_CATEGORIES } from "@/lib/constants";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/utils/index";
import { SearchIcon } from "../icons/SearchIcon";
import { HeartIcon } from "../icons/HeartIcon";
import { UserIcon } from "../icons/UserIcon";
import { ShoppingCartIcon } from "../icons/ShoppingCartIcon";
import { MenuIcon } from "../icons/MenuIcon";

function CartPreview() {
  const { items, total, removeItem } = useCart() as any;
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-expanded={open ? 'true' : 'false'}
        aria-label="Open cart preview"
        onClick={() => setOpen((v) => !v)}
        className="p-2 hover:text-blue-600 hover:cursor-pointer"
      >
        <span className="sr-only">Cart</span>
        <ShoppingCartIcon className="size-5" />
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full size-4 flex items-center justify-center">
          {items?.length || 0}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h4 className="font-semibold mb-3">Cart</h4>
            {(!items || items.length === 0) && (
              <p className="text-sm text-black-600">Your cart is empty.</p>
            )}

            {items && items.length > 0 && (
              <div className="space-y-3 max-h-56 overflow-auto">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 relative rounded overflow-hidden bg-gray-100">
                      {item.images?.[0]?.url && (
                        <Image src={item.images[0].url} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 mt-1">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{formatPrice(total || 0)}</span>
              </div>
              <div className="flex gap-2">
                <Link href="/shop/cart" className="flex-1 text-center px-3 py-2 border rounded">View Cart</Link>
                <Link href="/shop/checkout" className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded">Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
        "fixed top-0 left-0 right-0 z-10 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-2" : "bg-white py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-black-600 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon size={20} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
            Klyra
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-black-600 hover:text-primary transition-colors">
              Home
            </Link>
            <div 
              className="relative group" 
              onMouseEnter={() => setMegaOpen(true)} 
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Link 
                href="/shop" 
                className="text-sm font-medium text-black-600 hover:text-primary transition-colors py-2"
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
                        className="block px-4 py-2 text-sm text-black-600 hover:bg-gray-50 hover:text-primary transition-colors"
                        onClick={() => setMegaOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/blog" className="text-sm font-medium text-black-600 hover:text-primary transition-colors">
              Journal
            </Link>
            <Link href="/contact" className="text-sm font-medium text-black-600 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-black-600 hover:text-primary transition-colors font-bold hover:cursor-pointer p-2 rounded"
              aria-label="Search"
            >
              <SearchIcon size={18} />
            </button>

            <div className="hidden md:block">
              <Link href="/shop/wishlist" className="text-black-600 hover:text-primary transition-colors" aria-label="Wishlist">
                <HeartIcon size={18} />
              </Link>
            </div>

            <CartPreview />

            <div className="relative" ref={userMenuRef}>
              {session ? (
                <Link href="/account" className="flex items-center gap-2 text-black-600 hover:text-primary transition-colors">
                  <UserIcon size={18} />
                </Link>
              ) : (
                <Link href="/login" className="text-black-600 hover:text-primary transition-colors">
                  <UserIcon size={18} />
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
            <Link href="/" className="text-black-600 font-medium">Home</Link>
            <Link href="/shop" className="text-black-600 font-medium">Shop</Link>
            <Link href="/blog" className="text-black-600 font-medium">Journal</Link>
            <Link href="/contact" className="text-black-600 font-medium">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}