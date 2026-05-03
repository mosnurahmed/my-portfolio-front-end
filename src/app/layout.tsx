import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Mosnur Ahmed — Mid-level Software Engineer",
  description:
    "Senior software engineer building production-grade apps with React, Next.js, React Native, Flutter and the MERN stack. Based in Dhaka, Bangladesh.",
  keywords: [
    "Mosnur Ahmed",
    "Mid-level Software Engineer",
    "React Native",
    "Next.js",
    "MERN Stack",
    "Flutter",
    "Frontend Developer",
    "Bangladesh",
  ],
  authors: [{ name: "Mosnur Ahmed" }],
  openGraph: {
    title: "Mosnur Ahmed — Mid-level Software Engineer",
    description:
      "Crafting fast, beautiful, and reliable products across web and mobile.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "rgba(15,18,32,0.95)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
