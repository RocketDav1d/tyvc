import { Meta, StoryObj } from '@storybook/react';


import Follow, { FollowProps } from './follow';

const meta: Meta<FollowProps> = {
  title: 'Buttons/Follow',
  component: Follow,
  // Define any argTypes for props if necessary for documentation or control customization
  argTypes: {
    isFollowing: {
      control: { type: 'bool' },
      description: 'Determines wether the user is following the Investor or not',
    },
    onFollowToggle: {
        action: 'change database', // the name that will appear in the actions panel
      },

  },
};

export default meta;


export const IsFollowing: StoryObj<FollowProps> = {
    args: {
      isFollowing: true,
    },
  };

export const IsNotFollowing: StoryObj<FollowProps> = {
args: {
    isFollowing: false,
},
};
