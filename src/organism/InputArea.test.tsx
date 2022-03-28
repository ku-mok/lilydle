import { render, screen } from "@testing-library/react";
import InputArea from "./InputArea";
import userEvent from "@testing-library/user-event";

it("default is normal-seion mode", () => {
  const onKanaClick = jest.fn();
  const onBackSpaceClick = jest.fn();
  const onSubmitClick = jest.fn();
  render(
    <InputArea
      candidateKanas={[]}
      correctKanas={[]}
      onKanaClick={onKanaClick}
      onBackSpaceClick={onBackSpaceClick}
      onSubmitClick={onSubmitClick}
      wrongKanas={[]}
    />
  );
  expect(screen.queryByText("あ")).toBeInTheDocument();
  expect(screen.queryByText("が")).not.toBeInTheDocument();
});

it("toggle alter-daku-on, handaku-on mode", async () => {
  const onKanaClick = jest.fn();
  const onBackSpaceClick = jest.fn();
  const onSubmitClick = jest.fn();
  render(
    <InputArea
      candidateKanas={[]}
      correctKanas={[]}
      onKanaClick={onKanaClick}
      onBackSpaceClick={onBackSpaceClick}
      onSubmitClick={onSubmitClick}
      wrongKanas={[]}
    />
  );
  await userEvent.click(screen.getByText("濁音・拗音・記号"));
  expect(screen.queryByText("あ")).not.toBeInTheDocument();
  expect(screen.queryByText("が")).toBeInTheDocument();
});

it("toggle nomarl mode", async () => {
  const onKanaClick = jest.fn();
  const onBackSpaceClick = jest.fn();
  const onSubmitClick = jest.fn();
  render(
    <InputArea
      candidateKanas={[]}
      correctKanas={[]}
      onKanaClick={onKanaClick}
      onBackSpaceClick={onBackSpaceClick}
      onSubmitClick={onSubmitClick}
      wrongKanas={[]}
    />
  );
  await userEvent.click(screen.getByText("濁音・拗音・記号"));
  await userEvent.click(screen.getByText("通常の50音"));
  expect(screen.queryByText("あ")).toBeInTheDocument();
  expect(screen.queryByText("が")).not.toBeInTheDocument();
});
