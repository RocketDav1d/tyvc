import { OnboardingStatus } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { updateUserByIdHandler } from '@/server/db/handlers/User';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';
import { sendNotificationEmail } from '@/utils/email/handlers/notification';

const rejectUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res
      .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
      .json(errorMessageJSON('POST method is required'));
  }

  const { userId } = req.query;
  const { reason } = req.body; // Extracting the rejection reason from the request body

  if (typeof userId !== 'string' || typeof reason !== 'string') {
    return res
      .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
      .json(errorMessageJSON(HTTP_RESPONSE.BAD_REQUEST));
  }

  try {
    const updatedUser = await updateUserByIdHandler(userId, {
      onboardingStatus: OnboardingStatus.REJECTED,
    });

    // Send rejection email using the sendNotificationEmail function from notification.tsx
    await sendNotificationEmail({
      to: updatedUser.email, // Assuming updatedUser has an email field
      from: process.env.RESEND_FROM_EMAIL as string, // Replace with actual sender's email address
      hostUrl: req.headers.host as string,
      action: 'reject',
      payload: { reason }, // Include the rejection reason in the payload
    });

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

export default withAPIKey(rejectUserHandler);
