import Panel, { PanelProps } from "./Panel";

export type KanaPanelsProps = {
  onClick: (kana: string) => void;
  correctKanas?: string[];
  candidateKanas?: string[];
  wrongKanas?: string[];
  isAlternate: boolean;
};

const KanaPanels = ({
  correctKanas = [],
  wrongKanas = [],
  candidateKanas = [],
  ...props
}: KanaPanelsProps) => {
  const normalKana =
    "あかさたなはまやらわいきしちにひみゆりをうくすつぬふむよるんえけせてねへめ-れ-おこそとのほも-ろ";
  const alternateKana =
    "ぁがざだばぱゃゔ--ぃぎじぢびぴゅ---ぅぐずづぶぷょ---ぇげぜでべぺっ---ぉごぞどぼぽー---";
  const kanaList = props.isAlternate ? alternateKana : normalKana;
  return (
    <div className="grid grid-cols-10 gap-1">
      {[...kanaList].map((kana, index) => {
        const status: PanelProps["status"] = correctKanas.includes(kana)
          ? "correct"
          : candidateKanas.includes(kana)
          ? "candidate"
          : wrongKanas.includes(kana)
          ? "wrong"
          : "notSubmitted";
        return kana === "-" ? (
          <div className="" key={index} />
        ) : (
          <button key={index} onClick={() => props.onClick(kana)}>
            <Panel key={index} character={kana} status={status} />
          </button>
        );
      })}
    </div>
  );
};
export default KanaPanels;
