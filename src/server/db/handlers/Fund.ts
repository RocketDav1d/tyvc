import { Status } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import prisma from '@/server/db/prisma';
import { translate } from '@/server/translate';
import { logger } from '@/utils/logger';


function fundsHandler() {
  return prisma.fund.findMany();
}

function fundByIdHandler(fundId: string) {
  return prisma.fund.findUnique({
    where: {
      slug: fundId,
    },
  });
}

async function importFundHandler(body: any) {

  if (body.status === Status.draft) {
    const updateResult = await prisma.fund.update({
      where: { id: body.SupabaseID },
      data: {
        status: Status.draft,
      },
    });

    await prisma.fundGeneration.updateMany({
      where: { fundId: body.SupabaseID },
      data: {
        status: Status.draft,
      },
    });

    logger.debug('unbpublished Fund with ID', body.SupabaseID);
    return updateResult;
  } else

  console.log("Body", body)
  logger.debug('importFundHandler', body);

    // Prepare the relationships

    // media relationships
    let referenceCallVideoConnections = [];
    if (body.referenceCallVideos && body.referenceCallVideos.length > 0) {
      const videoIds = await Promise.all(
        body.referenceCallVideos.map(async (id: string) => {
          console.log(`Checking media with ID: ${id}`);
          const video = await prisma.media.findUnique({
            where: { id },
          });
          if (!video) {
            console.log(`Video with id ${id} not found.`);
            return null;
          }
          console.log(`Record media with the ID ${id} found`);
          return { id: video.id };
        })
      );
      referenceCallVideoConnections = videoIds.filter((id) => id !== null);
    }
    let deckConnections = [];
    if (body.deck && body.deck.length > 0) {
      const deckIds = await Promise.all(
        body.deck.map(async (id: string) => {
          console.log(`Checking media with ID: ${id}`);
          const deck = await prisma.media.findUnique({
            where: { id },
          });
          if (!deck) {
            console.log(`Deck with id ${id} not found.`);
            return null;
          }
          console.log(`Record media with the ID ${id} found`);
          return { id: deck.id };
        })
      );
      deckConnections = deckIds.filter((id) => id !== null);
    }
    let mediaConnections = [];
    if (body.media && body.media.length > 0) {
      const mediaIds = await Promise.all(
        body.media.map(async (mediaId: string) => {
          console.log(`Checking media with ID: ${mediaId}`);
          const media = await prisma.media.findUnique({
            where: { id: mediaId },
          });
          if (!media) {
            console.log(`Media with id ${mediaId} not found.`);
            return null;
          }
          console.log(`Record media with the ID ${mediaId} found`);
          return { id: media.id };
        })
      );
      mediaConnections = mediaIds.filter((id) => id !== null);
    }

    // office relationships
    let officeConnections = [];
    if (body.offices && body.offices.length > 0) {
      const officeIds = await Promise.all(
        body.offices.map(async (officeId: string) => {
          console.log(`Checking office with ID: ${officeId}`);
          const office = await prisma.office.findUnique({
            where: { id: officeId },
          });
          if (!office) {
            console.log(`Office with id ${officeId} not found.`);
            return null;
          }
          console.log(`Record office with the ID ${officeId} found`);
          return { id: office.id };
        })
      );
      officeConnections = officeIds.filter((id) => id !== null);
    }

  // investments relationships
  let investmentsConnections = [];
  if (body.investments && body.investments.length > 0) {
    const investmentIds = await Promise.all(
      body.investments.map(async (investmentId: string) => {
        console.log(`Checking investment with ID: ${investmentId}`);
        const investment = await prisma.investment.findUnique({
          where: { id: investmentId },
        });
        if (!investment) {
          console.log(`Investment with id ${investmentId} not found.`);
          return null;
        }
        console.log(`Record investment with the ID ${investmentId} found`);
        return { id: investment.id };
      })
    );
    investmentsConnections = investmentIds.filter(
      (id) => id !== null
    );
  }

  // employee relationships
  let employeeConnections = [];
  if (body.employee && body.employee.length > 0) {
  const employeeIds = await Promise.all(
    body.employee.map(async (employeeId: string) => {
      logger.debug(`Checking employee with ID: ${employeeId}`)
      console.log(`Checking employee with ID: ${employeeId}`);
      const employee = await prisma.employee.findUnique({
        where: { id: employeeId },
      });
      if (!employee) {
        console.log(`Employee with id ${employeeId} not found.`);
        return null;
      }
      console.log(`Record employee with the ID ${employeeId} found`);
      return { id: employee.id };
    })
  );
  employeeConnections = employeeIds.filter((id) => id !== null);
  }
  if (employeeConnections.length > 0) {
    logger.debug('Attempting to connect employee connections:', employeeConnections);
    console.log('Attempting to connect employee connections:', employeeConnections);
  } else {
    logger.debug('No employee connections to make.');
    console.log('No employee connections to make.');
  }

  // notable coInvestors array
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

  // prepate to create Fund Generations

  let generationData = [];
  if (body.fundGenerations && body.fundGenerations.length > 0) {
    generationData = body.fundGenerations.map((generation: any) => ({
      id: generation.id || uuidv4(),
      status: Status.published,
      name: generation.name,
      year: generation.year ? generation.year.toString() : null,
      size: generation.size ? generation.size.toString() : null,
    }));
  }

  await Promise.all(
    generationData.map((generation: any) =>
      prisma.fundGeneration.upsert({
        where: { id: generation.id },
        update: generation,
        create: generation,
      })
    )
  );

  const data: any = {
    id: body.SupabaseID,
    status: body.status,
    payloadID: body.SupabaseID,
    name: body.name,
    slug: body.username,
    PEorVC: body.PEorVC,
    username: body.username,
    logo: body.logo,
    image: body.image,
    description: body.about || '',
    about: body.about,
    about_english: body.about ? await translate(body.about) : '',
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
    phoneNumber: body.phoneNumber ? body.phoneNumber.toString() : null,
    contactPerson: body.contactPerson,
    info: body.info,
    coInvestors: notableCoInvestorConnections,
    // ...(notableCoInvestorConnections.length > 0 && { notableCoInvestors: { connect: notableCoInvestorConnections } }),

    ...(deckConnections.length > 0 && {
      media_items: { connect: deckConnections },
    }),
    ...(mediaConnections.length > 0 && {
      media_items: { connect: mediaConnections },
    }),
    ...(referenceCallVideoConnections.length > 0 && {
      media_items: { connect: referenceCallVideoConnections },
    }),
    ...(officeConnections.length > 0 && {
      offices: { connect: officeConnections },
    }),
    ...(investmentsConnections.length > 0 && {
      investments: {  connect: investmentsConnections },
    }),
    ...(employeeConnections.length > 0 && {
      employees: { connect: employeeConnections },
    }),
    generations: {
      connect: generationData.map((generation: { id: string }) => ({
        id: generation.id,
      })),
    },
    ...(generationData.length > 0 && {
      generations: { connect: generationData },
    }),
  };


  try {
    const existingFund = await prisma.fund.findUnique({
      where: { id: body.SupabaseID },
    });
    console.log("existingFund", existingFund); // Check if the record is found
    const updateResult = await prisma.fund.upsert({
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




async function removeFundById(fundId: string) {
  return prisma.fund.delete({
    where: {
      id: fundId,
    },
  });
}

async function fundIdsHandler() {
  const funds = await prisma.fund.findMany({
    select: {
      id: true,
    },
  });
  return funds.map((fund) => fund.id);
}

export { fundByIdHandler, importFundHandler, removeFundById, fundIdsHandler, fundsHandler };
