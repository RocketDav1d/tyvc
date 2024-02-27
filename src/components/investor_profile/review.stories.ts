import { Meta, StoryObj } from '@storybook/react';

import Review, { ReviewProps } from './review'; // Ensure this path matches your file structure

const meta: Meta<ReviewProps> = {
  title: 'Components/Review',
  component: Review,
  // Define any argTypes for props if necessary for documentation or control customization
};

export default meta;

export const CherryVentures: StoryObj<ReviewProps> = {
  args: {
    review: {
       tyvcscore: 2,
       criteria: [2, 4, 1, 5, 3, 0, 2, 4, 1, 5, 3, 0],
       tags: ["Serial-Founder", "Pre-Seed", "SAAS"],
       date: "November 2023",
       headline: "Cherry sucks",
       subheadline: "Zero support in finding employees",
       content: "Bro Cherry straigh up cappin",
       author: "Dominik Scherm",
       investor_name: "Cherry Ventures",
       helpfulness: 14,
       stage: "Seed",
       labels: {
        verifiedInvestment: "Verified Investment",
        founderReceivedInvestment: "Founder has received an investment from ",
        trustYourVCVerified: "Trustyourvc has verified that an investment has taken place.",
        reportReview: "Report Review",
        showStars: "Show Stars",
        foundersFoundReviewHelpful: "founders found the review helpful.",
        youToo: "You Too?",
        connection: "Connection",
        sendConnectionRequest: "Send out a connection request to",
        authorWillReceiveMail: "will receive a mail about the connectio request.",
        whenAuthorAccepts: "When the author accepts the request you get access to their LinkedIn",
        cancel: "Cancel",
        continue: "Continue"
    }
    },
  },
};


export const HVCapital: StoryObj<ReviewProps> = {
    args: {
      review: {
         tyvcscore: 2,
         criteria: [2, 4, 1, 5, 3, 0, 2, 4, 1, 5, 3, 0],
         tags: ["Serial-Founder", "Pre-Seed", "SAAS"],
         date: "November 2023",
         headline: "Cherry sucks",
         subheadline: "Zero support in finding employees",
         content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
         author: "Dominik Scherm",
         investor_name: "HV Capital",
         helpfulness: 14,
         stage: "Pre-Seed",
         labels: {
            verifiedInvestment: "Verified Investment",
            founderReceivedInvestment: "Founder has received an investment from ",
            trustYourVCVerified: "Trustyourvc has verified that an investment has taken place.",
            reportReview: "Report Review",
            showStars: "Show Stars",
            foundersFoundReviewHelpful: "founders found the review helpful.",
            youToo: "You Too?",
            connection: "Connection",
            sendConnectionRequest: "Send out a connection request to",
            authorWillReceiveMail: "will receive a mail about the connectio request.",
            whenAuthorAccepts: "When the author accepts the request you get access to their LinkedIn",
            cancel: "Cancel",
            continue: "Continue"
        }
      },
    },
  };


  export const Sequoia: StoryObj<ReviewProps> = {
    args: {
      review: {
         tyvcscore: 5,
         criteria: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
         tags: ["Serial-Founder", "Pre-Seed", "SAAS"],
         date: "November 2023",
         headline: "Sequoia rocks",
         subheadline: "Full support in finding employees",
         content: "Sequoia helped us increase our value by 1000x. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
         author: "Dominik Scherm",
         investor_name: "Sequoia",
         helpfulness: 14,
         stage: "Series A",
         labels: {
            verifiedInvestment: "Verified Investment",
            founderReceivedInvestment: "Founder has received an investment from ",
            trustYourVCVerified: "Trustyourvc has verified that an investment has taken place.",
            reportReview: "Report Review",
            showStars: "Show Stars",
            foundersFoundReviewHelpful: "founders found the review helpful.",
            youToo: "You Too?",
            connection: "Connection",
            sendConnectionRequest: "Send out a connection request to",
            authorWillReceiveMail: "will receive a mail about the connectio request.",
            whenAuthorAccepts: "When the author accepts the request you get access to their LinkedIn",
            cancel: "Cancel",
            continue: "Continue"
        }
      },
    },
  };
