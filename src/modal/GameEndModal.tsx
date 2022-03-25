export type GameEndModalProps = {
  answer: AnswerType;
  modalClose: () => void;
  answerHistory: AnswerHistoryType[];
  isClear: boolean;
};
import { TwitterShareButton, TwitterIcon } from "react-share";
import { AnswerHistoryType } from "../hooks/useWordleAnswerHistory";
import { AnswerType } from "../types/AnswerType";
import { answerHistoryToTweet } from "./answerHistoryToTweet";
import ModalLayout from "./ModalLayout";

const GameEndModal: React.FC<GameEndModalProps> = (props) => {
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
        {props.answer.display} ({props.answer.kana})
      </div>
      <div className="text-center mb-4">
        <a href={props.answer.lemonadeUrl}>{props.answer.lemonadeUrl}</a>
      </div>
      <div className="text-center">
        <TwitterShareButton
          url="http://example.com"
          title={answerHistoryToTweet(props.answerHistory)}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </ModalLayout>
  );
};
export default GameEndModal;
