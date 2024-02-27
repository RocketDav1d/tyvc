import { Meta, StoryObj } from '@storybook/react';

import Diversity, { DiversityProps } from './diversity';

const meta: Meta<DiversityProps> = {
  title: 'Components/Diversity',
  component: Diversity,
  // Define any argTypes for props if necessary for documentation or control customization
  argTypes: {
    Companies: {
      control: 'object',
      description: 'Data about the investor including name, stage, and year',
    },
  },
};

export default meta;

export const Default: StoryObj<DiversityProps> = {
  args: {
    Companies: {
        OnlyWhiteMaleFounders: 23,
        Min1Woman: 12,
        Min1POC: 7,
        Min1WomanPOC: 4
    },
  },
};

export const WithMultipleStages: StoryObj<DiversityProps> = {
  args: {
    Companies: {
        OnlyWhiteMaleFounders: 23,
        Min1Woman: 12,
        Min1POC: 7,
        Min1WomanPOC: 4
    },
  },
};

export const WithRecentYear: StoryObj<DiversityProps> = {
  args: {
    Companies: {
        OnlyWhiteMaleFounders: 23,
        Min1Woman: 12,
        Min1POC: 7,
        Min1WomanPOC: 4
    },
  },
};
