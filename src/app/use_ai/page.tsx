import Line from "@/components/line";
import TitlePage from "@/components/title_page";

export default function UseAI() {
  return (
    <div className="w-full h-screen ">
      <div className="flex justify-center items-center">
        <TitlePage name="Classification Type" />
      </div>
      <Line/>
    </div>
  );
}
