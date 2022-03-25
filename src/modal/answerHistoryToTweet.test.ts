import { AnswerHistoryType } from "../hooks/useWordleAnswerHistory";
import { answerHistoryToTweet } from "./answerHistoryToTweet";
it("convert answer history to Tweet Text", () => {
  const input: AnswerHistoryType[] = [
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["correct", "correct", "wrong", "wrong", "wrong"],
    },
  ];
  const expected = `Lilydle 2/6
🟨🟨⬜🟨🟨
🟩🟩⬜⬜⬜
#Lilydle #アサルトリリィwordle`;
  expect(answerHistoryToTweet(input)).toEqual(expected);
});

it("set challenge count to x when failded", () => {
  const input: AnswerHistoryType[] = [
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
  ];
  const expected = `Lilydle X/6
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
#Lilydle #アサルトリリィwordle`;
  expect(answerHistoryToTweet(input)).toEqual(expected);
});

it("set challenge count to 6 when cleared with 6 challenges", () => {
  const input: AnswerHistoryType[] = [
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
    },
    {
      input: "",
      judge: ["correct", "correct", "correct", "correct", "correct"],
    },
  ];
  const expected = `Lilydle 6/6
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
🟨🟨⬜🟨🟨
🟩🟩🟩🟩🟩
#Lilydle #アサルトリリィwordle`;
  expect(answerHistoryToTweet(input)).toEqual(expected);
});
