import type { NextApiRequest, NextApiResponse } from 'next';

import {
  importBoardHandler,
  removeBoardById,
} from '@/server/db/handlers/Board';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';
import { logger } from '@/utils/logger';

type CreateBoardFunction = (boardData: any) => Promise<any>;
type DeleteBoardFunction = (SupabaseID: string) => Promise<any>;

type MakeBoardProps = {
  createBoardFunction: CreateBoardFunction;
  deleteBoardFunction: DeleteBoardFunction;
};

// schema
// {
//   SupabaseID: 'a098671f-72c9-4245-bdfa-be86df444e89'
//   name: 'dots automations',
//   year: '2021',
//   title: 'fwwef',
//   status: 'fwefw',
//   boardSeatOn: [ { id: '65d781d7e41b80b434b8eb0c', portfoliocompany: [Array] } ],

// }

/**
 * /api/v1/admin/cms/boards
 * Available methods: POST, DELETE
 *
 * POST: Create a new board
 * DELETE: Delete a board
 *
 * @param req The next api request
 * @param res A response handler
 * @returns message
 */

export function makeBoardHandler(makeProps: MakeBoardProps) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { createBoardFunction, deleteBoardFunction } = makeProps;

    try {
      switch (req.method) {
        case 'POST': {
          const boardData = req.body;
          const creationResult = await createBoardFunction(boardData);
          return res.status(HTTP_RESPONSE_CODE.OK).json({
            message: 'Board created successfully.',
            data: creationResult,
          });
        }
        case 'DELETE': {
          const { SupabaseID } = req.body;
          if (!SupabaseID) {
            return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({
              message: 'Invalid request body. SupabaseID is required.',
            });
          }
          const deletionResult = await deleteBoardFunction(SupabaseID);
          return res.status(HTTP_RESPONSE_CODE.OK).json({
            message: 'Board deleted successfully.',
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

const boardHandler = makeBoardHandler({
  createBoardFunction: importBoardHandler,
  deleteBoardFunction: removeBoardById,
});

export default withAPIKey(boardHandler);
