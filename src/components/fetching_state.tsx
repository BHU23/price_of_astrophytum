interface FetchingStateProps {
  state: string;
}

export default function FetchingState({ state }: FetchingStateProps) {
  return <p className="flex pl-5 pr-5 pb-5 w-full flex-col h-full">{state}</p>;
}
