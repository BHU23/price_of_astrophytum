"use client";
import { useGlobal } from "@/context/useGlobal";
import "../../globals.css";

import Breadcrumb from "@/components/layout/breadcrumbs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { breadcrumbLinks } = useGlobal();
  return (
    <div className="flex flex-1">
        <div className="flex flex-col">
          <Breadcrumb links={breadcrumbLinks} />
          {children}
        </div>
    </div>
  );
}