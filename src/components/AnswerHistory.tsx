import AnswerColumn from "./AnswerColumn";

export type AnswerHistoryProps = {
  answer: string;
  answers: string[];
  inputingText: string;
  maxAnswerCount: number;
};

const AnswerHistory: React.FC<AnswerHistoryProps> = (props) => {
  return (
    <>
      {
        //送信済みの回答
        props.answers.map((h) => (
          <AnswerColumn
            key={h}
            answer={props.answer}
            input={h}
            isSubmitted={true}
          />
        ))
      }
      {
        //入力中の回答
        props.answers.length < props.maxAnswerCount && (
          <AnswerColumn
            answer={props.answer}
            input={props.inputingText}
            isSubmitted={false}
          />
        )
      }
      {
        //未入力
        props.answers.length + 1 < props.maxAnswerCount &&
          [...Array(props.maxAnswerCount - props.answers.length)].map(
            (_, index) => (
              <AnswerColumn
                key={index}
                answer={props.answer}
                input=""
                isSubmitted={false}
              />
            )
          )
      }
    </>
  );
};
export default AnswerHistory;
