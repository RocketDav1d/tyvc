import type { NextApiRequest, NextApiResponse } from 'next';

import {
  importInvestmentHandler,
  removeInvestmentById,
} from '@/server/db/handlers/Investment';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';
import { logger } from '@/utils/logger';

type CreateInvestmentFunction = (investmentData: any) => Promise<any>;
type DeleteInvestmentFunction = (SupabaseID: string) => Promise<any>;

type MakeInvestmentProps = {
  createInvestmentFunction: CreateInvestmentFunction;
  deleteInvestmentFunction: DeleteInvestmentFunction;
};

/**
 * /api/v1/admin/cms/investments
 * Available methods: POST, DELETE
 *
 * POST: Create a new investment
 * DELETE: Delete an investment
 *
 * @param req The next api request
 * @param res A response handler
 * @returns message
 */

export function makeInvestmentHandler(makeProps: MakeInvestmentProps) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { createInvestmentFunction, deleteInvestmentFunction } = makeProps;

    try {
      switch (req.method) {
        case 'POST': {
          const investmentData = req.body;
          const createdInvestment =
            await createInvestmentFunction(investmentData);
          return res.status(HTTP_RESPONSE_CODE.OK).json({
            message: 'Investment created successfully.',
            data: createdInvestment,
          });
        }
        case 'DELETE': {
          const { SupabaseID } = req.body;
          if (!SupabaseID) {
            return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({
              message: 'Invalid request body. SupabaseID is required.',
            });
          }
          const deletionResult = await deleteInvestmentFunction(SupabaseID);
          return res.status(HTTP_RESPONSE_CODE.OK).json({
            message: 'Investment deleted successfully.',
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

const investmentHandler = makeInvestmentHandler({
  createInvestmentFunction: importInvestmentHandler,
  deleteInvestmentFunction: removeInvestmentById,
});

export default withAPIKey(investmentHandler);
