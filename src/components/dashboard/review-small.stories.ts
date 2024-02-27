import { Meta, StoryObj } from '@storybook/react';

import ReviewSmall, { ReviewSmallProps } from './review-small';

const meta: Meta<ReviewSmallProps> = {
    title: 'Components/ReviewSmall',
    component: ReviewSmall,
    argTypes: {
        avatar: {
            control: { type: 'text' },
            description: 'URL of the avatar image',
        },
        name: {
            control: { type: 'text' },
            description: 'Name of the reviewer',
        },
        rating: {
            control: { type: 'number' },
            description: 'Rating given by the reviewer',
        },
        recommendations: {
            control: { type: 'number' },
            description: 'Number of recommendations',
        },
        verified: {
            control: { type: 'boolean' },
            description: 'Indicates if the review is verified',
        },
        headline: {
            control: { type: 'text' },
            description: 'Headline of the review',
        },
        text: {
            control: { type: 'text' },
            description: 'Main text of the review',
        },
        date: {
            control: { type: 'date' },
            description: 'Date of the review',
        },
        investmentRaised: {
            control: { type: 'boolean' },
            description: 'Indicates if investment was raised',
        },
    },
};

export default meta;

export const Default: StoryObj<ReviewSmallProps> = {
    args: {
        avatar: 'https://via.placeholder.com/150',
        name: 'John Doe',
        rating: 4,
        recommendations: 5,
        verified: false,
        headline: 'Great Experience',
        text: 'I had a wonderful experience with the service. Highly recommend it!',
        date: '2022-01-01',
        investmentRaised: false,
    },
};

export const VerifiedWithInvestment: StoryObj<ReviewSmallProps> = {
    args: {
        avatar: 'https://via.placeholder.com/150',
        name: 'Jane Smith',
        rating: 5,
        recommendations: 10,
        verified: true,
        headline: 'Exceptional Service',
        text: 'The team went above and beyond. Our startup raised significant investment thanks to their support!',
        date: '2021-06-01',
        investmentRaised: true,
    },
};
