import { Strategy } from './../../../../node_modules/openid-client/types/index.d';
import { CredentialsProvider } from './../../../../node_modules/next-auth/src/providers/credentials';
import NextAuth, { NextAuthOption } from "next-auth";
import { CredentialsProvider } from "next-auth/providers";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import { callback, session } from 'next-auth/src/core/routes';

connectDB();

export const authOptions: NextAuthOption = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials");

        const user = await User.findOne({ email: credentials.email }).lean();

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      session.user = {
        id: user.id as string,
        name: session.user?.name || "",
        
      }
    }
  }
}