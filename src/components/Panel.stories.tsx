import Panel, { PanelProps } from "./Panel";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: Panel,
} as ComponentMeta<typeof Panel>;

export const Correct: ComponentStoryObj<typeof Panel> = {
  render: (args: PanelProps) => (
    <div className="grid grid-cols-10 gap-1 w-4/12">
      <Panel {...args} />
    </div>
  ),
  args: {
    status: "correct",
    character: "あ",
  },
};

export const Candidate: ComponentStoryObj<typeof Panel> = {
  ...Correct,
  args: {
    status: "candidate",
    character: "あ",
  },
};

export const Wrong: ComponentStoryObj<typeof Panel> = {
  ...Correct,
  args: {
    status: "wrong",
    character: "あ",
  },
};

export const NotSubmitted: ComponentStoryObj<typeof Panel> = {
  ...Correct,
  args: {
    status: "notSubmitted",
    character: "あ",
  },
};
