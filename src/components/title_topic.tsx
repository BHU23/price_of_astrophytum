interface TitleTopicProp {
  name: string;
}
export default function TitleTopic({ name }: TitleTopicProp) {
  return (
    <div>
      <div className="flex justify-items-start text-gray-700 text-lg font-semibold dark:text-gray-200 mb-6">
        {name}
      </div>
    </div>
  );
}
