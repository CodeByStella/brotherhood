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
      <head>
        {/* Add your global scripts and styles */}
        <link rel="stylesheet" href="/richtexteditor/rte_theme_default.css" />
        <script src="/richtexteditor/rte.js" ></script>
        <script src='/richtexteditor/plugins/all_plugins.js' ></script>
      </head>
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