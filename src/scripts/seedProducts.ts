import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import User from '@/models/User';

const products = [
  {
    name: "Luxury Leather Handbag",
    price: 1299.90,
    image: "/images/products/luxury_handbag.jpg",
    description: "Handcrafted from the finest Italian leather, this handbag features a timeless design with gold-tone hardware. Spacious interior with multiple compartments.",
    category: "Accessories",
    stock: 15
  },
  {
    name: "Premium Chronograph Watch",
    price: 899.50,
    image: "/images/products/premium_watch.jpg",
    description: "A masterpiece of engineering, this chronograph watch features a sapphire crystal face, genuine leather strap, and precise Swiss movement.",
    category: "Accessories",
    stock: 8
  },
  {
    name: "Designer Gold Sunglasses",
    price: 349.00,
    image: "/images/products/designer_sunglasses.jpg",
    description: "Elevate your style with these designer sunglasses. Featuring UV400 protection and a lightweight gold-tone frame for all-day comfort.",
    category: "Accessories",
    stock: 25
  },
  {
    name: "Classic Leather Oxfords",
    price: 249.99,
    image: "/images/products/leather_shoes.jpg",
    description: "Essential for the modern gentleman, these Oxford shoes are crafted from full-grain leather with a durable leather sole. Perfect for formal occasions.",
    category: "Footwear",
    stock: 40
  }
];

async function seedProducts() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Find the admin user to assign as creator
    const adminUser = await User.findOne({ email: 'admin@klyra.com' });
    if (!adminUser) {
      console.error('Admin user not found. Please run seed:users first.');
      process.exit(1);
    }

    console.log('Clearing existing products...');
    await Product.deleteMany({});

    console.log('Seeding products...');
    const productsWithUser = products.map(product => ({
      ...product,
      createdBy: adminUser._id
    }));

    await Product.insertMany(productsWithUser);

    console.log('✅ Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
