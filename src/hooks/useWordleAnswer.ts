import { useMemo } from "react";
import { AnswerType } from "../types/AnswerType";

export function useWorldeAnswer(
  answerCandidates: AnswerType[],
  gameMode: "daily" | "endless"
): AnswerType {
  // TODO: ゲームモードに応じてanswerを設定するロジックの実装
  const answer = useMemo(
    () => ({
      kana: "おたけすなお",
      lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
      display: "尾竹簾",
    }),
    []
  );
  return answer;
}
