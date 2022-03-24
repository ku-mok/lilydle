export type GameEndModalProps = {
  answerDisplay: string;
  answer: string;
  lemonadeUrl: string;
  modalClose: () => void;
  history: string[];
  isClear: boolean;
};
import { TwitterShareButton, TwitterIcon } from "react-share";
import ModalLayout from "./ModalLayout";

const GameEndModal: React.FC<GameEndModalProps> = (props) => {
  const TweetText = `Lilydle ${props.isClear ? props.history.length : "X"}/6
${props.history.join("\n")}
#lilyldle #アサルトリリィwordle`;
  return (
    <ModalLayout modalClose={props.modalClose}>
      {props.isClear ? (
        <div className="text-3xl text-green-700 font-bold text-center mb-4">
          Clear!
        </div>
      ) : (
        <div className="text-3xl text-red-700 font-bold text-center mb-4">
          Failed...
        </div>
      )}
      <div className="text-bold text-2xl text-center mb-4">
        {props.answerDisplay} ({props.answer})
      </div>
      <div className="text-center mb-4">
        <a href={props.lemonadeUrl}>{props.lemonadeUrl}</a>
      </div>
      <div className="text-center">
        <TwitterShareButton url="http://example.com" title={TweetText}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </ModalLayout>
  );
};
export default GameEndModal;
