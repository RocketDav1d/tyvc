import type { NextApiRequest, NextApiResponse } from 'next';

import {
  importMediaHandler,
  removeMediaItem,
} from '@/server/db/handlers/Media';
import { withAPIKey } from '@/server/middleware/withProtect';
import { errorMessageJSON, HTTP_RESPONSE_CODE } from '@/server/utils';
import { logger } from '@/utils/logger';

type CreateMediaFunction = (mediaData: any) => Promise<any>;
type DeleteMediaFunction = (mediaId: string) => Promise<any>;

type MakeMediaProps = {
  createMediaFunction: CreateMediaFunction;
  deleteMediaFunction: DeleteMediaFunction;
};

/**
 * /api/v1/admin/cms/media
 * Available methods: POST, DELETE
 *
 * POST: Create a new media
 * DELETE: Delete a media
 *
 * @param req The next api request
 * @param res A response handler
 * @returns message
 */

export function makeContentHandler(makeProps: MakeMediaProps) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { createMediaFunction, deleteMediaFunction } = makeProps;

    try {
      switch (req.method) {
        case 'POST': {
          if (!req.body || Object.keys(req.body).length === 0) {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('Media data is required.'));
          }
          const mediaData = req.body;
          logger.debug('Media Data', mediaData);
          const creationResult = await createMediaFunction(mediaData);
          return res.status(HTTP_RESPONSE_CODE.OK).json({
            message: 'Media item created successfully.',
            data: creationResult,
          });
        }
        case 'DELETE': {
          if (!req.body || !req.body.SupabaseID) {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('SupabaseID is required.'));
          }
          const { SupabaseID } = req.body;
          await deleteMediaFunction(SupabaseID);
          return res
            .status(HTTP_RESPONSE_CODE.OK)
            .json({ message: 'Media deleted successfully.' });
        }
        default:
          res.setHeader('Allow', ['POST', 'DELETE']);
          return res
            .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
            .json(errorMessageJSON('POST or DELETE method is required'));
      }
    } catch (error: any) {
      logger.error(error);
      return res
        .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
        .json(errorMessageJSON(`Unhandled failure: ${error.toString()}`));
    }
  };
}

const contentHandler = makeContentHandler({
  createMediaFunction: importMediaHandler,
  deleteMediaFunction: removeMediaItem,
});

export default withAPIKey(contentHandler);
