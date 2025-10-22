import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request){
  try {
    const { email, password } = await request.json();
    await connectDB();

    const User = await User.findOne({ email });
    if(!User)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const validUser = await bcrypt.compare(password, User.password);
    if(!validUser)
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });

    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const res = NextResponse( JSON.stringify ({ message: "Login successful"}), { status: 200 });
    res.cookies.set("token", token, { httpOnly: true, path: "/" })

    return res
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}