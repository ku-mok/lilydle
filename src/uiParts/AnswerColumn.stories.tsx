import AnswerColumn, { AnswerColumnProps } from "./AnswerColumn";
import { Story, Meta } from "@storybook/react";

export default {
  component: AnswerColumn,
  title: "AnswerColumn",
} as Meta;

const Template: Story<AnswerColumnProps> = (args) => <AnswerColumn {...args} />;

export const OneCorrectOneCandidate = Template.bind({});
OneCorrectOneCandidate.args = {
  input: "すずきちなみ",
  judge: ["candidate", "wrong", "wrong", "wrong", "correct", "wrong"],
};

export const AllBlank = Template.bind({});
AllBlank.args = {
  input: "",
};

export const NotSubmitted = Template.bind({});
NotSubmitted.args = {
  input: "すずきちなみ",
};

export const Inputting = Template.bind({});
Inputting.args = {
  input: "すずきち",
};
