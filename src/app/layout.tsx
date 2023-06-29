import Navbar from "../../components/section/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../../components/section/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  viewport: {
    content:"width=device-width",
     initialScale:1.0 },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> 
      {/* <main className="px-28"> */}
        {children}
        {/* </main> */}
        <Footer/>
      </body>
    </html>
  );
}
