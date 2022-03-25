import GameEndModal from "./GameEndModal";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: GameEndModal,
} as ComponentMeta<typeof GameEndModal>;

export const Clear: ComponentStoryObj<typeof GameEndModal> = {
  args: {
    answerDisplay: "尾竹廉",
    answer: "おたけすなお",
    lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
    isClear: true,
    answerHistory: [
      {
        input: "",
        judge: ["candidate", "candidate", "wrong", "candidate", "candidate"],
      },
      {
        input: "",
        judge: ["correct", "correct", "wrong", "wrong", "wrong"],
      },
    ],
  },
};
export const Failed: ComponentStoryObj<typeof GameEndModal> = {
  args: {
    ...Clear.args,
    isClear: false,
  },
};
