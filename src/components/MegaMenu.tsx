import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category, SubCategory } from '../types/category';
import { categoryService } from '../services/categoryService';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Failed to load categories');
        console.error('Error loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 p-6">
        <div className="container mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 p-6">
        <div className="container mx-auto text-red-500">
          {error}
        </div>
      </div>
    );
  }

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
                <div key={category._id} className="space-y-2">
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
                      key={sub._id}
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
              {categories
                .filter(category => category.featured)
                .slice(0, 2)
                .map(category => (
                  <div key={category._id} className="group">
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Link 
                      href={`/shop/products?category=${category.slug}`}
                      className="text-sm font-medium text-gray-800 hover:text-primary-600 transition-colors"
                      onClick={onClose}
                      role="menuitem"
                    >
                      {category.name}
                    </Link>
                  </div>
                ))}
              {categories.filter(category => category.featured).length === 0 && (
                <p className="text-sm text-gray-500">No featured categories</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;