"use client";

import Link from "next/link";
import { Youtube } from "lucide-react";
import { FacebookIcon } from "../icons/FacebookIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { InstagramIcon } from "../icons/InstagramIcon";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <address className="not-italic">
              <p className="mb-2">123 Main Street</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-2">Phone: +1 234 567 89 00</p>
              <p className="mb-2">Email: info@allaia.com</p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-gray-300">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-gray-300">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/clothes" className="hover:text-gray-300">
                  Clothes
                </Link>
              </li>
              <li>
                <Link
                  href="/category/electronics"
                  className="hover:text-gray-300"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/category/furniture"
                  className="hover:text-gray-300"
                >
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/category/shoes" className="hover:text-gray-300">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/category/watches" className="hover:text-gray-300">
                  Watches
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Keep in touch</h3>
            <form className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <FacebookIcon size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <TwitterIcon size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <InstagramIcon size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>© 2025 Allaia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
