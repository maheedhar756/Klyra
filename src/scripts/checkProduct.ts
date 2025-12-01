
import { connectDB } from "../lib/db";
import Product from "../models/Product";
import dotenv from "dotenv";

dotenv.config();

async function checkProduct() {
  try {
    await connectDB();
    const id = "6927d53acbb16e78ca618368";
    console.log(`Checking for product with ID: ${id}`);
    const product = await Product.findById(id);
    if (product) {
      console.log("Product found:", product);
    } else {
      console.log("Product NOT found in database.");
    }
  } catch (error) {
    console.error("Error checking product:", error);
  } finally {
    process.exit();
  }
}

checkProduct();
