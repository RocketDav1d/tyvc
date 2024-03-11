import type { NextApiRequest, NextApiResponse } from 'next';

import { withProtect } from '@/server/middleware/withProtect';
import { UserRole, withRoles } from '@/server/middleware/withRoles';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';

type ApiHandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  payload: any
) => Promise<any>;

type OnboardingSubmission = {
  role: string;
  data: any; // Assuming 'data' is a generic object for user data. Adjust the type as needed.
};

type AddUserSubmissionDataFunction = (
  userId: string,
  submission: OnboardingSubmission
) => Promise<{ success: boolean }>;

type MakeOnboardingSubmitProps = {
  addUserSubmissionData: AddUserSubmissionDataFunction;
};

const validateOnboardingSubmission = (
  submission: OnboardingSubmission
): boolean => {
  // Implement validation logic here. This is a placeholder function.
  // For example, check if 'role' is valid and 'data' contains required fields.
  return true; // Return true if valid, false otherwise.
};

/**
 * /api/v1/onboarding/submit
 * Available methods: POST
 *
 * POST: Submit onboarding data
 *
 * @param req The next api request
 * @param res A response handler
 * @returns a message indicating the success of the submission
 */
export function makeOnboardingSubmitHandler(
  makeProps: MakeOnboardingSubmitProps
): ApiHandlerFunction {
  return async (req: NextApiRequest, res: NextApiResponse, userDetails) => {
    try {
      if (req.method !== 'POST') {
        return res
          .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
          .json(
            errorMessageJSON(
              `${req.method} ${HTTP_RESPONSE.METHOD_NOT_ALLOWED}`
            )
          );
      }

      const { addUserSubmissionData } = makeProps;

      const submission: OnboardingSubmission = req.body;

      if (!validateOnboardingSubmission(submission)) {
        return res
          .status(400)
          .json(errorMessageJSON('Invalid submission data'));
      }

      // Add data to user and create necessary entities
      try {
        const result = await addUserSubmissionData(userDetails.id, submission);
        if (!result.success) {
          return res
            .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
            .json(errorMessageJSON('Failed to add submission data'));
        }
      } catch (error) {
        console.error('Error adding submission data:', error);
        return res
          .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
          .json(errorMessageJSON(HTTP_RESPONSE.UNHANDLED_FAILURE));
      }

      return res
        .status(200)
        .json({ message: 'Onboarding submission successful' });
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

const onboardingSubmitHandler = makeOnboardingSubmitHandler(
  // Replace 'addUserSubmissionData' with the actual function to add submission data
  { addUserSubmissionData: async () => ({ success: true }) }
);

export default withProtect(withRoles(onboardingSubmitHandler, UserRole.USER));
