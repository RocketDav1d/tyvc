import { Meta, StoryObj } from '@storybook/react';

import FundGenerations, { FundGenerationsProps } from './fund-generations'; // Ensure this path matches your file structure

const meta: Meta<FundGenerationsProps> = {
  title: 'Components/Fund Generations',
  component: FundGenerations,
  // Define any argTypes for props if necessary for documentation or control customization
};

export default meta;

export const CherryVentures: StoryObj<FundGenerationsProps> = {
    args: {
      fundGenerations: {
          2000: 100,
          2001: 200,
          2004: 400,
          2010: 700,
      },
    },
  };
