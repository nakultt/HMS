import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hack·Track — Hackathon Management System",
  description:
    "Manage hackathon submissions, track team progress, and organize judging rounds with a powerful data-driven dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              border: "2px solid black",
              borderRadius: "0",
              boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
              fontWeight: 700,
              background: "white",
              color: "black",
            },
          }}
        />
      </body>
    </html>
  );
}
