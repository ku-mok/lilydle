export type GameModeSelectorProps = {
  mode: "endless" | "daily";
  onModeChange: (mode: "endless" | "daily") => void;
};

const GameModeSelector: React.FC<GameModeSelectorProps> = (props) => {
  const classAcitve = "text-xl underline font-bold underline-offset-4";
  const classInacitve = "text-gray-400 text-xl";
  return (
    <div className="bg-slate-200 flex justify-center pb-5 mb-5 basis-3 gap-8">
      <button
        className={props.mode === "daily" ? classAcitve : classInacitve}
        onClick={() => props.onModeChange("daily")}
      >
        デイリーチャレンジ
      </button>
      <button
        className={props.mode === "endless" ? classAcitve : classInacitve}
        onClick={() => props.onModeChange("endless")}
      >
        エンドレスチャレンジ
      </button>
    </div>
  );
};
export default GameModeSelector;
