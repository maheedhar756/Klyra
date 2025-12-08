import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

async function seedUsers() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@klyra.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: 'admin@klyra.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created: admin@klyra.com / admin123');
    }

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
    } else {
      // Create test user
      const hashedPassword = await bcrypt.hash('test123', 10);
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user'
      });
      console.log('✅ Test user created: test@example.com / test123');
    }

    console.log('\n🎉 Database seeding completed!');
    console.log('\nYou can now login with:');
    console.log('Admin: admin@klyra.com / admin123');
    console.log('User: test@example.com / test123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedUsers();
