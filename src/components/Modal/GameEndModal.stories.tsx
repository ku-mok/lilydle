import GameEndModal, { GameEndModalProps } from "./GameEndModal";
import { Story, Meta } from "@storybook/react";

export default {
  component: GameEndModal,
  title: "GameEndModal",
} as Meta;

const Template: Story<GameEndModalProps> = (args) => <GameEndModal {...args} />;

export const Clear = Template.bind({});
Clear.args = {
  answerDisplay: "尾竹廉",
  answer: "おたけすなお",
  lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
  isClear: true,
  history: ["🟨🟨⬜🟨🟨", "🟩🟩⬜⬜⬜"],
};

export const Fail = Template.bind({});
Fail.args = {
  answerDisplay: "尾竹廉",
  answer: "おたけすなお",
  lemonadeUrl: "https://lemonade.lily.garden/lily/Otake_Sunao",
  isClear: false,
  history: ["🟨🟨⬜🟨🟨", "🟩🟩⬜⬜⬜"],
};
