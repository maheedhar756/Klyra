import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request){
  try {
    const { name, email, password } = await request.json();
    if(!name || !email || !password)
      return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 });

    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}