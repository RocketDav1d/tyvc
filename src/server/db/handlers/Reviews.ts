import { Review } from '@prisma/client';

import prisma from '@/server/db/prisma';

function reviewsForUser(userId: string) {
  return prisma.review.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

function reviewsHandler() {
  return prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

function reviewsForFundHandler(fundId: string) {
  return prisma.review.findMany({
    where: {
      fundId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}


async function createReviewHandler(
  reviewData: Partial<Review>,
  userId: string
) {
  return prisma.review.create({
    data: {
      ...reviewData,
      user: {
        connect: {
          id: userId,
        },
      },
    } as Review,
  });
}

export {
  reviewsForUser,
  reviewsHandler,
  createReviewHandler,
  reviewsForFundHandler,
};
