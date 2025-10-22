import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function createToken(user){
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(){
  const token = cookies().get("token")?.value;
  if(!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    null
  }
}

export function isAdmin(){
  const user = verifyToken();
  return user && user.role === "admin";
}