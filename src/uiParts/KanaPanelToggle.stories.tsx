import KanaPanelToggle, { KanaPanelToggleProps } from "./KanaPanelToggle";
import { Story, Meta } from "@storybook/react";

export default {
  component: KanaPanelToggle,
  title: "KanaPanelToggle",
} as Meta;

const Template: Story<KanaPanelToggleProps> = (args) => (
  <KanaPanelToggle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isAlternate: false,
};

export const Alternate = Template.bind({});
Alternate.args = {
  isAlternate: true,
};
