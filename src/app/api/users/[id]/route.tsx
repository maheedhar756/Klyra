import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }){
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
    console.error("Error updating role:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message }, { status: 500 });
  }
}