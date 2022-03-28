import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameBoard from "./GameBoard";
import { generateWordleAnswer } from "./generateWordleAnswer";
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
  {
    kana: "ああああああ",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    display: "尾竹簾",
  },
];
// 解答を固定するためにuseWorldeAnswerをモックする
jest.mock("./generateWordleAnswer");
const mockGenerateWordleAnswer = generateWordleAnswer as jest.Mock;
mockGenerateWordleAnswer.mockImplementation(() => ({
  kana: "おたけすなお",
  lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
  display: "尾竹簾",
}));

describe("入力", () => {
  beforeEach(() => {
    mockGenerateWordleAnswer.mockClear();
  });
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

describe("キーボードの状態更新", () => {
  beforeEach(async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    await userEvent.click(screen.getByText("す"));
    await userEvent.click(screen.getByText("濁音・拗音・記号"));
    await userEvent.click(screen.getByText("ず"));
    await userEvent.click(screen.getByText("通常の50音"));
    await userEvent.click(screen.getByText("き"));
    await userEvent.click(screen.getByText("ち"));
    await userEvent.click(screen.getByText("な"));
    await userEvent.click(screen.getByText("み"));
    await userEvent.click(screen.getByText("決定"));
  });
  it("show correct keys", () => {
    expect(screen.getAllByText("な").slice(-1)[0].parentNode).toHaveClass(
      "bg-green-500"
    );
  });
  it("show candidate keys", () => {
    expect(screen.getAllByText("す").slice(-1)[0].parentNode).toHaveClass(
      "bg-yellow-500"
    );
  });
  it("show wrong keys", () => {
    expect(screen.getAllByText("き").slice(-1)[0].parentNode).toHaveClass(
      "bg-gray-500"
    );
  });
});
describe("正誤判定", () => {
  beforeEach(() => {
    mockGenerateWordleAnswer.mockClear();
  });

  it("disable enter button for less than 6 chars", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    expect(screen.getByText("決定")).toBeDisabled();
    await userEvent.click(screen.getByText("あ"));
    await userEvent.click(screen.getByText("い"));
    await userEvent.click(screen.getByText("う"));
    expect(screen.getByText("決定")).toBeDisabled();
    await userEvent.click(screen.getByText("え"));
    await userEvent.click(screen.getByText("お"));
    await userEvent.click(screen.getByText("か"));
    await userEvent.click(screen.getByText("き"));
    expect(screen.getByText("決定")).toBeEnabled();
  });
  it("push answer history for candidate words", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    await userEvent.click(screen.getByText("す"));
    await userEvent.click(screen.getByText("濁音・拗音・記号"));
    await userEvent.click(screen.getByText("ず"));
    await userEvent.click(screen.getByText("通常の50音"));
    await userEvent.click(screen.getByText("き"));
    await userEvent.click(screen.getByText("ち"));
    await userEvent.click(screen.getByText("な"));
    await userEvent.click(screen.getByText("み"));
    await userEvent.click(screen.getByText("決定"));
    expect(screen.getAllByText("す")[0].parentNode).toHaveClass(
      "bg-yellow-500"
    );
    expect(screen.getAllByText("ず")[0].parentNode).toHaveClass("bg-gray-500");
    expect(screen.getAllByText("す").length).toBe(2);
  });
  it("show correct modal", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    await userEvent.click(screen.getByText("お"));
    await userEvent.click(screen.getByText("た"));
    await userEvent.click(screen.getByText("け"));
    await userEvent.click(screen.getByText("す"));
    await userEvent.click(screen.getByText("な"));
    await userEvent.click(screen.getAllByText("お").slice(-1)[0]);
    await userEvent.click(screen.getByText("決定"));
    expect(screen.getByText("Clear!")).toBeInTheDocument();
  });
  it("cannot input after clear", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    await userEvent.click(screen.getByText("お"));
    await userEvent.click(screen.getByText("た"));
    await userEvent.click(screen.getByText("け"));
    await userEvent.click(screen.getByText("す"));
    await userEvent.click(screen.getByText("な"));
    await userEvent.click(screen.getAllByText("お").slice(-1)[0]);
    await userEvent.click(screen.getByText("決定"));
    await userEvent.click(screen.getByTestId("modal-close-button"));
    await userEvent.click(screen.getAllByText("お").slice(-1)[0]);
    expect(screen.getAllByText("お").length).toBe(3);
  });
  it("show faild modal", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    for (let i = 0; i < 6; i++) {
      await userEvent.click(screen.getAllByText("す").slice(-1)[0]);
      await userEvent.click(screen.getByText("濁音・拗音・記号"));
      await userEvent.click(screen.getAllByText("ず").slice(-1)[0]);
      await userEvent.click(screen.getByText("通常の50音"));
      await userEvent.click(screen.getAllByText("き").slice(-1)[0]);
      await userEvent.click(screen.getAllByText("ち").slice(-1)[0]);
      await userEvent.click(screen.getAllByText("な").slice(-1)[0]);
      await userEvent.click(screen.getAllByText("み").slice(-1)[0]);
      await userEvent.click(screen.getAllByText("決定").slice(-1)[0]);
    }
    expect(screen.getByText("Failed...")).toBeInTheDocument();
  });
  it("cannot input after failed", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    for (let i = 0; i < 6; i++) {
      await userEvent.click(screen.getAllByText("す").slice(-1)[0]);
      await userEvent.click(screen.getByText("濁音・拗音・記号"));
      await userEvent.click(screen.getAllByText("ず").slice(-1)[0]);
      await userEvent.click(screen.getByText("通常の50音"));
      await userEvent.click(screen.getAllByText("き").slice(-1)[0]);
      await userEvent.click(screen.getAllByText("ち").slice(-1)[0]);
      await userEvent.click(screen.getAllByText("な").slice(-1)[0]);
      await userEvent.click(screen.getAllByText("み").slice(-1)[0]);
      await userEvent.click(screen.getAllByText("決定").slice(-1)[0]);
    }
    await userEvent.click(screen.getAllByText("す").slice(-1)[0]);
    await userEvent.click(screen.getByText("濁音・拗音・記号"));
    await userEvent.click(screen.getAllByText("ず").slice(-1)[0]);
    await userEvent.click(screen.getByText("通常の50音"));
    await userEvent.click(screen.getAllByText("き").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("ち").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("な").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("み").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("決定").slice(-1)[0]);
    expect(screen.getAllByText("ち").length).toBe(7);
  });
  it("show non-candidate modal", async () => {
    render(<GameBoard answerCandidates={answerCandidates} />);
    await userEvent.click(screen.getByText("あ"));
    await userEvent.click(screen.getByText("い"));
    await userEvent.click(screen.getByText("う"));
    await userEvent.click(screen.getByText("え"));
    await userEvent.click(screen.getByText("お"));
    await userEvent.click(screen.getByText("か"));
    await userEvent.click(screen.getByText("決定"));
    expect(
      screen.getByText("リリィ、CHARM、レギオンの名前ではありません")
    ).toBeInTheDocument();
  });
});

