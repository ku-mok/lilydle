import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./AnswerHistory.stories";

const { Blank } = composeStories(stories);

it("render the same number of row as max answer number", () => {
  if (Blank.args?.maxAnswerCount) {
    render(<Blank />);
    expect(screen.getAllByTestId("row").length).toBe(Blank.args.maxAnswerCount);
  } else {
    expect(true).toBe(true);
  }
});
