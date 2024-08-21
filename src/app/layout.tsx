import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import ReactQueryProvider from "@/components/Provider/ReactQueryProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cari Masjid",
  description: "Website cari masjid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Layout>{children}</Layout>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
