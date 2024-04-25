import { v4 as uuidv4 } from 'uuid';

import prisma from '@/server/db/prisma';
import { generateSlug } from '@/server/utils';
import { translate } from '@/server/utils';
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

  // Prepare the relationships
  let deckConnections =
    body.deck && body.deck.length > 0
      ? body.deck.map((id: string) => ({ id }))
      : [];
  let mediaConnections =
    body.media && body.media.length > 0
      ? body.media.map((mediaId: string) => ({
          where: { id: mediaId },
          create: { id: mediaId, title: 'Default Title' },
        }))
      : [];
  let officeConnections =
    body.offices && body.offices.length > 0
      ? body.offices.map((officeId: string) => ({ id: officeId }))
      : [];
  let investmentsConnections =
    body.investments && body.investments.length > 0
      ? body.investments.map((id: string) => ({ id }))
      : [];
  let notableCoInvestorConnections = [];
  if (body.notableCoInvestors && body.notableCoInvestors.length > 0) {
    const connections = await Promise.all(
      body.notableCoInvestors.map(
        async ({
          relationTo,
          value,
        }: {
          relationTo: string;
          value: string;
        }) => {
          let id = null;
          if (relationTo === 'BA') {
            const businessAngel = await prisma.businessAngel.findUnique({
              where: { id: value },
            });
            id = businessAngel ? businessAngel.id : null;
          } else if (relationTo === 'funds') {
            const fund = await prisma.fund.findUnique({ where: { id: value } });
            id = fund ? fund.id : null;
          }
          return id ? { id } : null;
        }
      )
    );
    notableCoInvestorConnections = connections.filter(
      (conn: { id: string } | null) => conn !== null
    );
  }
  let referenceCallVideoConnections =
    body.referenceCallVideos && body.referenceCallVideos.length > 0
      ? body.referenceCallVideos.map((id: string) => ({ id }))
      : [];
  let employeeConnections =
    body.investmentTeamMembers && body.investmentTeamMembers.length > 0
      ? body.investmentTeamMembers.map((employeeId: string) => ({
          id: employeeId,
        }))
      : [];
  let generationConnections =
    body.fundGenerations && body.fundGenerations.length > 0
      ? body.fundGenerations.map((generation: any) => ({
          id: generation.id || uuidv4(),
          name: generation.name,
          year: generation.year.toString(),
          size: generation.volume.toString(),
        }))
      : [];

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    name: body.name,
    slug: generateSlug(body.name),
    PEorVC: body.PEorVC,
    username: body.username,
    logo: body.logo,
    image: body.image,
    about: body.about || '',
    about_english: await translate(body.about),
    email: body.email,
    website: body.socials.website,
    medium: body.socials.medium,
    twitter: body.socials.twitter,
    youTube: body.socials.youTube,
    linkedIn: body.socials.linkedIn,
    instagram: body.socials.instagram,
    newsletter: body.socials.newsletter,
    color: body.color,
    sector: body.investmentCriteria.sector,
    stages: body.investmentCriteria.stages,
    ticketSize: body.investmentCriteria.ticketSize,
    phoneNumber: body.phoneNumber.toString(),
    contactPerson: body.contactPerson,
    info: body.info,
    coInvestors: notableCoInvestorConnections,
    // ...(notableCoInvestorConnections.length > 0 && { notableCoInvestors: { connect: notableCoInvestorConnections } }),

    ...(deckConnections.length > 0 && {
      media_items: { connect: deckConnections },
    }),
    ...(mediaConnections.length > 0 && {
      media_items: { connectOrCreate: mediaConnections },
    }),
    ...(referenceCallVideoConnections.length > 0 && {
      media_items: { connect: referenceCallVideoConnections },
    }),
    ...(officeConnections.length > 0 && {
      offices: { connect: officeConnections },
    }),
    ...(investmentsConnections.length > 0 && {
      investments: { connect: investmentsConnections },
    }),
    ...(employeeConnections.length > 0 && {
      employees: { connect: employeeConnections },
    }),
    ...(generationConnections.length > 0 && {
      generations: { create: generationConnections },
    }),

    //   media_items: {
    //     connectOrCreate: body.media ? body.media.map((mediaId: string) => ({
    //       where: { id: mediaId },
    //       create: { id: mediaId, title: 'Default Title' },
    //     })) : [],
    //   },
    //   offices: {
    //     connect: body.offices ? body.offices.map((officeId: string) => ({
    //       id: officeId,
    //     })) : [],
    //   },
    //   coInvestors: body.notableCoInvestors ? body.notableCoInvestors.map(
    //     (coInvestor: any) => coInvestor.value
    //   ) : [],
    //   generations: {
    //     create: body.fundGenerations ? body.fundGenerations.map((generation: any) => ({
    //       id: generation.id || uuidv4(),
    //       name: generation.name,
    //       year: generation.year.toString(),
    //       size: generation.volume.toString(),
    //     })) : [],
    //   },
    //   employees: {
    //     connect: body.investmentTeamMembers ? body.investmentTeamMembers.map((employeeId: string) => ({
    //       id: employeeId,
    //     })) : [],
    //   },
    // };
  };

  return prisma.fund.upsert({
    where: { id: body.SupabaseID },
    update: data,
    create: data,
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
