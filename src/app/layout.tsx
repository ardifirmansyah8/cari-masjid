import type { Metadata } from "next";
import { M_PLUS_1p } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import ReactQueryProvider from "@/components/Provider/ReactQueryProvider";

import "./globals.css";

const mplus = M_PLUS_1p({ weight: "500", subsets: ["latin"] });

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
      <body className={mplus.className}>
        <ReactQueryProvider>
          <Layout>{children}</Layout>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
