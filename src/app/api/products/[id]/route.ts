import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { isAdmin } from "../../../../lib/auth";
import Product from "../../../../models/Product";

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if(!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ product });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500})
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }){
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
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500})
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if(!isAdmin()){
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await connectDB();
    const deleted = await Product.findByIdAndDelete(params.id);
    if(!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ message: "Product deleted successfuly" }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500})
  }
}