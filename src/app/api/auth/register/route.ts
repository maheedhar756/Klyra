import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZmVlZmY4ZTcwNDBkNGU2ZWEyMjMyYiIsImlhdCI6MTc2MTUzODY0MywiZXhwIjoxNzYyMTQzNDQzfQ.e1-mKRr3CuQCTNRIQI1fJDa9pBGqrVVGvAQwNyn3nz8