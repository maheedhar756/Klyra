import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ message: "JWT_SECRET is not defined" }, { status: 500 });

    const { email, password } = await request.json();
    await connectDB();

    const user = await User.findOne({ email });
    if(!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const validUser = await bcrypt.compare(password, user.password);
    if(!validUser) return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });

    const token = jwt.sign({ id: user._id.toString() }, secret, { expiresIn: "7d" });

    const payloader = { id: user._id.toString(), email: user.email }
    const res = NextResponse.json({ message: "Login successful", user: payloader, token }, { status: 200 });
    res.cookies.set("token", token, { httpOnly: true, path: "/", sameSite: "lax", secure: process.env.NODE_ENV === "production" });

    return res
  } catch (error : unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message }, { status: 500 });
  }
}