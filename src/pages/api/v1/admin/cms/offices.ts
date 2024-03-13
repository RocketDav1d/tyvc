import type { NextApiRequest, NextApiResponse } from 'next';

import {
  importOfficeHandler,
  removeOfficeById,
} from '@/server/db/handlers/Office';
import { withAPIKey } from '@/server/middleware/withProtect';
import { errorMessageJSON, HTTP_RESPONSE_CODE } from '@/server/utils';
import { logger } from '@/utils/logger';

type CreateOfficeFunction = (officeData: any) => Promise<any>;
type DeleteOfficeFunction = (officeId: string) => Promise<any>;

type MakeOfficeProps = {
  createOfficeFunction: CreateOfficeFunction;
  deleteOfficeFunction: DeleteOfficeFunction;
};

/**
 * /api/v1/admin/cms/offices
 * Available methods: POST, DELETE
 *
 * POST: Create a new office
 * DELETE: Delete an office
 *
 * @param req The next api request
 * @param res A response handler
 * @returns message
 */

export function makeOfficeHandler(makeProps: MakeOfficeProps) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { createOfficeFunction, deleteOfficeFunction } = makeProps;

    try {
      switch (req.method) {
        case 'POST': {
          logger.debug(req);
          const officeData = req.body;
          const newOffice = await createOfficeFunction(officeData);
          return res.status(HTTP_RESPONSE_CODE.OK).json({
            message: 'Office created successfully.',
            data: newOffice,
          });
        }
        case 'DELETE': {
          if (!req.body || !req.body.officeId) {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('officeId is required.'));
          }
          const { officeId } = req.body;
          await deleteOfficeFunction(officeId);
          return res
            .status(HTTP_RESPONSE_CODE.OK)
            .json({ message: 'Office deleted successfully.' });
        }
        default:
          res.setHeader('Allow', ['POST', 'DELETE']);
          return res
            .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
            .json(errorMessageJSON('POST or DELETE method is required'));
      }
    } catch (error: any) {
      console.error(error);
      return res
        .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
        .json(errorMessageJSON(`Unhandled failure: ${error.toString()}`));
    }
  };
}

const officeHandler = makeOfficeHandler({
  createOfficeFunction: importOfficeHandler,
  deleteOfficeFunction: removeOfficeById,
});

export default withAPIKey(officeHandler);
