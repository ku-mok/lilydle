import { AnswerHistoryType } from "../hooks/useWordleAnswerHistory";
import AnswerRow from "../uiParts/AnswerRow";

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
        props.answerHistory.map((h, i) => (
          <div className="mb-1" key={h.input + i} data-testid="row">
            <AnswerRow input={h.input} judge={h.judge} />
          </div>
        ))
      }
      {
        //入力中の回答
        props.answerHistory.length < props.maxAnswerCount && (
          <div className="mb-1" data-testid="row">
            <AnswerRow input={props.inputtedText} />
          </div>
        )
      }
      {
        //未入力
        props.answerHistory.length < props.maxAnswerCount &&
          [...Array(props.maxAnswerCount - props.answerHistory.length - 1)].map(
            (_, index) => (
              <div key={index} className="mb-1" data-testid="row">
                <AnswerRow key={index} />
              </div>
            )
          )
      }
    </>
  );
};
export default AnswerHistory;
