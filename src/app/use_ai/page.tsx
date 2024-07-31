import BoxType from "@/components/box_type";
import InputUploadImage from "@/components/input_upload_image";
import Line from "@/components/line";
import TitlePage from "@/components/title_page";
import TitleTopic from "@/components/title_topic";
import TotalPrice from "@/components/total_price";

export default function UseAI() {
  return (
    <div className="w-full h-auto lg:h-screen">
      <div className="flex justify-center items-center">
        <TitlePage name="Classification Type" />
      </div>
      <Line />
      <div className="flex flex-col md:flex-row md:justify-center md:flex-wrap my-8 gap-4 lg:gap-8">
        <div className="w-full lg:w-[46%]">
          <InputUploadImage />
        </div>
        <div className="w-full lg:w-[46%] p-2 flex flex-col justify-start h-[100%]">
          <div className="flex flex-col h-full">
            <div className="flex-none h-[10%]">
              <TitleTopic name="Types" />
              <Line />
            </div>
            <div className="flex flex-col h-auto lg:h-min-80 py-4 justify-start">
              <BoxType key="normal" typeName="normal" price={100} />
              <BoxType key="rensri" typeName="rensri" price={100} />
              <BoxType key="starshape" typeName="starshape" price={100} />
              <BoxType key="v_type" typeName="v_type" price={200} />
              <BoxType key="var" typeName="var" price={100} />
              <BoxType key="v_type" typeName="v_type" price={200} />
              <BoxType key="var" typeName="var" price={100} />
              <BoxType key="v_type" typeName="v_type" price={200} />
              <BoxType key="var" typeName="var" price={100} />
            </div>
            <div className="flex-none h-[10%]">
              <Line />
              <TotalPrice total="800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
