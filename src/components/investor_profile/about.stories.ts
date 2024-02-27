import { Meta, StoryObj } from '@storybook/react';

import About, { AboutProps } from './about'; // Ensure this path matches your file structure

const meta: Meta<AboutProps> = {
  title: 'Components/About',
  component: About,
  // Define any argTypes for props if necessary for documentation or control customization
};

export default meta;

export const Default: StoryObj<AboutProps> = {
  args: {
    investorData: {
      about:
        'Acme Ventures is a leading investment firm focused on early to mid-stage startups.',
      stages: ['Seed'],
      sectors: ['Tech'],
      ticketSizes: ['$50k - $100k'],
    },
  },
};

export const WithLongDescription: StoryObj<AboutProps> = {
  args: {
    investorData: {
      about:
        'Acme Ventures, with over a decade of experience in the venture capital space, specializes in identifying and nurturing startups that show potential for significant growth. Our approach is hands-on, providing not only capital but also strategic advice and access to our extensive network.',
      stages: ['Pre-Seed', 'Seed', 'Series A'],
      sectors: ['Tech', 'Sustainability', 'E-commerce'],
      ticketSizes: ['$10k - $50k', '$50k - $100k'],
    },
  },
};
