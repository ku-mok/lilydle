export type GameEndModalProps = {
  answer: AnswerType;
  modalClose: () => void;
  isClear: boolean;
  onRetryClick: () => void;
  clearCount: number;
};
import { TwitterShareButton, TwitterIcon } from "react-share";
import { AnswerType } from "../types/AnswerType";
import ModalLayout from "./ModalLayout";

const EndlessModal: React.FC<GameEndModalProps> = (props) => {
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
        <a href={props.answer.lemonadeUrl} target="_blank" rel="noreferrer">
          {props.answer.lemonadeUrl}
        </a>
      </div>
      <div className="text-center mb-4">
        <p>{props.clearCount}回連続で正解しました</p>
      </div>
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={props.onRetryClick}
        >
          {props.isClear ? "次のチャレンジへ" : "もう一度"}
        </button>
      </div>
      <div className="text-center">
        <TwitterShareButton
          url="http://example.com"
          title={`Lilydle\nエンドレスチャレンジで${props.clearCount}回連続で正解しました！\n#Lilydle #アサルトリリィ版Wordle`}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </ModalLayout>
  );
};
export default EndlessModal;
