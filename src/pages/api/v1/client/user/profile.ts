import type { NextApiRequest, NextApiResponse } from 'next';

import { withProtect } from '@/server/middleware/withProtect';
import { UserRole, withRoles } from '@/server/middleware/withRoles';
import { errorMessageJSON, HTTP_RESPONSE } from '@/server/utils';

type ApiHandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  payload: any
) => Promise<any>;

/**
 * /api/v1/user/profile
 * Available methods: GET
 *
 * GET: Get user profile
 *
 * @param req The next api request
 * @param res A response handler
 * @returns user details
 */
export function makeUserProfileHandler(): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse, userDetails) => {
    try {
      switch (req.method) {
        case 'GET':
          return res.status(200).json({ data: userDetails });

        default:
          return res
            .status(405)
            .json(errorMessageJSON(`${req.method} is unavailable`));
      }
    } catch (e: any) {
      return res
        .status(500)
        .json(
          errorMessageJSON(
            `${HTTP_RESPONSE.UNHANDLED_FAILURE}: ${e.toString()}`
          )
        );
    }
  };
}

const userProfileHandler = makeUserProfileHandler();

export default withProtect(withRoles(userProfileHandler, UserRole.USER));
