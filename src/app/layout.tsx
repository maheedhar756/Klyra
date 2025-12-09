import "./globals.css";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "./providers/NextAuthProvider";
import { WishlistProvider } from "../hooks/useWishlist";

export const metadata = {
  title: "Klyra",
  description: "Luxury fashion store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <WishlistProvider>
            <Navbar />
            <main className="min-h-screen pt-18">{children}</main>
            <Footer />
          </WishlistProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
