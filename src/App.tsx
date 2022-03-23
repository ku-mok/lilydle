import { useCallback, useState } from "react";
import AnswerHistory from "./components/AnswerHistory";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InputArea from "./components/InputArea";

function App() {
  // 解答候補一覧と現在の解答
  const answerCandidates = [];
  const answer = "おたけすなお"; // TODO: ゲームモードに応じてanswerを設定するロジックの実装
  // ゲームモード
  const [mode, setMode] = useState<"daily" | "endless">("daily");
  const onModeChangeHandler = useCallback((mode: "daily" | "endless") => {
    setMode(mode);
    setAnswerHistory([]);
    setInputingText("");
  }, []);
  // 回答履歴
  // TODO: 回答履歴を積むロジックの実装
  const [answerHistory, setAnswerHistory] = useState<string[]>([
    "あまのそらは",
    "すずきちなみ",
  ]);
  //  キーボードの入力モードと入力中のテキスト
  const [isAlternate, setIsAlternate] = useState(false);
  const [inputingText, setInputingText] = useState("しらい");
  // 解答できる回数
  const MAX_ANSWER_COUNT = 6;
  return (
    <>
      <Header mode={mode} onModeChange={onModeChangeHandler} />
      <div className="container md:w-3/12 sm:w-11/12 mx-auto">
        <div className="container md:w-8/12 sm:w-full mx-auto">
          <AnswerHistory
            answers={answerHistory}
            answer={answer}
            inputingText={inputingText}
            maxAnswerCount={MAX_ANSWER_COUNT}
          />
        </div>
        <InputArea
          isAlternate={isAlternate}
          onKanaToggle={(isAlternate) => setIsAlternate(isAlternate)}
          onBackSpaceClick={() => {
            // TODO: 文字入力時の処理の実装
            // InputtingTextを1文字削除する
            console.log("BS");
          }}
          onKanaClick={(kana) => {
            // InputtingTextに文字を追加する
            console.log(kana);
            // TODO: Submitの実装
            // InputtingTextを空にする
            // AnswerHistoryに解答履歴を追加する
            // 正誤判定を行う
            // 正解もしくは挑戦回数をオーバーした場合はモーダルを表示する
          }}
        />
        <div className="mt-6">
          <Footer allAnswerCandidates={answerCandidates.length} />
        </div>
      </div>
    </>
  );
}

export default App;
