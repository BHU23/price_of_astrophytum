"use client";
import "../globals.css";
import Footer from "@/components/layout/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-1">
          {children}
    </div>
  );
}
