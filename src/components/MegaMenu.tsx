import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/category';
import { categoryService } from '@/services/categoryService';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white shadow-lg z-50"
      onMouseLeave={onClose}
    >
      <div 
        className="container mx-auto py-6"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="categories-button"
      >
        <div className="grid grid-cols-4 gap-8">
          {/* Categories Section */}
          <div className="col-span-3">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="grid grid-cols-3 gap-6">
              {categories.map((category: Category) => (
                <div key={category.id} className="space-y-2">
                  <Link 
                    href={`/shop/products?category=${category.slug}`}
                    className="block font-medium text-gray-800 hover:text-primary-600 transition-colors"
                    onClick={onClose}
                    role="menuitem"
                  >
                    {category.name}
                  </Link>
                  {category.subcategories?.map((sub: SubCategory) => (
                    <Link
                      key={sub.id}
                      href={`/shop/products?category=${category.slug}&subcategory=${sub.slug}`}
                      className="block text-sm text-gray-600 hover:text-primary-600 transition-colors pl-2"
                      onClick={onClose}
                      role="menuitem"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Featured Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Featured</h3>
            <div className="space-y-4">
              <div className="group">
                <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
                  <Image
                    src="/images/featured/new-arrivals.jpg"
                    alt="New Arrivals"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Link 
                  href="/shop/products?collection=new-arrivals"
                  className="text-sm font-medium text-gray-800 hover:text-primary-600 transition-colors"
                  onClick={onClose}
                  role="menuitem"
                >
                  New Arrivals
                </Link>
              </div>
              <div className="group">
                <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
                  <Image
                    src="/images/featured/trending.jpg"
                    alt="Trending Now"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Link 
                  href="/shop/products?collection=trending"
                  className="text-sm font-medium text-gray-800 hover:text-primary-600 transition-colors"
                  onClick={onClose}
                  role="menuitem"
                >
                  Trending Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;