import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  stock: Number
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);