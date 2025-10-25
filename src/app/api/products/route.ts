import { NextRequest, NextResponse } from "next/server";
import Product from "../../../models/Product";
import { isAdmin } from "../../../lib/auth";
import { connectDB } from "../../../lib/db";

export async function GET(){
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ products });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}