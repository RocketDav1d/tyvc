import prisma from '@/server/db/prisma';
import { generateSlug } from '@/server/utils';
import { logger } from '@/utils/logger';

import { mapDiversityToCompany } from './utils';

function companyByIdHandler(companyId: string) {
  return prisma.portfolioCompany.findUnique({
    where: {
      id: companyId,
    },
  });
}


async function importCompanyHandler(body: any) {
  logger.debug('importCompanyHandler', body);

  return prisma.portfolioCompany.create({
    data: {
      id: body.SupabaseID,
      payloadID: body.SupabaseID,
      name: body.name,
      slug: generateSlug(body.name),
      logo: body.logo,
      about: body.about || '',
      sector: body.sectors,
      investmentStage: body.stages,
      investmentDate: body.investment_date,
      funding: body.funding ? body.funding.toString() : '',
      valuation: body.valuation ? body.valuation.toString() : '',
      diversity: mapDiversityToCompany(body.diversity),
      register: body.register || '',
      registerNumber: body.registerNumber || '',
      registerCourt: body.registerCourt || '',
      ...(body.founders && {
        founders: {
          create: body.founders.map((founder: any) => ({
            id: founder.id,
            name: founder.name,
            email: founder.email,
            linkedIn: founder.linkedin,
            profilePicture: founder.profilePicture,
          })),
        },
      }),
      ...(body.investments && {
        investments: {
          create: body.investments.map((investment: any) => ({
            id: investment.id,
            year: investment.year,
            amount: investment.amount,
            investor: investment.investor,
          })),
        },
      }),
    },
  });
}

async function removeCompanyById(companyId: string) {
  return prisma.portfolioCompany.delete({
    where: {
      id: companyId,
    },
  });
}

export { importCompanyHandler, removeCompanyById, companyByIdHandler };
