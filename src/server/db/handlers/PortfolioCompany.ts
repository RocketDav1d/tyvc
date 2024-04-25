import { Status } from '@prisma/client';

import prisma from '@/server/db/prisma';
import { translate } from '@/server/translate';
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

  if (body.status === Status.draft) {
    const updateResult = await prisma.board.update({
      where: { id: body.SupabaseID },
      data: {
        status: Status.draft,
      },
    });
    logger.debug('unbpublished Company with ID', body.SupabaseID);
    return updateResult;
  } else

  logger.debug('importCompanyHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    name: body.name,
    slug: generateSlug(body.name),
    logo: body.logo,
    about: body.about,
    about_english: body.about ? await translate(body.about) : '',
    sector: body.sectors,
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
  };

  try {
    const existingPortfolioCompany = await prisma.portfolioCompany.findUnique({
      where: { id: body.SupabaseID },
    });
    console.log("existingPortfolioCompany", existingPortfolioCompany); // Check if the record is found
    const updateResult = await prisma.portfolioCompany.upsert({
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


async function removeCompanyById(companyId: string) {
  logger.debug('Remove PortfolioCompany with ID', companyId);
  return prisma.portfolioCompany.delete({
    where: {
      id: companyId,
    },
  });
}

export { importCompanyHandler, removeCompanyById, companyByIdHandler };
