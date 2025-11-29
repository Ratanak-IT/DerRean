// app/layout.tsx
"use client";

import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/navbar/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Inter } from 'next/font/google'
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ['latin'], variable: '--font-primary' })

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/linkshow.png" as="image" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <WishlistProvider>
            <Navbar />
            <main className="font-primary">{children}</main>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: { background: "#13cd35", color: "#fff", borderRadius: "10px" },
              }}
            />
          </WishlistProvider>
        </UserProvider>
        <Footer/>
      </body>
    </html>
    
  );
}