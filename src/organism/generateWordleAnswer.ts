import { AnswerType } from "../types/AnswerType";

function seedRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

export function generateWordleAnswer(
  answerCandidates: AnswerType[],
  gameMode: "daily" | "endless"
): AnswerType {
  let index: number;
  if (gameMode === "daily") {
    const today = new Date();
    const yearMonthDay = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
    index = seedRandom(yearMonthDay)() % answerCandidates.length;
  } else {
    index = Math.floor(Math.random() * answerCandidates.length);
  }
  return answerCandidates[index];
}
