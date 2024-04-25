import type { NextApiRequest, NextApiResponse } from 'next';

import { fundIdsHandler } from '@/server/db/handlers/Fund';
import { withProtect } from '@/server/middleware/withProtect';
import { UserRole, withRoles } from '@/server/middleware/withRoles';
import { errorMessageJSON, HTTP_RESPONSE } from '@/server/utils';

type ApiHandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

type fetchFundIdsFunction = () => Promise<string[]>;

type MakeFundsProps = {
  fetchFundIdsFunction: fetchFundIdsFunction;
};

/**
 * /api/v1/client/funds
 * Available methods: GET
 *
 * GET: Get all fund ids
 *
 * @param req The next api request
 * @param res A response handler
 * @returns data: fundIds
 */

export function makeFundsHandler(
  makeProps: MakeFundsProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchFundIdsFunction } = makeProps;

    try {
      switch (req.method) {
        case 'GET':
          const fundIds = await fetchFundIdsFunction();
          return res.status(200).json({ data: fundIds });
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

const _fundsHandler = makeFundsHandler({
  fetchFundIdsFunction: fundIdsHandler,
});

export default withProtect(withRoles(_fundsHandler, UserRole.USER));
