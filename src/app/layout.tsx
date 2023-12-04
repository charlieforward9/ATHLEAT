import ConfigureAmplifyClientSide from "@/utils/ConfigureAmplifyClientSide";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Knewave } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATHLEAT",
  description: "Your personalized fitness and nutrition tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConfigureAmplifyClientSide />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
