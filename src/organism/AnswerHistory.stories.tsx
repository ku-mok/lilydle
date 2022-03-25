import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import AnswerHistory from "./AnswerHistory";

export default {
  component: AnswerHistory,
} as ComponentMeta<typeof AnswerHistory>;

export const Blank: ComponentStoryObj<typeof AnswerHistory> = {
  render: (args) => (
    <div className="container mx-auto w-2/12">
      <AnswerHistory {...args} />{" "}
    </div>
  ),
  args: {
    answerHistory: [],
    inputtedText: "",
    maxAnswerCount: 6,
  },
};

export const Inputting: ComponentStoryObj<typeof AnswerHistory> = {
  render: (args) => (
    <div className="container mx-auto w-2/12">
      <AnswerHistory {...args} />{" "}
    </div>
  ),
  args: {
    answerHistory: [],
    inputtedText: "ああ",
    maxAnswerCount: 6,
  },
};

export const Filled: ComponentStoryObj<typeof AnswerHistory> = {
  render: (args) => (
    <div className="container mx-auto w-2/12">
      <AnswerHistory {...args} />{" "}
    </div>
  ),
  args: {
    answerHistory: [
      {
        input: "すずきちなみ",
        judge: ["candidate", "wrong", "wrong", "wrong", "correct", "wrong"],
      },
    ],
    inputtedText: "ああ",
    maxAnswerCount: 6,
  },
};
