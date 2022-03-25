import clsx from "clsx";

export type KanaToggleProps = {
  isAlternate: boolean;
  onKanaToggle: (isAlternate: boolean) => void;
};

const KanaToggle: React.FC<KanaToggleProps> = (props) => {
  const buttonClassName =
    "inline-block px-6 py-2.5 transition duration-150 ease-in-out focus:outline-none focus:ring-0";
  const selectedClassname = "bg-gray-400 hover:bg-gray-500 active:bg-gray-600";
  const notSelectedClassname =
    "bg-gray-100 hover:bg-gray-400 active:bg-gray-500";
  return (
    <div className="flex" role="group">
      <button
        type="button"
        onClick={() => props.onKanaToggle(false)}
        className={clsx(
          "rounded-l",
          buttonClassName,
          props.isAlternate ? notSelectedClassname : selectedClassname
        )}
      >
        通常の50音
      </button>
      <button
        type="button"
        onClick={() => props.onKanaToggle(true)}
        className={clsx(
          "rounded-r",
          buttonClassName,
          props.isAlternate ? selectedClassname : notSelectedClassname
        )}
      >
        濁音・拗音・記号
      </button>
    </div>
  );
};
export default KanaToggle;
