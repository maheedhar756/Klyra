import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/User"; // Assuming you have a User model defined
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    // To prevent user enumeration, always send a success message,
    // regardless of whether the email exists.
    if (!user) {
      return NextResponse.json({ message: "If a user with that email exists, a password reset link has been sent." }, { status: 200 });
    }

    // Generate a unique token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passwordResetExpires = Date.now() + 3600000; // 1 hour

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      // Configure your email service here
      // Example for Gmail (less secure apps need to be enabled or use App Passwords)
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Or for a custom SMTP server:
      // host: process.env.EMAIL_HOST,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>This link is valid for 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "If a user with that email exists, a password reset link has been sent." }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "An error occurred during the password reset request." }, { status: 500 });
  }
}
