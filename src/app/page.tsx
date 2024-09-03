import BoxLanding from "@/components/box_landing";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Logo from "../../public/logo.png";
import LogoName from "../../public/LogoName.png";

export default function Home() {
  
  return (

    <main className="h-screen ">
      <div className="w-full h-[90%] flex flex-col justify-center items-center gap-4 px-5">
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
            LinkTo="/use_ai"
            Description="Prediction of Price Astrophytum of Nudun."
          />
          <BoxLanding
            Name="Prompt"
            LinkTo="/use_ai"
            Description="Prompt for texts to help your write posts sale cactus."
          />
          <BoxLanding
            Name="Posts"
            LinkTo="/posts"
            Description="You can automated create posts to yours Facebook."
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
