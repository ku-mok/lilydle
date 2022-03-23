import KanaPanels from "./KanaPanels";
import KanaToggle from "./KanaPanelToggle";

export type InputAreaProps = {
  isAlternate: boolean;
  onKanaToggle: (isAlternate: boolean) => void;
  onKanaClick: (kana: string) => void;
  onBackSpaceClick: () => void;
};

const InputArea: React.FC<InputAreaProps> = (props) => {
  return (
    <>
      <div className="mt-4 mb-4 flex">
        <KanaToggle
          isAlternate={props.isAlternate}
          onKanaToggle={props.onKanaToggle}
        />
        <div>
          <button
            onClick={props.onBackSpaceClick}
            className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded border border-gray-800"
          >
            BackSpace
          </button>
        </div>
      </div>
      <KanaPanels isAlternate={props.isAlternate} onClick={props.onKanaClick} />
    </>
  );
};
export default InputArea;
