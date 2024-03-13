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
    announcedAt: body.announcedAt,
    investmentDate: body.investment_date,
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

  return prisma.investment.create({
    data,
  });
}

async function removeInvestmentById(investmentId: string) {
  return prisma.investment.delete({
    where: {
      id: investmentId,
    },
  });
}

export { importInvestmentHandler, removeInvestmentById, investmentByIdHandler };
