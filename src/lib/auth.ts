import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export function createToken(user : UserType){
  const secret = process.env.JWT_SECRET;
  if(!secret) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    secret,
    { expiresIn: "7d" }
  );
}

export async function verifyToken(tokenFromClient?: string) : Promise<JwtPayload | string | null> {
  const cookieStore = await cookies();
  const token = tokenFromClient || cookieStore.get("token")?.value;
  if(!token) return Promise.resolve(null);

  const secret = process.env.JWT_SECRET;
  if(!secret) return Promise.resolve(null);

  try {
    return Promise.resolve(jwt.verify(token, secret) as JwtPayload | string) || Promise.resolve(jwt.verify(token, secret) as JwtPayload | string);
  } catch {
    return Promise.resolve(null);
  }
}

export async function isAdmin() : Promise<boolean> {
  const payload = await verifyToken();
  if(!payload || typeof payload === "string") return false;
  return Boolean((payload as JwtPayload & { role?: string }).role === "admin");
}