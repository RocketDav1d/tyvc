import { OnboardingStatus } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { updateUserByIdHandler } from '@/server/db/handlers/User';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';

type UpdateOnboardingStatusFunction = (
  userId: string,
  onboardingStatus: OnboardingStatus
) => Promise<any>;

type MakeUpdateOnboardingStatusProps = {
  updateOnboardingStatusFunction: UpdateOnboardingStatusFunction;
};

export function makeUpdateOnboardingStatusHandler(
  makeProps: MakeUpdateOnboardingStatusProps
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { updateOnboardingStatusFunction } = makeProps;
    const { userId } = req.query;

    if (typeof userId !== 'string') {
      return res
        .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
        .json(errorMessageJSON(HTTP_RESPONSE.BAD_REQUEST));
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res
        .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
        .json(errorMessageJSON('POST method is required'));
    }

    const { status } = req.body;
    if (typeof status !== 'string') {
      return res
        .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
        .json(errorMessageJSON('Invalid body: accepted must be a string'));
    }

    const onboardingStatus =
      status.toLowerCase() === 'approved'
        ? OnboardingStatus.APPROVED
        : status.toLowerCase() === 'rejected'
          ? OnboardingStatus.REJECTED
          : OnboardingStatus.PENDING;

    try {
      const updatedUser = await updateOnboardingStatusFunction(
        userId,
        onboardingStatus
      );
      return res.status(HTTP_RESPONSE_CODE.OK).json(updatedUser);
    } catch (error: any) {
      console.error(error);
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

const updateOnboardingStatusHandler = makeUpdateOnboardingStatusHandler({
  updateOnboardingStatusFunction: async (userId, onboardingStatus) => {
    return updateUserByIdHandler(userId, { onboardingStatus });
  },
});

export default withAPIKey(updateOnboardingStatusHandler);
