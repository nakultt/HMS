import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--background)",
              color: "var(--foreground)",
            },
          }}
        />
      </body>
    </html>
  );
}
