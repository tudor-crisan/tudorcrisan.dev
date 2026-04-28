import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tudor Crișan | Senior Frontend Developer",
  description: "Senior Frontend Developer with 12 years of experience specializing in React, Next.js, and Vue.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-background text-foreground antialiased selection:bg-accent/30">
        <div className="fixed inset-0 -z-10 bg-grid opacity-20" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        {children}
      </body>
    </html>
  );
}
