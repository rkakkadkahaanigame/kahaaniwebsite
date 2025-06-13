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
      <body className={`${inter.className} h-screen flex flex-col overflow-hidden`}>
        <Header />
        <div
          className="flex-1 relative"
          style={{
            backgroundImage: 'url(/feature-graphic.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: 'var(--header-height, 112px)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'white',
              opacity: 0.9,
              zIndex: 1,
            }}
          />
          <div className="relative z-10 h-full">
            {children}
          </div>
        </div>
        <div className="relative z-20">
          <Footer />
        </div>
      </body>
    </html>
  );
}
