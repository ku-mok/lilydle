import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import Header from "./Header";
export default {
  component: Header,
} as ComponentMeta<typeof Header>;
export const Daily: ComponentStoryObj<typeof Header> = {};

export const Endless: ComponentStoryObj<typeof Header> = {};
