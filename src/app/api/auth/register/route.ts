import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { RegisterPayload } from "../../../../types/auth.types";

export async function POST(request : Request) {
  try {
    const { name, email, password } : RegisterPayload = await request.json();
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
    return NextResponse.json({ message: "User registered successfully", newUser }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message }, { status: 500 });
  }
}