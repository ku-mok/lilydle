import KanaPanels, { KanaPanelsProps } from "./KanaPanels";
import { Story, Meta } from "@storybook/react";

export default {
  component: KanaPanels,
  title: "KanaPanels",
} as Meta;

const Template: Story<KanaPanelsProps> = (args) => <KanaPanels {...args} />;

export const Default = Template.bind({});
Default.args = {
  isalternate: false,
  onClick: (kana) => console.log(kana),
};
export const Correct = Template.bind({});
Correct.args = {
  isalternate: false,
  correctKanas: ["あ", "わ", "ぱ"],
  candidateKanas: ["い", "ぶ"],
};
export const Alternate = Template.bind({});
Alternate.args = {
  isalternate: true,
};
