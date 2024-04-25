import type { NextApiRequest, NextApiResponse } from 'next';

import { userByIdHandler } from '@/server/db/handlers/User';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';
import { sendNotificationEmail } from '@/utils/email/handlers/notification';


const approveUserHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res
      .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
      .json(errorMessageJSON('POST method is required'));
  }

  const { userId } = req.query;

  if (typeof userId !== 'string') {
    return res
      .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
      .json(errorMessageJSON(HTTP_RESPONSE.BAD_REQUEST));
  }

  try {
    const user = await userByIdHandler(userId);

    if (!user || !user.email) {
        return res
          .status(HTTP_RESPONSE_CODE.NOT_FOUND)
          .json(errorMessageJSON('User or user email not found'));
      }

    // Send an email to the user notifying them of the approval
    await sendNotificationEmail({
      to: user.email, // Assuming updatedUser has an email field
      from: process.env.RESEND_FROM_EMAIL as string, // Replace with actual sender's email address
      hostUrl: req.headers.host as string,
      action: 'other',
    });

    return res.status(HTTP_RESPONSE_CODE.OK).json({
      message: 'SetUp Call Mail sent successfully.',
      user: user,
    });
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

export default withAPIKey(approveUserHandler);
