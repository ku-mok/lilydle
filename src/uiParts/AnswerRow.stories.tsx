import AnswerRow from "./AnswerRow";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: AnswerRow,
} as ComponentMeta<typeof AnswerRow>;

export const OneCorrectOneCandidate: ComponentStoryObj<typeof AnswerRow> = {
  args: {
    input: "すずきちなみ",
    judge: ["candidate", "wrong", "wrong", "wrong", "correct", "wrong"],
  },
};
export const AllBlank: ComponentStoryObj<typeof AnswerRow> = {
  args: {
    input: "",
  },
};
export const NotSubmitted: ComponentStoryObj<typeof AnswerRow> = {
  args: {
    input: "すずきちなみ",
  },
};

export const Inputting: ComponentStoryObj<typeof AnswerRow> = {
  args: {
    input: "すずきちなみ",
  },
};
