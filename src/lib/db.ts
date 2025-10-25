import mongoose from "mongoose";
import { MongooseCache } from "../types/mongoose.types";

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };

export async function connectDB(): Promise<typeof mongoose | void> {
  if (cache.conn) return cache.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined");
    return;
  }
  if (!cache.promise){
    cache.promise = mongoose.connect(uri).then((mongooseInstance) => {
      cache.conn = mongooseInstance;
      return mongooseInstance;
    });
    global._mongooseCache = cache;
  }
  try {
    return await cache.promise;
  } catch (err) {
    cache.promise = null;
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}