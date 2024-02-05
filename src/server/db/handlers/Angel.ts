import prisma from '@/server/db/prisma';

function angelByIdHandler(angelId: string) {
  return prisma.businessAngel.findUnique({
    where: {
      id: angelId,
    },
  });
}

export { angelByIdHandler };
