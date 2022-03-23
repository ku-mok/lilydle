export type HeaderProps = {
  mode: "endless" | "daily";
  onModeChange: (mode: "endless" | "daily") => void;
};

const Header: React.FC<HeaderProps> = (props) => {
  const classAcitve = "text-xl underline font-bold underline-offset-4";
  const classInacitve = "text-gray-400 text-xl";
  return (
    <nav className="bg-slate-200 p-3 mb-4">
      <div className="text-4xl text-bold text-center mb-4">LilyDle</div>
      <div className="flex justify-center mt-2 mb-1 basis-3 gap-8">
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
    </nav>
  );
};
export default Header;
