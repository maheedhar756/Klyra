import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import Product from "@/models/Product";

export async function GET(_, { params }){
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if(!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500})
  }
}

export async function PUT(req, { params }){
  try {
    if(!isAdmin()){
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { name, price, image, description, category, stock } = await req.json();
    await connectDB();
    const product = await Product.findById(params.id);
    if(!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    product.category = category;
    product.stock = stock;

    await product.save();
    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(_, { params }) {
  try {
    if(!isAdmin()){
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await connectDB();
    const deleted = await Product.findByIdAndDelete(params.id);
    if(!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ message: "Product deleted successfuly" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}