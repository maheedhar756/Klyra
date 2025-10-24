import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req, { params }){
  try {
    await connectDB();
    const { id } = params;
    const { role } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    if(!updatedUser){
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Role updated successfully", updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating role", error: error.message }, {status: 500 });
  }
}