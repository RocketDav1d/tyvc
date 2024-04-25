import { Review } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { reviewsForFundHandler } from '@/server/db/handlers/Reviews';
import { withProtect } from '@/server/middleware/withProtect';
import { UserRole, withRoles } from '@/server/middleware/withRoles';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';

type ApiHandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

type FetchReviewsFunction = (fundId: string) => Promise<Review[]>;

type MakeReviewsProps = {
  fetchReviewsFunction: FetchReviewsFunction;
};

/**
 * /api/v1/client/funds/[fundId]/reviews
 * Available methods: GET
 *
 * GET: Get reviews for a fund by id
 *
 * @param req The next api request
 * @param res A response handler
 * @returns data: reviews
 */

export function makeReviewsHandler(
  makeProps: MakeReviewsProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchReviewsFunction } = makeProps;
    const { fundId } = req.query;

    if (typeof fundId !== 'string') {
      return res
        .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
        .json(errorMessageJSON('Fund ID must be a string'));
    }

    try {
      switch (req.method) {
        case 'GET':
          const reviews = await fetchReviewsFunction(fundId);
          return res.status(200).json({ data: reviews });

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
  fetchReviewsFunction: reviewsForFundHandler,
});

export default withProtect(withRoles(_reviewsHandler, UserRole.USER));
