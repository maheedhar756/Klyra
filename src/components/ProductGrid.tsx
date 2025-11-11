'use client';

import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  _id: string;
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  images?: { url: string; alt: string }[];
  category: string;
  stock?: number;
  rating?: number;
  compareAtPrice?: number;
}

interface ProductGridProps {
  products?: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  // Transform products to match ProductCard interface
  const transformedProducts = products.map((product) => ({
    id: product.id || product._id,
    name: product.name,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    images: product.images || [{ url: product.image || '/placeholder.png', alt: product.name }],
    category: product.category,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {transformedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
