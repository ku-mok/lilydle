import { useCallback, useState } from "react";
import AnswerColumn from "./components/AnswerColumn";
import AnswerHistory from "./components/AnswerHistory";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InputArea from "./components/InputArea";

function App() {
  const answer = "おたけすなお";
  const [isAlternate, setIsAlternate] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<string[]>([
    "あまのそらは",
    "すずきちなみ",
  ]);
  const [inputingText, setInputingText] = useState("しらい");
  const [mode, setMode] = useState<"daily" | "endless">("daily");
  const onModeChangeHandler = useCallback((mode: "daily" | "endless") => {
    setMode(mode);
    setAnswerHistory([]);
    setInputingText("");
  }, []);
  const MAX_ANSWER_COUNT = 6;
  const answerCandidates = [];
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
            console.log("BS");
          }}
          onKanaClick={(kana) => {
            console.log(kana);
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
