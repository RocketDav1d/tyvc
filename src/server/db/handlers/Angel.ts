import { Diversity } from '@prisma/client';

import prisma from '@/server/db/prisma';
import { translate } from '@/server/translate';
import { logger } from '@/utils/logger';

function angelByIdHandler(angelId: string) {
  return prisma.businessAngel.findUnique({
    where: {
      id: angelId,
    },
  });
}

function mapDiversityToEnum(diversity: string): Diversity {
  switch (diversity.toLowerCase()) {
    case 'black_female':
      return Diversity.BLACK_FEMALE;
    case 'white_female':
      return Diversity.WHITE_FEMALE;
    case 'whit_male':
      return Diversity.WHITE_MALE;
    case 'black_male':
      return Diversity.BLACK_MALE;
    default:
      return Diversity.WHITE_MALE;
  }
}

async function importAngelHandler(body: any) {
  let validBoardPositionConnections = [];
  let validMediaConnections = [];
  let validInvestmentConnections = [];

  // Board Positions - Connect
  if (body.boardPositions && body.boardPositions.length > 0) {
    const boardPositionIds = await Promise.all(
      body.boardPositions.map(async (payloadID: string) => {
        const board = await prisma.board.findUnique({
          where: { payloadID: payloadID },
        });
        return board ? { id: board.id } : null;
      })
    );
    validBoardPositionConnections = boardPositionIds.filter(
      (id) => id !== null
    );
  }

  // Media - Connect
  if (body.Media && body.Media.length > 0) {
    const mediaIds = await Promise.all(
      body.Media.map(async (payloadID: string) => {
        const media = await prisma.media.findUnique({
          where: { payloadID: payloadID },
        });
        return media ? { id: media.id } : null;
      })
    );
    validMediaConnections = mediaIds.filter((id) => id !== null);
  }

  // Investments - Connect
  if (body.Investments && body.Investments.length > 0) {
    const investmentIds = await Promise.all(
      body.Investments.map(async (payloadID: string) => {
        const investment = await prisma.investment.findUnique({
          where: { payloadID: payloadID },
        });
        return investment ? { id: investment.id } : null;
      })
    );
    validInvestmentConnections = investmentIds.filter((id) => id !== null);
  }

  // notableCoInvestors
  let coInvestorConnections = [];

  if (body.notableCoInvestors && body.notableCoInvestors.length > 0) {
    coInvestorConnections = await Promise.all(
      body.notableCoInvestors.map(
        async ({
          relationTo,
          value,
        }: {
          relationTo: string;
          value: string;
        }) => {
          let id = null; // Initialize ID to null
          if (relationTo === 'BA') {
            const businessAngel = await prisma.businessAngel.findUnique({
              where: { payloadID: value },
            });
            id = businessAngel ? businessAngel.id : null;
          } else if (relationTo === 'funds') {
            const fund = await prisma.fund.findUnique({
              where: { payloadID: value },
            });
            id = fund ? fund.id : null;
          }
          // Return the structure directly if an ID was found
          return id ? { relationTo, value: id } : null;
        }
      )
    );

    // Filter out any null values
    coInvestorConnections = coInvestorConnections.filter(
      (conn) => conn !== null
    );
  }

  logger.debug("Holding Vehicle", body.HoldingVehicle)


  // Holding Vehicle - Create
  let holdingVehicleData;
  if (body.HoldingVehicle && body.HoldingVehicle.length > 0) {
    holdingVehicleData = await prisma.holdingVehicle.upsert({
      where: { id: body.HoldingVehicle[0].id },
      update: {
        name: body.HoldingVehicle[0].Name,
        register: body.HoldingVehicle[0].register,
        registerNumber: body.HoldingVehicle[0].registerNumber,
        registerCourt: body.HoldingVehicle[0].registerCourt,
      },
      create: {
        id: body.HoldingVehicle[0].id,
        name: body.HoldingVehicle[0].Name,
        register: body.HoldingVehicle[0].register,
        registerNumber: body.HoldingVehicle[0].registerNumber,
        registerCourt: body.HoldingVehicle[0].registerCourt,
      },
    });
  }


  // FoundendCompanies - Create
  let foundedCompaniesData = [];
  if (body.founded_companies && body.founded_companies.length > 0) {
    foundedCompaniesData = await Promise.all(
      body.founded_companies.map((fc: any) =>
        prisma.foundedCompanies.upsert({
          where: { id: fc.id },
          update: {
            name: fc.company,
            status: fc.status,
            logo: fc.founded_company_logo,
          },
          create: {
            id: fc.id,
            name: fc.company,
            status: fc.status,
            logo: fc.founded_company_logo,
          },
        })
      )
    );
  }

  // Jobs - Create or Update
  let jobsData = [];
  if (body.jobs && body.jobs.length > 0) {
    jobsData = await Promise.all(
      body.jobs.map((job: any) =>
        prisma.jobs.upsert({
          where: { id: job.id },
          update: {
            title: job.title,
            startingYear: job.startingYear,
            endingYear: job.endingYear || "",
            status: job.status,
            companyName: job.company,
          },
          create: {
            id: job.id,
            title: job.title,
            startingYear: job.startingYear,
            endingYear: job.endingYear || "",
            status: job.status,
            companyName: job.company,
          },
        })
      )
    );
  }


  const data = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    name: body.name,
    slug: body.username,
    email: body.email,
    phoneNumber: body.phoneNumber,
    about: body.about || '',
    about_english: body.about ? await translate(body.about) : '',
    profilePicture: body.image,
    coInvestors: coInvestorConnections,
    ...(validBoardPositionConnections.length > 0 && {
      boardPositions: {
        connect: validBoardPositionConnections,
      },
    }),
    ...(validMediaConnections.length > 0 && {
      media_items: {
        connect: validMediaConnections,
      },
    }),
    ...(validInvestmentConnections.length > 0 && {
      investments: {
        connect: validInvestmentConnections,
      },
    }),
    website: body.website || '',
    diversity: mapDiversityToEnum(body.diversity),
    ticketSize: body.ticket_size || '',
    stages: body.stages || [],
    proRataRights: body.pro_rata_rights || false,
    location: body.location || '',
    location_english: body.location ? await translate(body.location): '',
    holdingVehicle: holdingVehicleData
    ? {
        connect: { id: holdingVehicleData.id },
      }
    : undefined,
    ...(foundedCompaniesData.length > 0 && {
      foundedCompanies: {
        connect: foundedCompaniesData.map((fc: any) => ({ id: fc.id })),
      },
    }),
    ...(jobsData.length > 0 && {
      jobs: {
        connect: jobsData.map((job: any) => ({ id: job.id })),
      },
    }),
    // ...(holdingVehicleData && { holdingVehicle: holdingVehicleData }),
    // ...(foundedCompaniesData && { foundedCompanies: foundedCompaniesData }),
    // ...(jobsData && { jobs: jobsData }),
    linkedIn: body.socials.linkedIn || '',
    twitter: body.socials.twitter || '',
    medium: body.socials.medium || '',
    youTube: body.socials.youTube || '',
    instagram: body.socials.instagram || '',
    newsletter: body.socials.newsletter || '',
    createdAt: new Date(body.createdAt || Date.now()),
  };

  return prisma.businessAngel.upsert({
    where: { id: body.SupabaseID },
    update: data,
    create: data,
  });
}

async function removeAngelById(angelId: string) {
  return prisma.businessAngel.delete({
    where: {
      id: angelId,
    },
  });
}

export { angelByIdHandler, importAngelHandler, removeAngelById };
