import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  // Add other product properties as needed
}

interface WishlistItem {
  id: string; // ID of the wishlist item itself
  product: Product;
  // Add other wishlist item properties if necessary, e.g., `addedDate`
}

interface WishlistProductsProps {
  wishlist: WishlistItem[];
}

const WishlistProducts: React.FC<WishlistProductsProps> = ({ wishlist }) => {
  if (!wishlist || wishlist.length === 0) {
    return <p className="text-center text-gray-600">Your wishlist is empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlist.map((item) => (
        <div key={item.product.id} className="border rounded-lg shadow-sm overflow-hidden bg-white">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
            <p className="text-gray-700 mt-1">${item.product.price.toFixed(2)}</p>
            {/* You can add more product details or actions here, e.g., "Add to Cart" button */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistProducts;
