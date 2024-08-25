import BoxType from "@/components/use_ai/box_type";
import Line from "@/components/line";
import TitleTopic from "@/components/notuse/title_topic";
import TotalPrice from "@/components/use_ai/total_price";
import useUploadImage from "../hook/upload_image.hook";

interface ResultClassificationProp {}

export default function ResultClassification({}: ResultClassificationProp) {
  const {
    predictions,
    loading,
    setLoading,
    predictionHistory,
    setPredictionHistory,
    handleUpload,
  } = useUploadImage().uploadImageItem;
  return (
    <div className="w-full flex flex-col justify-start h-[100%] gap-5">
      <span className="text-cta-text font-semibold text-sm">
        Result of prediction image
      </span>
      <div className="flex flex-col h-full gap-5">
        {loading ? (
          <div className="transition-all text-center text-cta-gray">
            Loading...
          </div>
        ) : (
          <div className="transition-all text-center text-cta-gray">
            Please upload the Nudum image.
          </div>
        )}
        {!loading && predictionHistory && (
          <>
            <TitleTopic name="Types" />
            <Line />
            <div className="flex flex-col h-auto lg:h-min-80 gap-5 justify-start">
              {predictionHistory?.class.map(
                ({ name, example_image, description, price }, index) => (
                  <BoxType
                    key={index}
                    image={example_image} // Use example_image here
                    description={description}
                    typeName={name ?? ""}
                    price_min={price.value_min} // Access the nested value
                    price_max={price.value_max} // Access the nested value
                  />
                )
              )}
            </div>
            <Line />
            <div className="flex-none h-[10%] ">
              <TotalPrice
                total="800"
                price_min={predictionHistory.total_min}
                price_max={predictionHistory.total_max}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
