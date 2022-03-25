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
  const resetHistory = useCallback(() => {
    setAnswerHistory([]);
  }, [setAnswerHistory]);
  // 文字の履歴
  const [candidateChars, setCandidateChars] = useState<string[]>([]);
  const [correctChars, setcorrectChars] = useState<string[]>([]);
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
          }
          if (answer.includes(inputChar)) {
            setCandidateChars((prev) => [...prev, inputChar]);
            return "candidate";
          }
          return "wrong";
        }
      );
      // 履歴に追加
      setAnswerHistory((prev) => [...prev, { input, judge }]);
      return input === answer ? "correct" : "incorrect";
    },
    [answer, answerCandidates]
  );
  return {
    answerHistory,
    judgeAnswer,
    resetHistory,
    candidateChars,
    correctChars,
  };
};
