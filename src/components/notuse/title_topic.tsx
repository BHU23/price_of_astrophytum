interface TitleTopicProp {
  name: string;
}
export default function TitleTopic({ name }: TitleTopicProp) {
  return (
    <div>
      <div className="flex justify-items-start text-cta-gray text-sm font-semibold">
        {name}
      </div>
    </div>
  );
}
