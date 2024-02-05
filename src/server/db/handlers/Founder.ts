import prisma from '@/server/db/prisma';

function founderByIdHandler(founderId: string) {
  return prisma.founder.findUnique({
    where: {
      id: founderId,
    },
  });
}

export { founderByIdHandler };
