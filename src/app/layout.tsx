import "./globals.css";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import NextAuthProvider from "./providers/NextAuthProvider";


export const metadata = {
  title: "Klyra",
  description: "Luxury fashion store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Navbar />
          <main className="min-h-screen pt-18">{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
