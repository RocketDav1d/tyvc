import { Employee } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { employeeByIdHandler } from '@/server/db/handlers/Employee';
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

type FetchInvestorFunction = (investorId: string) => Promise<Employee | null>;

type MakeInvestorHandlerProps = {
  fetchInvestorFunction: FetchInvestorFunction;
};

/**
 * /api/v1/client/investors/[investorId]
 * Available methods: GET
 *
 * GET: Get an investor by id
 *
 * @param req The next api request
 * @param res A response handler
 * @returns data: fund
 */

export function makeInvestorHandler(
  makeProps: MakeInvestorHandlerProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchInvestorFunction } = makeProps;
    const { investorId } = req.query;

    if (typeof investorId !== 'string') {
      return res
        .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
        .json(errorMessageJSON('Investor Id must be a string'));
    }

    switch (req.method) {
      case 'GET':
        try {
          const investor = await fetchInvestorFunction(investorId);
          if (!investor) {
            return res
              .status(HTTP_RESPONSE_CODE.NOT_FOUND)
              .json(errorMessageJSON('Investor not found'));
          }

          return res.status(HTTP_RESPONSE_CODE.OK).json({ data: investor });
        } catch (e: any) {
          return res
            .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
            .json(
              errorMessageJSON(
                `${HTTP_RESPONSE.UNHANDLED_FAILURE}: ${e.message || e.toString()}`
              )
            );
        }
      default:
        return res
          .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
          .json(errorMessageJSON('Method not allowed'));
    }
  };
}

const fundHandler = makeInvestorHandler({
  fetchInvestorFunction: employeeByIdHandler,
});

export default withProtect(withRoles(fundHandler, UserRole.USER));
