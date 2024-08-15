interface ButtonUploadProps {
  name: string;
  onClick: () => void; // Add onClick prop
}

export default function ButtonUpload({ name, onClick }: ButtonUploadProps) {
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-br from-pear to-tan hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-pear font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
      onClick={onClick} // Attach the onClick handler
    >
      {name}
    </button>
  );
}
