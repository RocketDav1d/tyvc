import { Meta, StoryObj } from '@storybook/react';

import Rating, { RatingProps } from './stars'; // Ensure this path matches your file structure

const meta: Meta<RatingProps> = {
  title: 'Components/Rating',
  component: Rating,
  // Define any argTypes for props if necessary for documentation or control customization
};

export default meta;

export const Two: StoryObj<RatingProps> = {
  args: {
    stars: 2
  },
};

export const Three: StoryObj<RatingProps> = {
    args: {
      stars: 3
    },
  };

export const Five: StoryObj<RatingProps> = {
args: {
    stars: 5
},
};
