
import ButtonItems from "../button_items";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import LogoName from "../../../public/LogoName.png";
import { useState } from "react";
import InputItems from "../input_items";
import { DropdownRoles } from "../dropdown_roles";
import { DropdownStyles } from "../dropdown_style";
import { useGlobal } from "@/context/useGlobal";


export default function SettingPrompt() {

  const { predictionHistoryGlobal, loading_prompt } = useGlobal();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const maxLength = 500;
  return (
    <div className="  h-auto lg:min-h-[calc(100vh-6rem)] w-full lg:min-w-[350px] lg:w-[350px] lg:h-auto p-5 pt-2 bg-card text-cta-text rounded-lg shadow-lg">
      <div className="pr-2 flex flex-row items-center justify-center">
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
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            className="text-cta-text font-semibold text-sm flex"
            htmlFor="description"
          >
            Add your message
            <span className="text-red-400 text-start text-sm"> *</span>
          </label>
          <textarea
            className="bg-gray-50 border pr-2 min-h-10 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
          [&:not(:placeholder-shown):invalid~span]:block 
          invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
          focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400"
            id="description"
            name="description"
            autoComplete="off"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={maxLength}
            required
          ></textarea>
          <div className="flex justify-between lg:flex-wrap text-sm text-gray-500">
            <span>
              {description.length}/{maxLength} characters
            </span>
            {description.length === maxLength && (
              <span className="text-red-400">Maximum characters reached</span>
            )}
          </div>
        </div>
        <div className="h-[1px] bg-cta-gray w-full" />
        <div className="flex flex-col gap-2">
          <label className="text-cta-text font-semibold text-sm flex ">
            Type <span className="text-red-400 text-start text-sm"> *</span>
          </label>
          <div
            className="min-h-16 bg-gray-50 border pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
                [&:not(:placeholder-shown):invalid~span]:block 
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
              focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400"
          >
            test
          </div>
        </div>
        <InputItems
          id="extra_value"
          autoComplete=""
          name={"Price/bath"}
          value={"0"}
          htmlFor={"extra_value"}
          type={"number"}
          placeholder="e.g. 60.5"
          handleChange={() => {}}
          pattern="^[1-9]\d*$"
          textError="Value can't null."
        ></InputItems>
        <div className="flex flex-col gap-2">
          <label
            className="text-cta-text font-semibold text-sm flex "
            htmlFor="dropzone-file"
          >
            Role
            <span className="text-red-400 text-start text-sm">*</span>
          </label>
          <DropdownRoles role={selectedRole} setRole={setSelectedRole} />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-cta-text font-semibold text-sm flex "
            htmlFor="dropzone-file"
          >
            Styles
            <span className="text-red-400 text-start text-sm">*</span>
          </label>
          <DropdownStyles style={selectedStyle} setStyle={setSelectedStyle} />
        </div>
        <ButtonItems
          name={"Generate"}
          onClick={() => {}}
          type={"submit"}
          withs={"full"}
          loading={loading_prompt}
        />
      </div>
    </div>
  );
}
