import { Status } from '@prisma/client';

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


  if (body.status === Status.draft) {
    const updateResult = await prisma.board.update({
      where: { id: body.SupabaseID },
      data: {
        status: Status.draft,
      },
    });
    logger.debug('unbpublished Investment with ID', body.SupabaseID);
    return updateResult;
  } else

  logger.debug('importInvestmentHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    amount: body.amount,
    announcedAt: body.announcedAt ? new Date(body.announcedAt) : null,
    investmentDate: body.investmentDate ? new Date(body.investmentDate) : null,
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


  try {
    const existingInvestment = await prisma.investment.findUnique({
      where: { id: body.SupabaseID },
    });
    logger.error("existingInvestment", existingInvestment)
    const updateResult = await prisma.investment.upsert({
      where: { id: body.SupabaseID },
      create: data,
      update: data,
    });
    console.log(updateResult);
  } catch (error) {
    console.log('Upsert operation failed', error);
    logger.error('Upsert operation failed', error);
    throw error; // re-throw the error after logging
  }
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
