import prisma from '@/server/db/prisma';

function fundByIdHandler(fundId: string) {
  return prisma.fund.findUnique({
    where: {
      id: fundId,
    },
  });
}

export { fundByIdHandler };
