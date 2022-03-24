import { RenderResult, renderHook, act } from "@testing-library/react-hooks";
import { useModal } from "./useModal";

let result: RenderResult<ReturnType<typeof useModal>>;
describe("モーダルの開閉処理", () => {
  beforeEach(() => {
    result = renderHook(() => useModal()).result;
  });
  it("set close as default", () => {
    expect(result.current.isModalOpen).toBeFalsy();
  });
  it("can open Modal", () => {
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toBeTruthy();
  });
  it("can close Modal", () => {
    act(() => {
      result.current.openModal();
    });
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBeFalsy();
  });
});
