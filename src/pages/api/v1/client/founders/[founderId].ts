import { Founder } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { founderByIdHandler } from '@/server/db/handlers/Founder';
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

type FetchFounderFunction = (founderId: string) => Promise<Founder | null>;

type MakeFounderHandlerProps = {
  fetchFounderFunction: FetchFounderFunction;
};

/**
 * /api/v1/client/founders/[founderId]
 * Available methods: GET
 *
 * GET: Get a founder by id
 *
 * @param req The next api request
 * @param res A response handler
 * @returns data: founder
 */

export function makeFounderHandler(
  makeProps: MakeFounderHandlerProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchFounderFunction } = makeProps;
    const { founderId } = req.query;

    switch (req.method) {
      case 'GET':
        try {
          if (typeof founderId !== 'string') {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('Founder ID must be a string'));
          }

          const founder = await fetchFounderFunction(founderId);
          if (!founder) {
            return res
              .status(HTTP_RESPONSE_CODE.NOT_FOUND)
              .json(errorMessageJSON('Founder not found'));
          }

          return res.status(HTTP_RESPONSE_CODE.OK).json({ data: founder });
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

const founderHandler = makeFounderHandler({
  fetchFounderFunction: founderByIdHandler,
});

export default withProtect(withRoles(founderHandler, UserRole.USER));
