import { AnswerHistoryType } from "../hooks/useWordleAnswer";

export function answerHistoryToTweet(
  answerHistory: AnswerHistoryType[]
): string {
  const challengeCount =
    answerHistory.length < 6
      ? answerHistory.length
      : answerHistory[5].judge.every((v) => v === "correct")
      ? 6
      : "X";
  const resultSquare = answerHistory.map((a) =>
    a.judge
      .map((j) => (j === "correct" ? "🟩" : j === "candidate" ? "🟨" : "⬜"))
      .join("")
  );
  const tweetText =
    `Lilydle ${challengeCount}/6\n` +
    resultSquare.join("\n") +
    `\n#Lilydle #アサルトリリィwordle`;
  return tweetText;
}
