import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: String,
  stock: Number
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);