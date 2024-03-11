import type { NextApiRequest, NextApiResponse } from 'next';

import {
  importCompanyHandler,
  removeCompanyById,
} from '@/server/db/handlers/PortfolioCompany';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';
import { logger } from '@/utils/logger';

type CreatePortfolioCompanyFunction = (companyData: any) => Promise<any>;
type DeletePortfolioCompanyFunction = (SupabaseID: string) => Promise<any>;

type MakePortfolioCompanyProps = {
  createPortfolioCompanyFunction: CreatePortfolioCompanyFunction;
  deletePortfolioCompanyFunction: DeletePortfolioCompanyFunction;
};

/**
 * /api/v1/admin/cms/companies
 * Available methods: POST, DELETE
 *
 * POST: Create a new portfolio company
 * DELETE: Delete a portfolio company
 *
 * @param req The next api request
 * @param res A response handler
 * @returns message
 */

export function makePortfolioCompanyHandler(
  makeProps: MakePortfolioCompanyProps
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { createPortfolioCompanyFunction, deletePortfolioCompanyFunction } =
      makeProps;

    try {
      switch (req.method) {
        case 'POST': {
          const companyData = req.body;
          const createdCompany =
            await createPortfolioCompanyFunction(companyData);
          return res.status(HTTP_RESPONSE_CODE.CREATED).json(createdCompany);
        }
        case 'DELETE': {
          const { SupabaseID } = req.body;
          if (!SupabaseID) {
            return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({
              message: 'Invalid request body. SupabaseID is required.',
            });
          }
          const deletionResult =
            await deletePortfolioCompanyFunction(SupabaseID);
          return res.status(HTTP_RESPONSE_CODE.OK).json({
            message: 'PortfolioCompany deleted successfully.',
            data: deletionResult,
          });
        }
        default:
          res.setHeader('Allow', ['POST', 'DELETE']);
          return res
            .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
            .json(errorMessageJSON(`${req.method} is unavailable`));
      }
    } catch (error: any) {
      logger.error(error);
      return res
        .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
        .json(
          errorMessageJSON(
            `${HTTP_RESPONSE.UNHANDLED_FAILURE}: ${error.toString()}`
          )
        );
    }
  };
}

const portfolioCompanyHandler = makePortfolioCompanyHandler({
  createPortfolioCompanyFunction: importCompanyHandler,
  deletePortfolioCompanyFunction: removeCompanyById,
});

export default withAPIKey(portfolioCompanyHandler);
