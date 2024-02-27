import { Meta, StoryObj } from '@storybook/react';


import AddReview, { AddReviewProps } from './add-review';

const meta: Meta<AddReviewProps> = {
  title: 'Buttons/AddReview',
  component: AddReview,
  // Define any argTypes for props if necessary for documentation or control customization
  argTypes: {
    onAddReviewToggle: {
      action: 'change database', // the name that will appear in the actions panel
    },
    reviewLabel: {
      control: { type: 'text' },
    },
  },
};

export default meta;


export const Add: StoryObj<AddReviewProps> = {
    args: {
    },
  };
