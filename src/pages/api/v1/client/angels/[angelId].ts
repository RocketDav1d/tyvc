import { BusinessAngel } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { angelByIdHandler } from '@/server/db/handlers/Angel';
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

type FetchAngelFunction = (angelId: string) => Promise<BusinessAngel | null>;

type MakeAngelHandlerProps = {
  fetchAngelFunction: FetchAngelFunction;
};

/**
 * /api/v1/client/angels/[angelId]
 * Available methods: GET
 *
 * GET: Get an angel by id
 *
 * @param req The next api request
 * @param res A response handler
 * @returns data: angel
 */

export function makeAngelHandler(
  makeProps: MakeAngelHandlerProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchAngelFunction } = makeProps;
    const { angelId } = req.query;

    switch (req.method) {
      case 'GET':
        try {
          if (typeof angelId !== 'string') {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('Angel ID must be a string'));
          }

          const angel = await fetchAngelFunction(angelId);
          if (!angel) {
            return res
              .status(HTTP_RESPONSE_CODE.NOT_FOUND)
              .json(errorMessageJSON('Angel not found'));
          }

          return res.status(HTTP_RESPONSE_CODE.OK).json({ data: angel });
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

const angelHandler = makeAngelHandler({
  fetchAngelFunction: angelByIdHandler,
});

export default withProtect(withRoles(angelHandler, UserRole.USER));
