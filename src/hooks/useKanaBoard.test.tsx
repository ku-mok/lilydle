import { RenderResult, renderHook, act } from "@testing-library/react-hooks";
import { useKanaBoard } from "./useKanaBoard";

let result: RenderResult<ReturnType<typeof useKanaBoard>>;
describe("キーボードの入力の処理", () => {
  beforeEach(() => {
    result = renderHook(() => useKanaBoard(6)).result;
  });
  it("set default text as blank", () => {
    expect(result.current.inputtedText).toBe("");
  });
  it("add clicked charactor", () => {
    act(() => {
      result.current.onKanaClick("あ");
    });
    act(() => {
      result.current.onKanaClick("い");
    });
    expect(result.current.inputtedText).toBe("あい");
  });
  it("delate charactor when backspace pushed", () => {
    act(() => {
      result.current.onKanaClick("あ");
    });
    act(() => {
      result.current.onKanaClick("い");
    });
    act(() => {
      result.current.onBackSpaceClick();
    });
    expect(result.current.inputtedText).toBe("あ");
  });
  it("do noting for blank text when backspace pushed", () => {
    act(() => {
      result.current.onBackSpaceClick();
    });
    expect(result.current.inputtedText).toBe("");
  });
  it("can reset inputted text", () => {
    act(() => {
      result.current.onKanaClick("あ");
    });
    act(() => {
      result.current.onKanaClick("い");
    });
    act(() => {
      result.current.resestInputtedText();
    });
    expect(result.current.inputtedText).toBe("");
  });
});
