import { useMemo } from "react";
import { AnswerType } from "../types/AnswerType";

export function useWorldeAnswer(
  answerCandidates: AnswerType[],
  gameMode: "daily" | "endless"
): AnswerType {
  let index: number;
  if (gameMode === "daily") {
    const today = new Date();
    const yearMonthDayInt = parseInt(
      `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
    );
    index = yearMonthDayInt % answerCandidates.length;
  } else {
    index = 0;
  }
  if (process.env.NODE_ENV === "development") {
    console.log(answerCandidates[index]);
  }
  return useMemo(() => answerCandidates[index], [answerCandidates, index]);
}
