import AnswerColumn, { AnswerColumnProps } from "./AnswerColumn";
import { Story, Meta } from "@storybook/react";

export default {
  component: AnswerColumn,
  title: "AnswerColumn",
} as Meta;

const Template: Story<AnswerColumnProps> = (args) => <AnswerColumn {...args} />;

export const OneCorrectOneCandidate = Template.bind({});
OneCorrectOneCandidate.args = {
  answer: "おたけすなお",
  input: "すずきちなみ",
  isSubmitted: true,
};

export const AllBlank = Template.bind({});
AllBlank.args = {
  answer: "おたけすなお",
  input: "",
  isSubmitted: false,
};

export const NotSubmitted = Template.bind({});
NotSubmitted.args = {
  answer: "おたけすなお",
  input: "すずきちなみ",
  isSubmitted: false,
};
