import { PortfolioCompany } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { companyByIdHandler } from '@/server/db/handlers/PortfolioCompany';
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

type FetchCompanyFunction = (
  companyId: string
) => Promise<PortfolioCompany | null>;

type MakeCompanyHandlerProps = {
  fetchCompanyFunction: FetchCompanyFunction;
};

/**
 * /api/v1/client/companies/[companyId]
 * Available methods: GET
 *
 * GET: Get a company by id
 *
 * @param req The next api request
 * @param res A response handler
 * @returns data: company
 */

export function makeCompanyHandler(
  makeProps: MakeCompanyHandlerProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchCompanyFunction } = makeProps;
    const { companyId } = req.query;

    switch (req.method) {
      case 'GET':
        try {
          if (typeof companyId !== 'string') {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('Company ID must be a string'));
          }

          const company = await fetchCompanyFunction(companyId);
          if (!company) {
            return res
              .status(HTTP_RESPONSE_CODE.NOT_FOUND)
              .json(errorMessageJSON('Company not found'));
          }

          return res.status(HTTP_RESPONSE_CODE.OK).json({ data: company });
        } catch (e: any) {
          return res
            .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
            .json(
              errorMessageJSON(
                `${HTTP_RESPONSE.UNHANDLED_FAILURE}: ${e.message || e.toString()}`
              )
            );
        }
        break;
      default:
        return res
          .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
          .json(errorMessageJSON('Method not allowed'));
    }
  };
}

const companyHandler = makeCompanyHandler({
  fetchCompanyFunction: companyByIdHandler,
});

export default withProtect(withRoles(companyHandler, UserRole.USER));
