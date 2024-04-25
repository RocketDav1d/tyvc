// HelpfulProgressCard.stories.tsx
import { Meta, StoryObj } from '@storybook/react';

import Gamification, { GamificationProps } from './gamification'; // Adjust the import path as necessary

const meta: Meta<GamificationProps> = {
  title: 'Components/Gamification',
  component: Gamification,
  // Optionally define argTypes for controls and documentation
  argTypes: {
    total: {
      control: { type: 'number' },
      description: 'Total count required to reach the goal',
    },
    current: {
      control: { type: 'number' },
      description: 'Current count towards the goal',
    },
    label: {
      control: { type: 'text' },
      description: 'Main label for the card',
    },
    subLabel: {
      control: { type: 'text' },
      description: 'Sublabel providing additional information',
    },
    achievement: {
      control: { type: 'text' },
      description: 'The achievemnt unlocked with ranking up',
    },
    imageSrc: {
      control: { type: 'text' },
      description: 'd-string for svg',
    },
  },
};

export default meta;

// Default story
export const Default: StoryObj<GamificationProps> = {
  args: {
    total: 100,
    current: 50,
    label: 'Progress Towards Goal',
    subLabel: 'Keep going, you are halfway there!',
    achievement: 'Hug',
    imageSrc: '/assets/dashboard/grow-help.svg',
  },
};

// Example with a higher progress
export const HighProgress: StoryObj<GamificationProps> = {
  args: {
    total: 100,
    current: 80,
    label: 'High Progress',
    subLabel: 'Almost there, push a little more!',
    achievement: 'Hug',
    imageSrc: '/assets/dashboard/grow-help.svg',
  },
};

// Example with a low progress
export const LowProgress: StoryObj<GamificationProps> = {
  args: {
    total: 100,
    current: 20,
    label: 'Just Starting',
    subLabel: 'Every journey starts with a single step.',
    achievement: 'Hug',
    imageSrc: '/assets/dashboard/grow-help.svg',
  },
};
