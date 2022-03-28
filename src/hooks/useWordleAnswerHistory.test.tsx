import { RenderResult, renderHook, act } from "@testing-library/react-hooks";
import { useWordleAnswerHistory } from "./useWordleAnswerHistory";

let result: RenderResult<ReturnType<typeof useWordleAnswerHistory>>;
describe("入力に対する正誤判定", () => {
  beforeEach(() => {
    const answer = "おたけすなお";
    const answerCandidates = ["おたけすなお", "すずきちなみ", "おぐりひだか"];
    result = renderHook(() =>
      useWordleAnswerHistory(answer, answerCandidates)
    ).result;
  });
  it("judge answer correct or not", () => {
    act(() => {
      expect(result.current.judgeAnswer("おたけすなお")).toBe("correct");
      expect(result.current.judgeAnswer("すずきちなみ")).toBe("incorrect");
    });
  });
  it("judge out of candidate", () => {
    act(() => {
      expect(result.current.judgeAnswer("あいうえお")).toBe("not-candidate");
    });
  });
});

describe("解答履歴", () => {
  beforeEach(() => {
    const answer = "おたけすなお";
    const answerCandidates = ["おたけすなお", "すずきちなみ", "おぐりひだか"];
    result = renderHook(() =>
      useWordleAnswerHistory(answer, answerCandidates)
    ).result;
  });
  it("initial answer history is blank", () => {
    expect(result.current.answerHistory.length).toEqual(0);
  });
  it("store answer history", () => {
    const input = ["すずきちなみ", "おぐりひだか"];
    input.forEach((lily) =>
      act(() => {
        result.current.judgeAnswer(lily);
      })
    );
    expect(result.current.answerHistory.map((h) => h.input)).toEqual(
      expect.arrayContaining(input)
    );
    result.current.answerHistory.forEach((ans, idx) => {
      ans.input === input[idx];
    });
  });
  it("doesn't store non-candidate answer", () => {
    const input = ["すずきちなみ", "あいうえお"];
    const expected = ["すずきちなみ"];
    input.forEach((lily) =>
      act(() => {
        result.current.judgeAnswer(lily);
      })
    );
    expect(result.current.answerHistory.map((h) => h.input)).toEqual(
      expect.arrayContaining(expected)
    );
    expect(result.current.answerHistory.length).toBe(expected.length);
    result.current.answerHistory.forEach((ans, idx) => {
      expect(ans.input).toBe(expected[idx]);
    });
  });
  it("can reset history", () => {
    const input = ["すずきちなみ", "あいうえお"];
    input.forEach((lily) =>
      act(() => {
        result.current.judgeAnswer(lily);
      })
    );
    act(() => {
      result.current.resetHistory();
    });
    expect(result.current.answerHistory.length).toEqual(0);
  });
  it.each([
    [
      "すずきちなみ",
      ["candidate", "wrong", "wrong", "wrong", "correct", "wrong"],
    ],
    ["おぐりひだか", ["correct", "wrong", "wrong", "wrong", "wrong", "wrong"]],
  ])("judge character correctness", (input, expected) => {
    act(() => {
      result.current.judgeAnswer(input);
    });
    expect(result.current.answerHistory[0].judge.length).toBe(expected.length);
    result.current.answerHistory[0].judge.forEach((judge, idx) => {
      expect(judge).toBe(expected[idx]);
    });
  });
});

describe("文字履歴", () => {
  beforeEach(() => {
    const answer = "おたけすなお";
    const answerCandidates = ["おたけすなお", "すずきちなみ", "おぐりひだか"];
    result = renderHook(() =>
      useWordleAnswerHistory(answer, answerCandidates)
    ).result;
  });
  it("store candidate chars", () => {
    const input = "すずきちなみ";
    const expected = ["す"];
    act(() => {
      result.current.judgeAnswer(input);
    });
    expect(result.current.candidateChars.length).toBe(expected.length);
    result.current.candidateChars.forEach((candidate, idx) => {
      expect(candidate).toBe(expected[idx]);
    });
  });
  it("store correct chars", () => {
    const input = "すずきちなみ";
    const expected = ["な"];
    act(() => {
      result.current.judgeAnswer(input);
    });
    expect(result.current.correctChars.length).toBe(expected.length);
    result.current.correctChars.forEach((candidate, idx) => {
      expect(candidate).toBe(expected[idx]);
    });
  });
  it("store wrong chars", () => {
    const input = "すずきちなみ";
    const expected = ["き", "ち", "ず", "み"];
    act(() => {
      result.current.judgeAnswer(input);
    });
    expect(result.current.wrongChars.length).toBe(expected.length);
    result.current.wrongChars.forEach((candidate) => {
      expect(expected.includes(candidate)).toBeTruthy();
    });
  });
  it("judge out of candidate", () => {
    expect(result.current.judgeAnswer("あいうえお")).toBe("not-candidate");
  });
});
