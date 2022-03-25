import { useState } from "react";
import KanaPanels from "../uiParts/KanaPanels";
import KanaToggle from "../uiParts/KanaPanelToggle";

export type InputAreaProps = {
  candidateKanas: string[];
  correctKanas: string[];
  onKanaClick: (kana: string) => void;
  onBackSpaceClick: () => void;
  onSubmitClick: () => void;
  enterButtonEnabled?: boolean;
};

const InputArea: React.FC<InputAreaProps> = ({
  enterButtonEnabled = true,
  ...props
}) => {
  const [isAlternate, setIsAlternate] = useState(false);
  const onKanaToggle = (isAlternate: boolean) => setIsAlternate(isAlternate);
  return (
    <>
      <div className="mt-4 mb-4 flex gap-4">
        <div className="flex-1">
          <KanaToggle isAlternate={isAlternate} onKanaToggle={onKanaToggle} />
        </div>
        <button
          onClick={props.onBackSpaceClick}
          className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded border border-gray-800"
        >
          一文字削除
        </button>
        <button
          disabled={!enterButtonEnabled}
          onClick={props.onSubmitClick}
          className="bg-slate-300 hover:bg-gray-200 text-black py-2 px-4 rounded border border-gray-800"
        >
          決定
        </button>
      </div>
      <KanaPanels
        correctKanas={props.correctKanas}
        candidateKanas={props.candidateKanas}
        isAlternate={isAlternate}
        onClick={props.onKanaClick}
      />
    </>
  );
};
export default InputArea;
