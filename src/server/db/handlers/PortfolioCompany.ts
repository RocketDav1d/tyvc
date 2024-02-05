import prisma from '@/server/db/prisma';

function companyByIdHandler(companyId: string) {
  return prisma.portfolioCompany.findUnique({
    where: {
      id: companyId,
    },
  });
}

export { companyByIdHandler };
