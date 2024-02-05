import { OnboardingStatus, User } from '@prisma/client';

import prisma from '@/server/db/prisma';

function userByEmailHandler(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

function userByIdHandler(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

function checkUserOnboardingStatus(email: string) {
  return prisma.user.findUnique({ where: { email } }).then((user) => {
    return user?.onboardingStatus === OnboardingStatus.APPROVED;
  });
}

function usersHandler() {
  return prisma.user.findMany({
    orderBy: { firstName: 'asc' },
  });
}

async function createUserHandler(userDetails: Partial<User>): Promise<User> {
  const user = await prisma.user.create({
    data: userDetails,
  });

  return user;
}

async function updateUserByIdHandler(
  userId: string,
  userDetails: Partial<User>
): Promise<any> {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: userDetails,
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

export {
  userByEmailHandler,
  userByIdHandler,
  usersHandler,
  checkUserOnboardingStatus,
  updateUserByIdHandler,
  removeUserByIdHandler,
};
