import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "FreeExamPrep",
  description:
    "A modern TELC-style exam practice platform with free public access, login-based progress tracking, uploads, and community support.",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
