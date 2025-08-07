import ReactQueryProvider from './ReactQueryProvider';

import type { Metadata } from "next";
import "@fontsource/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebClock",
  description: "FEM for WebClock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-inter antialiased">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
