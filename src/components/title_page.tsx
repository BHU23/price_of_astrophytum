import { DiVim } from "react-icons/di";
import Line from "./line";
interface TitlePageProp {
  name: string;
}
export default function TitlePage({ name }: TitlePageProp) {
  return (
    <div>
      <div className="text-gray-700 text-lg font-semibold dark:text-gray-200 my-6">
        {name}
      </div>
      
    </div>
  );
}
