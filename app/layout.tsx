import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Badger Studio",
  description: "A calm command center for creative work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
