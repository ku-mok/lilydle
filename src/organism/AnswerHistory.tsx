import { AnswerHistoryType } from "../hooks/useWordleAnswer";
import AnswerColumn from "../uiParts/AnswerColumn";

export type AnswerHistoryProps = {
  answerHistory: AnswerHistoryType[];
  inputtedText: string;
  maxAnswerCount: number;
};

const AnswerHistory: React.FC<AnswerHistoryProps> = (props) => {
  return (
    <>
      {
        //送信済みの回答
        props.answerHistory.map((h) => (
          <div className="mb-1" key={h.input}>
            <AnswerColumn input={h.input} judge={h.judge} />
          </div>
        ))
      }
      {
        //入力中の回答
        props.answerHistory.length < props.maxAnswerCount && (
          <div className="mb-1">
            <AnswerColumn input={props.inputtedText} />
          </div>
        )
      }
      {
        //未入力
        props.answerHistory.length < props.maxAnswerCount &&
          [...Array(props.maxAnswerCount - props.answerHistory.length)].map(
            (_, index) => (
              <div key={index} className="mb-1">
                <AnswerColumn key={index} />
              </div>
            )
          )
      }
    </>
  );
};
export default AnswerHistory;
