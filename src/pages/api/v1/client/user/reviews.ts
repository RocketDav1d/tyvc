import { Review } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { reviewsForUser } from '@/server/db/handlers/Reviews';
import { withProtect } from '@/server/middleware/withProtect';
import { UserRole, withRoles } from '@/server/middleware/withRoles';
import { errorMessageJSON, HTTP_RESPONSE } from '@/server/utils';

type ApiHandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  payload: any
) => Promise<any>;

type FetchReviewsFunction = (userId: string) => Promise<Review[]>;

type MakeUserReviewsProps = {
  fetchReviewsFunction: FetchReviewsFunction;
};

/**
 * /api/v1/client/user/reviews
 * Available methods: GET
 *
 * GET: Get the latest reviews for the user based on createdAt
 *
 * @param req The next api request
 * @param res A response handler
 * @returns the latest user reviews
 */
export function makeUserReviewsHandler(
  makeProps: MakeUserReviewsProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse, userDetails) => {
    const { fetchReviewsFunction } = makeProps;

    try {
      switch (req.method) {
        case 'GET':
          // Assuming we have a function to fetch the latest reviews for the user
          const reviews = await fetchReviewsFunction(userDetails.id);
          return res.status(200).json({ data: reviews });

        default:
          return res
            .status(405)
            .json(errorMessageJSON(`${req.method} is unavailable`));
      }
    } catch (e: any) {
      return res
        .status(500)
        .json(
          errorMessageJSON(
            `${HTTP_RESPONSE.UNHANDLED_FAILURE}: ${e.toString()}`
          )
        );
    }
  };
}

const userReviewsHandler = makeUserReviewsHandler({
  fetchReviewsFunction: reviewsForUser,
});

export default withProtect(withRoles(userReviewsHandler, UserRole.USER));
