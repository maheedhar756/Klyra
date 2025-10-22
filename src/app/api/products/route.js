import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET(){
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { name, price, image, description, category, stock } = await req.json();
    await connectDB();
    const newProduct = new Product({ name, price, image, description, category, stock });
    await newProduct.save();
    return NextResponse.json({ message: "Product created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}