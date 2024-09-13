interface FetchingStateProps {
  state: string;
}

export default function FetchingState({ state }: FetchingStateProps) {
  return <p className="flex p-5 w-full flex-col h-full">{state}</p>;
}
