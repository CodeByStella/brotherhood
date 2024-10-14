// RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/Components/Main/Navbar";
import StoreProvider from "@/redux/StoreProvider";
import Footer from "@/Components/Main/Footer";
import WaveEffectProvider from "@/Components/Main/WaveEffectProvider"; // Import the new component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brotherhood",
  description: "A collaborative and Knowledge sharing Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <StoreProvider>
            <WaveEffectProvider> {/* Wrap children with WaveEffectProvider */}
              <Navbar />
              <section>
                {children}
              </section>
              <Footer />
            </WaveEffectProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}