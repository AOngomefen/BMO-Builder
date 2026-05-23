import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BMO Builder — Your AI Build Assistant",
  description:
    "Personal AI assistant for coding, planning, and task management. Built with Claude + Next.js.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
