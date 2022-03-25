import { render, screen } from "@testing-library/react";
import Header from "./Header";
import userEvent from "@testing-library/user-event";

it("daily challenge acitivated", () => {
  render(<Header mode="daily" onModeChange={jest.fn()} />);
  expect(screen.queryByText("デイリーチャレンジ")).toHaveClass("underline");
  expect(screen.queryByText("エンドレスチャレンジ")).not.toHaveClass(
    "underline"
  );
});

it("endless challenge acitivated", () => {
  render(<Header mode="endless" onModeChange={jest.fn()} />);
  expect(screen.queryByText("デイリーチャレンジ")).not.toHaveClass("underline");
  expect(screen.queryByText("エンドレスチャレンジ")).toHaveClass("underline");
});

it("toggle daily challenge", async () => {
  const onModeChange = jest.fn();
  render(<Header mode="daily" onModeChange={onModeChange} />);
  await userEvent.click(screen.getByText("デイリーチャレンジ"));
  expect(onModeChange).toHaveBeenCalledWith("daily");
});

it("toggle daily challenge", async () => {
  const onModeChange = jest.fn();
  render(<Header mode="daily" onModeChange={onModeChange} />);
  await userEvent.click(screen.getByText("エンドレスチャレンジ"));
  expect(onModeChange).toHaveBeenCalledWith("endless");
});
