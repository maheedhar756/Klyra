import mongoose from "mongoose";

let cached = global.mongoose

if(!cached){
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected");
    
  } catch (err) {
    console.error("MongoDB connection error: ", err)
  }
}