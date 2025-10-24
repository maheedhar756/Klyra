import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Klyra",
  description: "Luxury fashion store",
};

export default function RootLayout({ children }) : { JSX.Element } {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
