import { useCallback, useState } from "react";

export type AnswerHistoryType = {
  input: string;
  judge: ("correct" | "candidate" | "wrong")[];
};
export const useWordleAnswerHistory = (
  answer: string,
  answerCandidates: string[]
) => {
  // 解答履歴
  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryType[]>([]);
  // 文字の履歴
  const [candidateChars, setCandidateChars] = useState<string[]>([]);
  const [correctChars, setcorrectChars] = useState<string[]>([]);
  const [wrongChars, setWrongChars] = useState<string[]>([]);
  // リセット
  const resetHistory = useCallback(() => {
    setCandidateChars([]);
    setcorrectChars([]);
    setAnswerHistory([]);
    setWrongChars([]);
  }, [setAnswerHistory, setCandidateChars, setcorrectChars]);
  const judgeAnswer = useCallback(
    (input: string) => {
      // 候補にふくまれているか
      if (!answerCandidates.includes(input)) {
        return "not-candidate";
      }
      // 一文字ずつ正誤判定を行う
      const judge: ("correct" | "candidate" | "wrong")[] = [...input].map(
        (inputChar, index) => {
          const answerChar = answer[index];
          if (inputChar === answerChar) {
            setcorrectChars((prev) => [...prev, inputChar]);
            return "correct";
          } else if (answer.includes(inputChar)) {
            setCandidateChars((prev) => [...prev, inputChar]);
            return "candidate";
          } else {
            setWrongChars((prev) => [...prev, inputChar]);
            return "wrong";
          }
        }
      );
      // 履歴に追加
      setAnswerHistory((prev) => [...prev, { input, judge }]);
      if (process.env.NODE_ENV === "development") {
        console.log(answer);
      }
      return input === answer ? "correct" : "incorrect";
    },
    [answer, answerCandidates]
  );
  return {
    answerHistory,
    judgeAnswer,
    resetHistory,
    wrongChars,
    candidateChars,
    correctChars,
  };
};
