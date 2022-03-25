import KanaPanels from "../uiParts/KanaPanels";
import KanaToggle from "../uiParts/KanaPanelToggle";

export type InputAreaProps = {
  isAlternate: boolean;
  candidateKanas: string[];
  correctKanas: string[];
  onKanaToggle: (isAlternate: boolean) => void;
  onKanaClick: (kana: string) => void;
  onBackSpaceClick: () => void;
  onSubmitClick: () => void;
};

const InputArea: React.FC<InputAreaProps> = (props) => {
  return (
    <>
      <div className="mt-4 mb-4 flex gap-4">
        <div className="flex-1">
          <KanaToggle
            isAlternate={props.isAlternate}
            onKanaToggle={props.onKanaToggle}
          />
        </div>
        <button
          onClick={props.onBackSpaceClick}
          className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded border border-gray-800"
        >
          一文字削除
        </button>
        <button
          onClick={props.onSubmitClick}
          className="bg-slate-300 hover:bg-gray-200 text-black py-2 px-4 rounded border border-gray-800"
        >
          決定
        </button>
      </div>
      <KanaPanels
        correctKanas={props.correctKanas}
        candidateKanas={props.candidateKanas}
        isAlternate={props.isAlternate}
        onClick={props.onKanaClick}
      />
    </>
  );
};
export default InputArea;
