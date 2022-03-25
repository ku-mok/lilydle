import KanaPanels from "./KanaPanels";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: KanaPanels,
} as ComponentMeta<typeof KanaPanels>;

export const Default: ComponentStoryObj<typeof KanaPanels> = {
  args: {
    isAlternate: false,
  },
};
export const Alternate: ComponentStoryObj<typeof KanaPanels> = {
  args: {
    isAlternate: true,
  },
};
export const CorrectCandidate: ComponentStoryObj<typeof KanaPanels> = {
  args: {
    isAlternate: false,
    correctKanas: ["あ", "わ", "ぱ"],
    candidateKanas: ["い", "ぶ"],
  },
};

export const CorrectCandidateAlternate: ComponentStoryObj<typeof KanaPanels> = {
  args: {
    isAlternate: true,
    correctKanas: ["あ", "わ", "ぱ"],
    candidateKanas: ["い", "ぶ"],
  },
};
