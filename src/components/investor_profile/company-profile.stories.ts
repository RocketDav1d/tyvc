import { Meta, StoryObj } from '@storybook/react';

import CompanyProfile, { CompanyProfileProps } from './company-profile';

const meta: Meta<CompanyProfileProps> = {
  title: 'Components/CompanyProfile',
  component: CompanyProfile,
  // Define any argTypes for props if necessary for documentation or control customization
  argTypes: {
    investorData: {
      control: 'object',
      description: 'Data about the investor including name, stage, and year',
    },
  },
};

export default meta;

export const Default: StoryObj<CompanyProfileProps> = {
  args: {
    investorData: {
      name: 'Cherry Ventures',
      stage: 'Seed',
      year: '2022',
      logo: 'https://foodinnovationcamp.de/wp-content/uploads/2020/11/cherry_400.png',
      alt: 'Company Logo',
    },
  },
};

export const WithMultipleStages: StoryObj<CompanyProfileProps> = {
  args: {
    investorData: {
      name: 'Global Tech Investments',
      stage: 'Series A, Series B',
      year: '2020',
      logo: '',
      alt: 'Company Logo',
    },
  },
};

export const WithRecentYear: StoryObj<CompanyProfileProps> = {
  args: {
    investorData: {
      name: 'Innovation Partners',
      stage: 'Pre-Seed',
      year: '2023',
      logo: '',
      alt: 'Company Logo',
    },
  },
};
