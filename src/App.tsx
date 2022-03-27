import Footer from "./uiParts/Footer";
import Header from "./uiParts/Header";
import GameBoard from "./organism/GameBoard";
import { answerCandidates } from "./data/lilydleData";
function App() {
  return (
    <>
      <Header />
      <GameBoard answerCandidates={answerCandidates} />
      <div className="mt-6 container xl:w-4/12 lg:w-11/12 mx-auto">
        <Footer allAnswerCandidates={answerCandidates.length} />
      </div>
    </>
  );
}

export default App;
