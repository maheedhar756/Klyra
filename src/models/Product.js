import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  stock: Number
}, { timeStamps: true });

export default mongoose.models.product || mongoose.model.product("product", productSchema);