import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";

const myFont = localFont({
  src: "./Manorah.ttf",
  variable: "--font-thai",
});
const thaiNum = localFont({
  src: "./THSarabunIT9.ttf",
  variable: "--font-thai-num",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "สุภาพบุรุษโจ๋ทาเทพ",
  icons: [
    {
      rel: "icon",
      url: "/icon.png",
    },
  ],
  openGraph: {
    title: "สุภาพบุรุษโจ๋ทาเทพ",
    images: ["https://jo67.shalluv.com/og.webp"],
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
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-lg relative mx-auto",
          inter.variable,
          myFont.variable,
          thaiNum.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
