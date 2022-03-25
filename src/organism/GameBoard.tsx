import { useCallback, useState } from "react";
import { useKanaBoard } from "../hooks/useKanaBoard";
import { useModal } from "../hooks/useModal";
import { useWorldeAnswer } from "../hooks/useWordleAnswer";
import { useWordleAnswerHistory } from "../hooks/useWordleAnswerHistory";
import GameEndModal from "../modal/GameEndModal";
import { AnswerType } from "../types/AnswerType";
import GameModeSelector from "../uiParts/GameModeSelector";
import AnswerHistory from "./AnswerHistory";
import InputArea from "./InputArea";

const GameBoard = (props: { answerCandidates: AnswerType[] }) => {
  // ゲームモード
  const [mode, setMode] = useState<"daily" | "endless">("daily");
  // 現在の解答
  const answer = useWorldeAnswer(props.answerCandidates, mode);
  // 回答履歴
  const {
    answerHistory,
    judgeAnswer,
    resetHistory,
    candidateChars,
    correctChars,
  } = useWordleAnswerHistory(
    answer.kana,
    props.answerCandidates.map((c) => c.kana)
  );
  // キーボードの入力関連
  const { inputtedText, resestInputtedText, onBackSpaceClick, onKanaClick } =
    useKanaBoard(6);
  // モード変更時の処理
  const onModeChangeHandler = useCallback(
    (mode: "daily" | "endless") => {
      setMode(mode);
      resetHistory();
      resestInputtedText();
    },
    [resestInputtedText, resetHistory]
  );
  // 解答送信時の処理
  const onSubmitClick = useCallback(() => {
    const judgeResult = judgeAnswer(inputtedText);
    resestInputtedText();
    // TODO: 解答候補外の場合はエラーを表示する
    // TODO: 正解の場合、正解モーダルを表示する
    // TODO: 挑戦回数をオーバーした場合、ゲームオーバーモーダルを表示する
  }, [inputtedText, judgeAnswer, resestInputtedText]);
  // モーダル関連
  const [isClear, setIsClear] = useState(false);
  const {
    isModalOpen: isGameEndModalOpen,
    openModal: openGameEndModal,
    closeModal: closeGameEndModal,
  } = useModal();
  return (
    <>
      {isGameEndModalOpen && (
        <GameEndModal
          answer={answer}
          modalClose={closeGameEndModal}
          answerHistory={answerHistory}
          isClear={isClear}
        />
      )}
      <GameModeSelector mode={mode} onModeChange={onModeChangeHandler} />
      <div className="container md:w-3/12 sm:w-11/12 mx-auto">
        <div className="container md:w-8/12 sm:w-full mx-auto">
          <AnswerHistory
            answerHistory={answerHistory}
            inputtedText={inputtedText}
            maxAnswerCount={6}
          />
        </div>
        <InputArea
          candidateKanas={candidateChars}
          correctKanas={correctChars}
          onKanaClick={onKanaClick}
          onBackSpaceClick={onBackSpaceClick}
          onSubmitClick={onSubmitClick}
        />
      </div>
    </>
  );
};
export default GameBoard;
