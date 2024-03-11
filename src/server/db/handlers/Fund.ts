import prisma from '@/server/db/prisma';
import { generateSlug } from '@/server/utils';

function fundByIdHandler(fundId: string) {
  return prisma.fund.findUnique({
    where: {
      id: fundId,
    },
  });
}

async function importFundHandler(body: any) {
  return prisma.fund.create({
    data: {
      id: body.SupabaseID,
      name: body.name,
      slug: generateSlug(body.name),
      description: body.about || '',
      email: body.email,
      media_items: {
        connect: body.media.map((mediaId: string) => ({
          id: mediaId,
        })),
      },
      offices: {
        connect: body.offices.map((officeId: string) => ({
          id: officeId,
        })),
      },
      phoneNumber: body.phoneNumber,
      coInvestors: body.notableCoInvestors.map(
        (coInvestor: any) => coInvestor.value
      ),
      generations: {
        create: body.fundGenerations.map((generation: any) => ({
          id: generation.id,
          name: generation.name,
          year: generation.year,
          amount: generation.volume,
        })),
      },
      employees: {
        connect: body.investmentTeamMembers.map((employeeId: string) => ({
          id: employeeId,
        })),
      },
    },
  });
}

async function removeFundById(fundId: string) {
  return prisma.fund.delete({
    where: {
      id: fundId,
    },
  });
}

export { fundByIdHandler, importFundHandler, removeFundById };
