import AnswerColumn from "./AnswerColumn";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: AnswerColumn,
} as ComponentMeta<typeof AnswerColumn>;

export const OneCorrectOneCandidate: ComponentStoryObj<typeof AnswerColumn> = {
  args: {
    input: "すずきちなみ",
    judge: ["candidate", "wrong", "wrong", "wrong", "correct", "wrong"],
  },
};
export const AllBlank: ComponentStoryObj<typeof AnswerColumn> = {
  args: {
    input: "",
  },
};
export const NotSubmitted: ComponentStoryObj<typeof AnswerColumn> = {
  args: {
    input: "すずきちなみ",
  },
};

export const Inputting: ComponentStoryObj<typeof AnswerColumn> = {
  args: {
    input: "すずきちなみ",
  },
};
