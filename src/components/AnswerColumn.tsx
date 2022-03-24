import Panel, { PanelProps } from "./Panel";

export type AnswerColumnProps = {
  judge?: ("correct" | "candidate" | "wrong")[];
  input?: string;
};

const AnswerColumn: React.FC<AnswerColumnProps> = ({ input, judge }) => {
  return (
    <div className="grid grid-cols-6 gap-1">
      {[...(input ? input : "")].map((inputChar, index) => (
        <Panel
          key={index}
          status={judge ? judge[index] : "notSubmitted"}
          character={inputChar}
        />
      ))}
      {
        //未入力部分
        [...Array(6 - (input ? input.length : 0))].map((_) => {
          return <Panel key={_} status="notSubmitted" character="" />;
        })
      }
    </div>
  );
};

export default AnswerColumn;
