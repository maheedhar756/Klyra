import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {connectDB} from "../../../../lib/db";
import UserModel from "../../../../models/User"; // renamed to avoid confusion between types and model

connectDB();

// -----------------------------
// 1️⃣ Define TypeScript types
// -----------------------------
interface AppUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

interface Credentials {
  email: string;
  password: string;
}

// -----------------------------
// 2️⃣ Define NextAuth config
// -----------------------------
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        console.log("credentials", credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password");
        }


        const user = (await UserModel.findOne({ email: credentials.email }).lean()) as AppUser | null;
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password || "");
        if (!isValid) throw new Error("Invalid password");

        // Returned object becomes `user` in jwt/session callbacks
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        } as NextAuthUser & { id: string; role: string };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/(auth)/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
