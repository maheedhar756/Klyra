import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(){
  const user = verifyToken();
  if(!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ user })
}