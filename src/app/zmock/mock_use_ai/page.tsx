import InputUploadImage from "@/components/notuse/input_upload_image";
// import Line from "@/components/notuse/line";
import TitlePage from "@/components/notuse/title_page";

export default function Home() {
  return (
    <main className="h-screen">
      <div className="w-full h-auto lg:h-screen">
        <div className="flex justify-center items-center">
          <TitlePage name="Hi! I CAN HELP YOU." />
        </div>
        {/* <Line /> */}
        <div className="flex flex-col md:flex-row md:justify-center md:flex-wrap my-8 gap-4 lg:gap-8">
          <div className="w-full lg:w-[46%]">
            <InputUploadImage nameButton="Upload Image" />
          </div>
        </div>
      </div>
    </main>
  );
}
