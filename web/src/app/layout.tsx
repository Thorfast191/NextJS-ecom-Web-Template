import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "PoshmanStyle",
  description: "Premium Fashion Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
