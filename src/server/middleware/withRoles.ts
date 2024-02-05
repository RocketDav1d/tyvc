import { NextApiRequest, NextApiResponse } from 'next';

import { userByEmailHandler } from '@/server/db/handlers/User';
import { isAdmin } from '@/utils/admin';
import { logger } from '@/utils/logger';

export enum UserRole {
  PUBLIC = 'PUBLIC',
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
}

async function getUserByEmail(email: string) {
  try {
    const user = userByEmailHandler(email);
    return user;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

type HandlerFunction = {
  (req: NextApiRequest, res: NextApiResponse, payload: any): any;
};

export const withRoles = (handler: HandlerFunction, role: UserRole) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    { email }: { email: string }
  ) => {
    if (email) {
      const userDetails = await getUserByEmail(email);

      if (userDetails) {
        if (role === UserRole.ADMIN && !isAdmin(userDetails.role)) {
          return res.status(404).end();
        }
        if (
          role === UserRole.SUPERADMIN &&
          userDetails.role !== UserRole.SUPERADMIN
        ) {
          return res.status(404).end();
        }

        return handler(req, res, userDetails);
      }
    }

    return res.status(404).end();
  };
};
