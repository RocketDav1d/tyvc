import { Meta, StoryObj } from '@storybook/react';

import TeamMember, { TeamMemberProps } from './team-member';

const meta: Meta<TeamMemberProps> = {
  title: 'Components/TeamMember',
  component: TeamMember,
  // Define any argTypes for props if necessary for documentation or control customization
  argTypes: {
    investorData: {
      control: 'object',
      description: 'Data about the investor including name, stage, and year',
    },
  },
};

export default meta;

export const Default: StoryObj<TeamMemberProps> = {
  args: {
    investorData: {
      name: 'Dinika Mahtani',
      stage: 'Partner',
      year: '2022',
      logo: 'https://i2.wp.com/www.cherry.vc/wp-content/uploads/2021/12/ENDOM__51A0639_DINIKA_1x1_1.jpg?ssl=1',
      alt: 'Company Logo',
      stars: 2,
      number_reviews: 23
    },
  },
};

export const WithMultipleStages: StoryObj<TeamMemberProps> = {
  args: {
    investorData: {
      name: 'Global Tech Investments',
      stage: 'Series A, Series B',
      year: '2020',
      logo: '',
      alt: 'Company Logo',
      stars: 3,
      number_reviews: 12
    },
  },
};

export const WithRecentYear: StoryObj<TeamMemberProps> = {
  args: {
    investorData: {
      name: 'Innovation Partners',
      stage: 'Pre-Seed',
      year: '2023',
      logo: '',
      alt: 'Company Logo',
      stars: 5,
      number_reviews: 1
    },
  },
};
