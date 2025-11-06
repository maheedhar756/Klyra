import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectDB } from "../../../lib/db";
import Cart from "../../../models/Cart";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const cart = await Cart.findOne({ userId: session.user.id })
      .populate("items.productId");

    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId, quantity } = body;

    await connectDB();

    let cart = await Cart.findOne({ userId: session.user.id });
    
    if (!cart) {
      cart = new Cart({
        userId: session.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item: any) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    
    const populatedCart = await cart.populate("items.productId");
    return NextResponse.json(populatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    await Cart.findOneAndDelete({ userId: session.user.id });
    
    return NextResponse.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
