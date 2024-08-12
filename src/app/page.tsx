import BoxLanding from "@/components/box_landing";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <main className="h-screen">
      <div className="w-full h-[90%] flex flex-col justify-center items-center gap-4">
        <div className="flex flex-row items-center justify-between">
          <img
            className="w-auto h-20"
            src={
              "https://img2.pic.in.th/pic/Minimalist_Mascot_Camera_Logo-removebg-preview2c.png"
            }
            alt="Logo"
          />

          <img
            className="w-auto h-20"
            src={
              "https://img5.pic.in.th/file/secure-sv1/Remove-bg.ai_172319125922822.png"
            }
            alt=""
          />
        </div>
        <div className="text-cta-text font-medium text-lg">
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
