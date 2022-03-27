import { AnswerType } from "../types/AnswerType";

export function generateWordleAnswer(
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
    index = Math.floor(Math.random() * answerCandidates.length);
  }
  return answerCandidates[index];
}
