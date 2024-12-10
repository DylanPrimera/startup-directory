import type { Metadata } from "next";
import "./globals.css";
import { workSans } from "@/config/font";
import 'easymde/dist/easymde.min.css';
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: "ST Directory",
  description: "Grow your startup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
