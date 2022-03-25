import Footer from "./uiParts/Footer";
import Header from "./uiParts/Header";
import GameBoard from "./organism/GameBoard";
import { AnswerType } from "./types/AnswerType";
const answerCandidates: AnswerType[] = [
  {
    kana: "おたけすなお",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    display: "尾竹簾",
  },
  {
    kana: "すずきちなみ",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    display: "尾竹簾",
  },
  {
    kana: "あかしあいか",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    display: "尾竹簾",
  },
  {
    kana: "ああああああ",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    display: "尾竹簾",
  },
];

function App() {
  return (
    <>
      <Header />
      <GameBoard answerCandidates={answerCandidates} />
      <div className="mt-6 container md:w-3/12 sm:w-11/12 mx-auto">
        <Footer allAnswerCandidates={answerCandidates.length} />
      </div>
    </>
  );
}

export default App;