describe("ゲームモード", () => {
  beforeEach(() => {
    mockGenerateWordleAnswer.mockClear();
  });
  it("reset history and regenerate answer when mode changed", async () => {
    expect(mockGenerateWordleAnswer.mock.calls.length).toBe(0);
    render(<GameBoard answerCandidates={answerCandidates} />);
    expect(mockGenerateWordleAnswer.mock.calls.length).toBe(1);
    await userEvent.click(screen.getAllByText("す").slice(-1)[0]);
    await userEvent.click(screen.getByText("濁音・拗音・記号"));
    await userEvent.click(screen.getAllByText("ず").slice(-1)[0]);
    await userEvent.click(screen.getByText("通常の50音"));
    await userEvent.click(screen.getAllByText("き").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("ち").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("な").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("み").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("決定").slice(-1)[0]);
    await userEvent.click(screen.getAllByText("あ").slice(-1)[0]);
    await userEvent.click(screen.getByText("エンドレスチャレンジ"));
    expect(mockGenerateWordleAnswer.mock.calls.length).toBe(2);
    expect(mockGenerateWordleAnswer.mock.calls[1][1]).toBe("endless");
    expect(screen.getAllByText("す").length).toBe(1);
    expect(screen.getByText("す").parentNode).not.toHaveClass("bg-yellow-500");
    expect(screen.getAllByText("あ").length).toBe(1);
  });
  it("do nothing when tried to change the same mode; daily challenge", async () => {
    expect(mockGenerateWordleAnswer.mock.calls.length).toBe(0);
    render(<GameBoard answerCandidates={answerCandidates} />);
    expect(mockGenerateWordleAnswer.mock.calls.length).toBe(1);
    await userEvent.click(screen.getAllByText("す").slice(-1)[0]);
    await userEvent.click(screen.getByText("デイリーチャレンジ"));
    expect(mockGenerateWordleAnswer.mock.calls.length).toBe(1);
    expect(screen.getAllByText("す").length).toBe(2);
  });
});
