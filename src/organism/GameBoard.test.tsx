import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameBoard from "./GameBoard";
import { useWorldeAnswer } from "../hooks/useWordleAnswer";
import { AnswerType } from "../types/AnswerType";
// 解答候補
const answerCandidates: AnswerType[] = [
  {
    kana: "おたけすなお",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    display: "尾竹簾",
  },
  {
    kana: "すずきちなみ",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    display: "尾竹簾",
  },
  {
    kana: "あかしあいか",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    display: "尾竹簾",
  },
];

// 解答を固定するためにuseWorldeAnswerをモックする
jest.mock("../hooks/useWordleAnswer");
const mockUseWorldeAnswer = useWorldeAnswer as jest.Mock;
mockUseWorldeAnswer.mockImplementation(() => ({
  answerKana: "おたけすなお",
  lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
  answerDisplay: "尾竹簾",
}));
describe("入力", () => {
  it("can input character with screen keyboard", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    // 初期状態ではキーボードの文字のみ
    expect(screen.getAllByText("あ")).toHaveLength(1);
    await userEvent.click(screen.getByText("あ"));
    // 入力された文字が増える
    expect(screen.getAllByText("あ")).toHaveLength(2);
  });
  it("can delete character with screen keyboard", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    // 初期状態ではキーボードの文字のみ
    expect(screen.getAllByText("あ")).toHaveLength(1);
    // 入力された文字が増える
    await userEvent.click(screen.getByText("あ"));
    expect(screen.getAllByText("あ")).toHaveLength(2);
    // 削除できる
    await userEvent.click(screen.getByText("一文字削除"));
    expect(screen.getAllByText("あ")).toHaveLength(1);
  });
  it("cannot input more than 6 characters", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    await userEvent.click(screen.getByText("あ"));
    await userEvent.click(screen.getByText("い"));
    await userEvent.click(screen.getByText("う"));
    await userEvent.click(screen.getByText("え"));
    await userEvent.click(screen.getByText("お"));
    await userEvent.click(screen.getByText("か"));
    await userEvent.click(screen.getByText("き"));
  });
});
