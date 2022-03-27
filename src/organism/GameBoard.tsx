import { useCallback, useMemo, useState } from "react";
import { useKanaBoard } from "../hooks/useKanaBoard";
import { useModal } from "../hooks/useModal";
import { generateWordleAnswer } from "./generateWordleAnswer";
import { useWordleAnswerHistory } from "../hooks/useWordleAnswerHistory";
import GameEndModal from "../modal/GameEndModal";
import NonCandidateModal from "../modal/NonCandidateModal";
import { AnswerType } from "../types/AnswerType";
import GameModeSelector from "../uiParts/GameModeSelector";
import AnswerHistory from "./AnswerHistory";
import InputArea from "./InputArea";
import EndlessModal from "../modal/EndlessModeModal";

const MAX_ANSWER_COUNT = 6;
const GameBoard = (props: { answerCandidates: AnswerType[] }) => {
  // ゲームモード
  const [mode, setMode] = useState<"daily" | "endless">("daily");
  const [clearCount, setClearCount] = useState<number>(0);
  const [updateAnswer, setUpdateAnswer] = useState(0);
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
  const {
    isModalOpen: isEndlessModalOpen,
    openModal: openEndlessModal,
    closeModal: closeEndlessModal,
  } = useModal();
  // 現在の解答
  const answer = useMemo(
    () => generateWordleAnswer(props.answerCandidates, mode),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.answerCandidates, mode, updateAnswer]
  );
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
    (selectedMode: "daily" | "endless") => {
      if (mode !== selectedMode) {
        setMode(selectedMode);
        setClearCount(0);
        resetHistory();
        resestInputtedText();
        setIsClear(false);
        setIsKeyboardactive(true);
      }
    },
    [mode, resestInputtedText, resetHistory]
  );
  // エンドレスチャレンジで継続する場合
  const onRetryClick = useCallback(() => {
    resetHistory();
    resestInputtedText();
    setIsKeyboardactive(true);
    closeEndlessModal();
    setUpdateAnswer((prev) => prev + 1);
    if (!isClear) {
      setClearCount(0);
    }
    closeEndlessModal();
  }, [closeEndlessModal, isClear, resestInputtedText, resetHistory]);
  // 解答送信時の処理
  const onSubmitClick = useCallback(() => {
    const judgeResult = judgeAnswer(inputtedText);
    switch (judgeResult) {
      case "correct":
        resestInputtedText();
        setIsClear(true);
        setIsKeyboardactive(false);
        if (mode === "daily") {
          openGameEndModal();
        } else {
          setClearCount((prev) => prev + 1);
          openEndlessModal();
        }
        break;
      case "incorrect":
        resestInputtedText();
        if (answerHistory.length === MAX_ANSWER_COUNT - 1) {
          resestInputtedText();
          setIsClear(false);
          setIsKeyboardactive(false);
          if (mode === "daily") {
            openGameEndModal();
          } else {
            openEndlessModal();
          }
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
    mode,
    openEndlessModal,
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
      {isEndlessModalOpen && (
        <EndlessModal
          modalClose={closeEndlessModal}
          clearCount={clearCount}
          answer={answer}
          isClear={isClear}
          onRetryClick={onRetryClick}
        />
      )}
      <GameModeSelector mode={mode} onModeChange={onModeChangeHandler} />
      <div className="container xl:w-4/12 lg:w-11/12 mx-auto">
        <div className="container xl:w-7/12 lg:w-full mx-auto">
          <AnswerHistory
            answerHistory={answerHistory}
            inputtedText={inputtedText}
            maxAnswerCount={MAX_ANSWER_COUNT}
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
