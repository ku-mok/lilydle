import { useCallback, useState } from "react";
import { useKanaBoard } from "../hooks/useKanaBoard";
import { useModal } from "../hooks/useModal";
import { useWorldeAnswer } from "../hooks/useWordleAnswer";
import { useWordleAnswerHistory } from "../hooks/useWordleAnswerHistory";
import GameEndModal from "../modal/GameEndModal";
import NonCandidateModal from "../modal/NonCandidateModal";
import { AnswerType } from "../types/AnswerType";
import GameModeSelector from "../uiParts/GameModeSelector";
import AnswerHistory from "./AnswerHistory";
import InputArea from "./InputArea";

const GameBoard = (props: { answerCandidates: AnswerType[] }) => {
  // ゲームモード
  const [mode, setMode] = useState<"daily" | "endless">("daily");
  // ゲームの状態
  const [isClear, setIsClear] = useState(false);
  const [isKeyboardActive, setIsKeyboardactive] = useState(true);
  // モーダル関連
  const {
    isModalOpen: isGameEndModalOpen,
    openModal: openGameEndModal,
    closeModal: closeGameEndModal,
  } = useModal();
  const {
    isModalOpen: isNonCandidateModalOpen,
    openModal: openNonCandidateModal,
    closeModal: closeNonCandidateModal,
  } = useModal();
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
    useKanaBoard(6, isKeyboardActive);
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
    switch (judgeResult) {
      case "correct":
        resestInputtedText();
        setIsClear(true);
        setIsKeyboardactive(false);
        openGameEndModal();
        break;
      case "incorrect":
        resestInputtedText();
        if (answerHistory.length === 5) {
          resestInputtedText();
          setIsClear(false);
          setIsKeyboardactive(false);
          openGameEndModal();
        }
        break;
      case "not-candidate":
        resestInputtedText();
        openNonCandidateModal();
        break;
    }
  }, [
    answerHistory.length,
    inputtedText,
    judgeAnswer,
    openGameEndModal,
    openNonCandidateModal,
    resestInputtedText,
  ]);
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
      {isNonCandidateModalOpen && (
        <NonCandidateModal modalClose={closeNonCandidateModal} />
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
          enterButtonEnabled={inputtedText.length === 6}
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
