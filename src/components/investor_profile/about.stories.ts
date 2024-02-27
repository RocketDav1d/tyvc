import type { Meta, StoryObj } from '@storybook/react';

import { About } from './about';



const meta = {
  title: 'Example/About',
  component: About,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof About>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
