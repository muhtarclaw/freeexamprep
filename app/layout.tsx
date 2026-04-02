import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const themeScript = `
(() => {
  const storageKey = "theme-preference";
  const savedTheme = localStorage.getItem(storageKey) || "system";
  const resolvedTheme =
    savedTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : savedTheme;

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
})();
`;

export const metadata: Metadata = {
  title: "FreeExamPrep",
  description:
    "A modern German exam practice platform for TELC, fide, Goethe, and more with free sample access, saved progress, and community support.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
