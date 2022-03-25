import KanaPanelToggle from "./KanaPanelToggle";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: KanaPanelToggle,
} as ComponentMeta<typeof KanaPanelToggle>;

export const Default: ComponentStoryObj<typeof KanaPanelToggle> = {
  args: {
    isAlternate: false,
  },
};

export const Alternate: ComponentStoryObj<typeof KanaPanelToggle> = {
  args: {
    isAlternate: true,
  },
};
