import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "한입 링크",
    template: "%s | 한입 링크",
  },
  description: "나만의 링크를 저장하고 관리해보세요",
  openGraph: {
    title: "한입 링크",
    description: "나만의 링크를 저장하고 관리해보세요",
    images: [{ url: "/thumbnail.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "한입 링크",
    description: "나만의 링크를 저장하고 관리해보세요",
    images: ["/thumbnail.png"],
  },
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
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
