import { OnboardingStatus, User } from '@prisma/client';

import { OnboardingSubmission } from '@/pages/api/v1/client/onboarding/submit';
import prisma from '@/server/db/prisma';
import { generateSlug } from '@/server/utils';
import { logger } from '@/utils/logger';

function userByEmailHandler(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

function userByIdHandler(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

function checkUserOnboardingStatus(email: string) {
  return prisma.user
    .findUnique({
      where: { email },
      select: { onboardingStatus: true },
      cacheStrategy: { ttl: 60, swr: 30 },
    })
    .then((user) => user?.onboardingStatus);
}

function usersHandler() {
  return prisma.user.findMany({
    orderBy: { firstName: 'asc' },
  });
}

async function updateUserByIdHandler(
  userId: string,
  userDetails: Partial<User>
): Promise<any> {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...userDetails,
      onboardingData: undefined,
    },
  });
}

async function removeUserByIdHandler(userId: string): Promise<User | null> {
  // Remove all accounts
  await prisma.account.deleteMany({
    where: {
      userId,
    },
  });

  // Remove all sessions
  await prisma.session.deleteMany({
    where: {
      userId,
    },
  });

  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

async function addUserSubmissionDataHandler(
  userId: string,
  submission: OnboardingSubmission
): Promise<{ success: boolean }> {
  logger.debug('Adding submission data:', submission);

  try {
    let profileId;

    // Create entities based on the role parameter in the submission
    switch (submission.role) {
      case 'angel':
        const businessAngel = await prisma.businessAngel.create({
          data: submission.data,
        });
        profileId = businessAngel.id;
        break;
      case 'founder':
        const founder = await prisma.founder.create({
          data: {
            ...submission.data,
            slug: generateSlug(
              `${submission.data.firstName.toLowerCase()}-${submission.data.lastName.toLowerCase()}`
            ),
            name: `${submission.data.firstName} ${submission.data.lastName}`,
          },
        });
        profileId = founder.id;
        break;
      case 'lp':
        const limitedPartner = await prisma.limitedPartner.create({
          data: submission.data,
        });
        profileId = limitedPartner.id;
        break;
      case 'vc':
        const employee = await prisma.employee.create({
          data: submission.data,
        });
        profileId = employee.id;
        break;
      default:
        throw new Error('Invalid role specified in submission');
    }

    // Create userProfile and connect it to the user and created entity based on the role
    await prisma.userProfile.create({
      data: {
        userId: userId,
        ...(submission.role === 'angel' && {
          businessAngelId: profileId,
        }),
        ...(submission.role === 'founder' && { founderId: profileId }),
        ...(submission.role === 'lp' && {
          limitedPartnerId: profileId,
        }),
        ...(submission.role === 'vc' && { employeeId: profileId }),
      },
    });
  } catch (error) {
    console.error('Error saving user profile:', error);
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        onboardingStatus: OnboardingStatus.IN_REVIEW,
        onboardingData: JSON.stringify(submission.data),
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating user onboarding status:', error);
    return { success: false };
  }
}

export {
  userByEmailHandler,
  userByIdHandler,
  usersHandler,
  checkUserOnboardingStatus,
  updateUserByIdHandler,
  removeUserByIdHandler,
  addUserSubmissionDataHandler,
};
