import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "At Home Tyre - Premium Tyres for Every Journey",
  description: "Buy premium tyres online at At Home Tyre. Wide range of car, bike, truck and commercial tyres with best prices and warranty.",
  keywords: ["tyres", "car tyres", "bike tyres", "truck tyres", "online tyre store", "At Home Tyre"],
  authors: [{ name: "At Home Tyre Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "At Home Tyre - Premium Tyres for Every Journey",
    description: "Buy premium tyres online at At Home Tyre. Wide range of car, bike, truck and commercial tyres with best prices and warranty.",
    url: "https://athometyre.com",
    siteName: "At Home Tyre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "At Home Tyre - Premium Tyres for Every Journey",
    description: "Buy premium tyres online at At Home Tyre. Wide range of car, bike, truck and commercial tyres with best prices and warranty.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
