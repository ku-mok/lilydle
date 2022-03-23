import Panel, { PanelProps } from "./Panel";

export type AnswerColumnProps = {
  answer: string;
  input: string;
  isSubmitted: boolean;
};

const AnswerColumn: React.FC<AnswerColumnProps> = ({
  answer,
  input,
  isSubmitted,
}) => {
  const status: PanelProps["status"][] = [...input].map((char, index) => {
    if (!isSubmitted) {
      return "notSubmitted";
    } else if (char === answer[index]) {
      return "correct";
    } else if (answer.includes(char)) {
      return "candidate";
    } else {
      return "wrong";
    }
  });
  while (status.length < answer.length) {
    status.push("notSubmitted");
  }
  return (
    <div className="grid grid-cols-10 gap-1 w-4/12">
      {status.map((status, index) => (
        <Panel
          key={index}
          status={status}
          character={input.length > index ? input[index] : ""}
        />
      ))}
    </div>
  );
};

export default AnswerColumn;
