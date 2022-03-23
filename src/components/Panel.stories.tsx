import Panel, { PanelProps } from "./Panel";
import { Story, Meta } from "@storybook/react";

export default {
  component: Panel,
  title: "Panel",
} as Meta;

const Template: Story<PanelProps> = (args) => (
  <div className="grid grid-cols-10 gap-1 w-4/12">
    <Panel {...args} />
  </div>
);

export const Correct = Template.bind({});
Correct.args = {
  status: "correct",
  character: "あ",
};

export const notSubmitted = Template.bind({});
notSubmitted.args = {
  status: "notSubmitted",
};
