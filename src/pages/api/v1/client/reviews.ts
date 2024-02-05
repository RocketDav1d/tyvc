import { Review } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  reviewsHandler,
  createReviewHandler,
} from '@/server/db/handlers/Reviews';
import { withProtect } from '@/server/middleware/withProtect';
import { UserRole, withRoles } from '@/server/middleware/withRoles';
import { errorMessageJSON, HTTP_RESPONSE } from '@/server/utils';

type ApiHandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

type FetchReviewsFunction = () => Promise<Review[]>;
type PostReviewFunction = (
  reviewData: Partial<Review>,
  userId: string
) => Promise<Review>;

type MakeReviewsProps = {
  fetchReviewsFunction: FetchReviewsFunction;
  postReviewFunction: PostReviewFunction;
};

export function makeReviewsHandler(
  makeProps: MakeReviewsProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchReviewsFunction, postReviewFunction } = makeProps;

    try {
      switch (req.method) {
        case 'GET':
          const reviews = await fetchReviewsFunction();
          return res.status(200).json({ data: reviews });

        case 'POST':
          const reviewData = req.body;
          const userId = req.query.userId as string; // Assuming the user ID is passed as a query parameter
          const review = await postReviewFunction(reviewData, userId);
          return res.status(201).json({ data: review });

        default:
          return res
            .status(405)
            .json(
              errorMessageJSON(`${req.method} is not supported on this route`)
            );
      }
    } catch (e: any) {
      return res
        .status(500)
        .json(
          errorMessageJSON(
            `${HTTP_RESPONSE.UNHANDLED_FAILURE}: ${e.message || e.toString()}`
          )
        );
    }
  };
}

const _reviewsHandler = makeReviewsHandler({
  fetchReviewsFunction: reviewsHandler,
  postReviewFunction: createReviewHandler,
});

export default withProtect(withRoles(_reviewsHandler, UserRole.USER));
