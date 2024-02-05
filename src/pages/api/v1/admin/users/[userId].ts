import type { NextApiRequest, NextApiResponse } from 'next';

import {
  updateUserByIdHandler,
  userByIdHandler,
} from '@/server/db/handlers/User';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';
import { logger } from '@/utils/logger';

type FetchUserDetailsFunction = (userId: string) => Promise<any>;
type UpdateUserDetailsFunction = (
  userId: string,
  userData: any
) => Promise<any>;

type MakeUserProps = {
  fetchUserDetailsFunction: FetchUserDetailsFunction;
  updateUserDetailsFunction: UpdateUserDetailsFunction;
};

export function makeUserHandler(makeProps: MakeUserProps) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { fetchUserDetailsFunction, updateUserDetailsFunction } = makeProps;
    const { userId } = req.query;

    if (typeof userId !== 'string') {
      return res
        .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
        .json(errorMessageJSON(HTTP_RESPONSE.BAD_REQUEST));
    }

    try {
      switch (req.method) {
        case 'GET': {
          const userDetails = await fetchUserDetailsFunction(userId);
          if (userDetails) {
            return res.status(HTTP_RESPONSE_CODE.OK).json(userDetails);
          } else {
            return res
              .status(HTTP_RESPONSE_CODE.NOT_FOUND)
              .json(errorMessageJSON(HTTP_RESPONSE.NOT_FOUND));
          }
        }
        case 'PUT': {
          const userData = req.body;
          const updatedUser = await updateUserDetailsFunction(userId, userData);
          return res.status(HTTP_RESPONSE_CODE.CREATED).json(updatedUser);
        }
        default:
          res.setHeader('Allow', ['GET', 'PUT']);
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

const userHandler = makeUserHandler({
  fetchUserDetailsFunction: userByIdHandler,
  updateUserDetailsFunction: updateUserByIdHandler,
});

export default withAPIKey(userHandler);
