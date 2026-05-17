import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tudor Crișan | Transformation & High-Impact Consulting",
  description: "High-impact consultant solving painful, urgent, and expensive business bottlenecks. Bridging the gap between your current situation and desired outcome—rapidly, easily, and safely.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' rx='8' fill='black'/%3E%3Ctext x='16' y='22' font-family='sans-serif' font-weight='900' font-size='16' fill='white' text-anchor='middle'%3ETC.%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "Tudor Crișan | Transformation & High-Impact Consulting",
    description: "High-impact consultant solving painful, urgent, and expensive business bottlenecks. Bridging the gap between your current situation and desired outcome—rapidly, easily, and safely.",
    url: "https://tudorcrisan.dev",
    siteName: "Tudor Crișan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Transformation & High-Impact Consulting | Tudor Crișan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tudor Crișan | Transformation & High-Impact Consulting",
    description: "High-impact consultant solving painful, urgent, and expensive business bottlenecks. Bridging the gap between your current situation and desired outcome—rapidly, easily, and safely.",
    images: ["/og-image.png"],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} v2 scroll-smooth`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-accent/30">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* Global Background Elements */}
          <div className="fixed inset-0 -z-10 bg-grid opacity-40 dark:opacity-20" />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_50%)]" />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.05),transparent_50%)]" />
          
          <Navbar />
          {children}
          <Footer />
          
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
