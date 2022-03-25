import { useCallback, useState } from "react";
import AnswerHistory from "./organism/AnswerHistory";
import Footer from "./organism/Footer";
import Header from "./organism/Header";
import InputArea from "./organism/InputArea";
import GameEndModal from "./modal/GameEndModal";
import { useKanaBoard } from "./hooks/useKanaBoard";
import { useModal } from "./hooks/useModal";
import { useWordleAnswer } from "./hooks/useWordleAnswer";

// 解答できる回数
const MAX_ANSWER_COUNT = 6;
// 解答候補一覧
const answerCandidates = ["おたけすなお", "すずきちなみ", "おぐりひだか"];

function App() {
  // 現在の解答
  const [answer, setAnswer] = useState("おたけすなお"); // TODO: ゲームモードに応じてanswerを設定するロジックの実装
  const [answerDisplay, setAnswerDisplay] = useState("尾竹簾"); // TODO: ゲームモードに応じてanswerを設定するロジックの実装
  const [lemonadeUrl, setLemonadeUrl] = useState(
    "https://lemonade.lily.garden/lily/Otake_Sunao"
  );
  // キーボードの入力関連
  const { inputtedText, resestInputtedText, onBackSpaceClick, onKanaClick } =
    useKanaBoard(6);
  // 回答履歴
  const {
    answerHistory,
    judgeAnswer,
    resetHistory,
    candidateChars,
    correctChars,
  } = useWordleAnswer(answer, answerCandidates);
  // ゲームモード
  const [mode, setMode] = useState<"daily" | "endless">("daily");
  const onModeChangeHandler = useCallback(
    (mode: "daily" | "endless") => {
      setMode(mode);
      resetHistory();
      resestInputtedText;
    },
    [resestInputtedText, resetHistory]
  );
  // モーダル関連
  const [isClear, setIsClear] = useState(false);
  const {
    isModalOpen: isGameEndModalOpen,
    openModal: openGameEndModal,
    closeModal: closeGameEndModal,
  } = useModal();

  // 解答送信時の処理
  const onSubmitClick = useCallback(() => {
    const judgeResult = judgeAnswer(inputtedText);
    resestInputtedText();
    // TODO: 解答候補外の場合はエラーを表示する
    // TODO: 正解の場合、正解モーダルを表示する
    // TODO: 挑戦回数をオーバーした場合、ゲームオーバーモーダルを表示する
  }, [inputtedText, judgeAnswer, resestInputtedText]);

  return (
    <>
      {isGameEndModalOpen && (
        <GameEndModal
          answer={answer}
          answerDisplay={answerDisplay}
          lemonadeUrl={lemonadeUrl}
          modalClose={closeGameEndModal}
          answerHistory={answerHistory}
          isClear={isClear}
        />
      )}
      <Header mode={mode} onModeChange={onModeChangeHandler} />
      <div className="container md:w-3/12 sm:w-11/12 mx-auto">
        <div className="container md:w-8/12 sm:w-full mx-auto">
          <AnswerHistory
            {...{
              inputtedText,
              answerHistory,
              maxAnswerCount: MAX_ANSWER_COUNT,
            }}
          />
        </div>
        <InputArea
          {...{
            correctKanas: correctChars,
            candidateKanas: candidateChars,
            onBackSpaceClick,
            onKanaClick,
            onSubmitClick,
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
