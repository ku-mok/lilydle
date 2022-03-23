import { useCallback, useState } from "react";
import AnswerHistory from "./components/AnswerHistory";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InputArea from "./components/InputArea";
import { useKanaBoard } from "./hooks/useKanaBoard";

// 解答できる回数
const MAX_ANSWER_COUNT = 6;
// 解答候補一覧
const answerCandidates = ["おたけすなお", "すずきちなみ", "おぐりひだか"];

function App() {
  // 現在の解答
  const [answer, setAnswer] = useState("おたけすなお"); // TODO: ゲームモードに応じてanswerを設定するロジックの実装
  // キーボードの入力関連
  const {
    isAlternate,
    inputtedText,
    resestInputtedText,
    onKanaToggle,
    onBackSpaceClick,
    onKanaClick,
  } = useKanaBoard();
  // ゲームモード
  const [mode, setMode] = useState<"daily" | "endless">("daily");
  const onModeChangeHandler = useCallback(
    (mode: "daily" | "endless") => {
      setMode(mode);
      setAnswerHistory([]);
      resestInputtedText;
    },
    [resestInputtedText]
  );
  // 回答履歴
  const [answerHistory, setAnswerHistory] = useState<string[]>([
    "あまのそらは",
    "すずきちなみ",
  ]);
  const [candidateKanas, setCandidateKanas] = useState<string[]>(["す"]);
  const [correctKanas, setCorrectKanas] = useState<string[]>(["な"]);
  const updateCorrectCandidate = useCallback(
    (inputtedText: string) => {
      setCandidateKanas((prevState) => [
        ...prevState,
        ...[...inputtedText].filter((input) => answer.includes(input)),
      ]);
      setCorrectKanas((prevState) => [
        ...prevState,
        ...[...inputtedText].filter((input, index) => answer[index] === input),
      ]);
    },
    [answer]
  );
  // 解答送信時の処理
  const onSubmitClick = useCallback(() => {
    // 解答候補に含まれていない場合
    if (!answerCandidates.includes(inputtedText)) {
      // TODO: リリィ、CHARM、レギオンで該当しない旨を表示
      return;
    } else {
      // 解答候補である場合は解答履歴とキーボードの色分けを更新する
      setAnswerHistory([...answerHistory, inputtedText]);
      updateCorrectCandidate(inputtedText);
    }
    // TODO: 正解の場合、正解モーダルを表示する
    if (inputtedText === answer) {
      resestInputtedText();
      return;
    }
    // TODO: 挑戦回数をオーバーした場合、ゲームオーバーモーダルを表示する
    if (answerHistory.length >= MAX_ANSWER_COUNT) {
      return;
    }
    resestInputtedText();
  }, [
    answer,
    answerHistory,
    inputtedText,
    resestInputtedText,
    updateCorrectCandidate,
  ]);
  return (
    <>
      <Header mode={mode} onModeChange={onModeChangeHandler} />
      <div className="container md:w-3/12 sm:w-11/12 mx-auto">
        <div className="container md:w-8/12 sm:w-full mx-auto">
          <AnswerHistory
            {...{
              answer,
              inputtedText,
              answers: answerHistory,
              maxAnswerCount: MAX_ANSWER_COUNT,
            }}
          />
        </div>
        <InputArea
          {...{
            isAlternate,
            correctKanas,
            candidateKanas,
            onKanaToggle,
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
