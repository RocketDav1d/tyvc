
import { CompanyDiversity } from '@prisma/client';

import prisma from '@/server/db/prisma';
import { generateSlug } from '@/server/utils';

function companyByIdHandler(companyId: string) {
  return prisma.portfolioCompany.findUnique({
    where: {
      id: companyId,
    },
  });
}

function mapDiversityToCompany(diversity: string): CompanyDiversity {
  switch (diversity) {
    case 'WHITE_MALE':
      return CompanyDiversity.ONLY_WHITE_MALE_FOUNDERS;
    case 'WHITE_FEMALE':
      return CompanyDiversity.ONLY_WHITE_FEMALE_FOUNDERS;
    case 'BLACK_MALE':
      return CompanyDiversity.ONLY_POC_MALE_FOUNDERS;
    case 'BLACK_FEMALE':
      return CompanyDiversity.ONLY_POC_FEMALE_FOUNDERS;
    case 'MIN_1_W':
      return CompanyDiversity.MIN_1_W;
    case 'MIN_1_POC':
      return CompanyDiversity.MIN_1_POC;
    case 'MIN_1_W_POC':
      return CompanyDiversity.MIN_1_W_POC;
    default:
      return CompanyDiversity.ONLY_WHITE_MALE_FOUNDERS; // Default or fallback diversity
  }
}

async function importCompanyHandler(body: any) {
  return prisma.portfolioCompany.create({
    data: {
      id: body.SupabaseID,
      name: body.name,
      slug: generateSlug(body.name),
      logo: body.logo,
      about: body.about || '',
      sector: body.sector,
      investmentStage: body.investmentStage,
      invesetmentDate: body.invesetmentDate,
      funding: body.funding,
      valuation: body.valuation,
      diversity: mapDiversityToCompany(body.diversity),
      founders: {
        create: body.founders.map((founder: any) => ({
          id: founder.id,
          name: founder.name,
          email: founder.email,
          linkedIn: founder.linkedin,
          profilePicture: founder.profilePicture,
        })),
      },
      investments: {
        create: body.investments.map((investment: any) => ({
          id: investment.id,
          year: investment.year,
          amount: investment.amount,
          investor: investment.investor,
        })),
      },
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
