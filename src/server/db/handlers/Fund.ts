import { v4 as uuidv4 } from 'uuid';

import prisma from '@/server/db/prisma';
import { generateSlug } from '@/server/utils';
import { logger } from '@/utils/logger';

function fundByIdHandler(fundId: string) {
  return prisma.fund.findUnique({
    where: {
      id: fundId,
    },
  });
}

async function importFundHandler(body: any) {
  logger.debug('importFundHandler', body);

  return prisma.fund.create({
    data: {
      id: body.SupabaseID,
      payloadID: body.SupabaseID,
      name: body.name,
      slug: generateSlug(body.name),
      description: body.about || '',
      email: body.email,
      medium: body.medium,
      twitter: body.twitter,
      youTube: body.youTube,
      linkedIn: body.linkedIn,
      instagram: body.instagram,
      newsletter: body.newsletter,
      color: body.color,
      sector: body.sector,
      stages: body.stages,
      ticketSize: body.ticketSize,
      media_items: {
        connectOrCreate: body.media
          ? body.media.map((mediaId: string) => ({
              where: { id: mediaId },
              create: { id: mediaId, title: 'Default Title' },
            }))
          : [],
      },
      offices: {
        connect: body.offices
          ? body.offices.map((officeId: string) => ({
              id: officeId,
            }))
          : [],
      },
      phoneNumber: body.phoneNumber.toString(),
      coInvestors: body.notableCoInvestors
        ? body.notableCoInvestors.map((coInvestor: any) => coInvestor.value)
        : [],
      generations: {
        create: body.fundGenerations
          ? body.fundGenerations.map((generation: any) => ({
              id: generation.id || uuidv4(),
              name: generation.name,
              year: generation.year.toString(),
              size: generation.volume.toString(),
            }))
          : [],
      },
      employees: {
        connect: body.investmentTeamMembers
          ? body.investmentTeamMembers.map((employeeId: string) => ({
              id: employeeId,
            }))
          : [],
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
