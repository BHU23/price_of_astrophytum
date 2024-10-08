import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // อย่าลืม import CSS ของ react-toastify
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { Providers } from "./providers";
import { GlobalProvider } from "@/context/useGlobal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cactis AI",
  description: "Generated by create next app",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Providers>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              className=""
            />
            <Header />
            <div className="flex pt-16 w-full h-auto ">
              <div className="w-full h-auto min-h-[100vh] ">{children}</div>
            </div>
          </Providers>
        </GlobalProvider>
      </body>
    </html>
  );
}
