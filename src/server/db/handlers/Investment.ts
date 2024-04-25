import prisma from '@/server/db/prisma';
import { logger } from '@/utils/logger';

function investmentByIdHandler(investmentId: string) {
  return prisma.investment.findUnique({
    where: {
      id: investmentId,
    },
  });
}

async function importInvestmentHandler(body: any) {
  logger.debug('importInvestmentHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    amount: body.amount,
    announcedAt: new Date(body.anouncedAt),
    investmentDate: new Date(body.investmentDate),
    investmentStage: body.investmentStage,
    //   fundId: body.fundId,
    //   businessAngelId: body.businessAngelId,
    portfolioCompany: {
      connect: { id: body.PortfolioCompany },
    },
  };

  if (body.employees) {
    data.employees = {
      connect: body.employees.map((employeeId: string) => ({
        id: employeeId,
      })),
    };
  }

  return prisma.investment.upsert({
    where: { id: body.SupabaseID },
    update: data,
    create: data,
  });
}

async function removeInvestmentById(investmentId: string) {
  logger.debug('InsideremoveInvestmentById', investmentId);
  return prisma.investment.delete({
    where: {
      id: investmentId,
    },
  });
}

export { importInvestmentHandler, removeInvestmentById, investmentByIdHandler };
