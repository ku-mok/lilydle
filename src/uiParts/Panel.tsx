import clsx from "clsx";

export type PanelProps = {
  status: "correct" | "candidate" | "wrong" | "notSubmitted";
  character: string;
};

const Panel = ({ status, character }: PanelProps) => {
  const stausToPanelColor = (status: PanelProps["status"]) => {
    switch (status) {
      case "correct":
        return "bg-green-500";
      case "candidate":
        return "bg-yellow-500";
      case "wrong":
        return "bg-gray-500";
      case "notSubmitted":
        return "bg-white";
    }
  };
  return (
    <div
      className={clsx(
        status === "notSubmitted" && "border border-gray-500",
        "border w-full pb-full flex justify-center h-full rounded-xl relative",
        stausToPanelColor(status)
      )}
    >
      <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-xl ">
        {character}
      </div>
    </div>
  );
};

export default Panel;
