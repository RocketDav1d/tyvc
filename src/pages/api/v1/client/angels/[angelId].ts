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

export function makeAngelHandler(
  makeProps: MakeAngelHandlerProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchAngelFunction } = makeProps;
    const { angelId } = req.query;

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
  };
}

const angelHandler = makeAngelHandler({
  fetchAngelFunction: angelByIdHandler, // You need to implement this function
});

export default withProtect(withRoles(angelHandler, UserRole.USER));
