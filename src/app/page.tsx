"use client"
import BoxLanding from "@/components/box_landing";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Logo from "../../public/logo.png";
import LogoName from "../../public/LogoName.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchedRole = Cookies.get("role");
    if (fetchedRole) {
      setRole(fetchedRole);
    } else {
      console.warn("Role not found in cookies");
    }
  }, []);
  return (
    <main className="h-screen ">
      <div className="w-full h-[100%] relative flex flex-col justify-center items-center gap-4 px-5 -top-5">
        <div className="flex flex-row items-center justify-between ">
          <Image
            width={500}
            height={500}
            className="w-auto h-20 "
            src={Logo}
            alt="Logo"
          />
          <Image
            width={500}
            height={500}
            className="w-auto h-20"
            src={LogoName}
            alt=""
          />
        </div>
        <div className="text-cta-text font-medium text-lg overflow-hidden border-r-2 border-cta-text whitespace-nowrap animate-typing">
          <h1>This is AI for your Astrophytum asterias nudum.</h1>
        </div>

        <div className="text-cta-text  text-center">
          <span>
            Upload photos of Astrophytum Asterias Nudum to this website for
            instant identification and price estimation. Perfect for cactus
            enthusiasts and collectors.
          </span>
        </div>
        <div className="flex justify-between flex-col sm:flex-row">
          <BoxLanding
            Name="Classification"
            LinkTo={role ? `${role?.toLowerCase()}/use_ai` : "/login"}
            Description="Prediction of Price Astrophytum of Nudun."
          />
          <BoxLanding
            Name="Prompt"
            LinkTo={role ? `${role?.toLowerCase()}/use_ai` : "/login"}
            Description="Prompt for texts to help your write posts sale cactus."
          />
          <BoxLanding
            Name="Posts"
            LinkTo={role ? `${role?.toLowerCase()}/posts` : "/login"}
            Description="You can automated create posts to yours Facebook."
          />
        </div>
        <div className="flex gap-5 py-5 items-center">
          {/* {role ? `${role?.toLowerCase()}/use_ai` : "/login"} */}
          <button
            type="button"
            className="flex gap-2 justify-center items-center text-background font-bold bg-gradient-to-br from-pear to-tan hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-pear rounded-lg text-sm px-5 py-2.5 text-center w-full"
            onClick={() =>
              router.push(role ? `${role?.toLowerCase()}/dashboard` : "/login")
            }
          >
            Get started <FiArrowRight className="" />
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
