import { Fund } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { fundByIdHandler } from '@/server/db/handlers/Fund';
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

type FetchFundFunction = (fundId: string) => Promise<Fund | null>;

type MakeFundHandlerProps = {
  fetchFundFunction: FetchFundFunction;
};

export function makeFundHandler(
  makeProps: MakeFundHandlerProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchFundFunction } = makeProps;
    const { fundId } = req.query;

    try {
      if (typeof fundId !== 'string') {
        return res
          .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
          .json(errorMessageJSON('Fund ID must be a string'));
      }

      const fund = await fetchFundFunction(fundId);
      if (!fund) {
        return res
          .status(HTTP_RESPONSE_CODE.NOT_FOUND)
          .json(errorMessageJSON('Fund not found'));
      }

      return res.status(HTTP_RESPONSE_CODE.OK).json({ data: fund });
    } catch (e: any) {
      return res
        .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
        .json(
          errorMessageJSON(
            `${HTTP_RESPONSE.UNHANDLED_FAILURE}: ${e.message || e.toString()}`
          )
        );
    }
  };
}

const fundHandler = makeFundHandler({
  fetchFundFunction: fundByIdHandler,
});

export default withProtect(withRoles(fundHandler, UserRole.USER));
