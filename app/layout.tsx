import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kahaani",
  description: "Kahaani - Coming Soon. A new storytelling experience is on its way!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={`${inter.className} min-h-screen pb-20`}>
        <Header />
        <div
          style={{
            position: 'relative',
            backgroundImage: 'url(/feature-graphic.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'white',
              opacity: 0.9,
              zIndex: 1,
            }}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
