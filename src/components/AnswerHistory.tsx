import { AnswerHistoryType } from "../hooks/useWordleAnswer";
import AnswerColumn from "./AnswerColumn";

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
          <AnswerColumn key={h.input} input={h.input} judge={h.judge} />
        ))
      }
      {
        //入力中の回答
        props.answerHistory.length < props.maxAnswerCount && (
          <AnswerColumn input={props.inputtedText} />
        )
      }
      {
        //未入力
        props.answerHistory.length + 1 < props.maxAnswerCount &&
          [...Array(props.maxAnswerCount - props.answerHistory.length - 1)].map(
            (_, index) => <AnswerColumn key={index} />
          )
      }
    </>
  );
};
export default AnswerHistory;
