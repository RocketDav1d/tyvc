import { Diversity } from '@prisma/client';

import prisma from '@/server/db/prisma';
import { generateSlug } from '@/server/utils';

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
  return prisma.businessAngel.create({
    data: {
      id: body.SupabaseID,
      name: body.name,
      slug: generateSlug(body.name),
      holdingVehicle: {
        create: {
          id: body.HoldingVehicle[0].id,
          name: body.HoldingVehicle[0].Name,
          register: body.HoldingVehicle[0].register,
          registerNumber: body.HoldingVehicle[0].registerNumber,
        },
      },
      email: body.email,
      about: body.about || '',
      profilePicture: body.image,
      coInvestors: body.notableCoInvestors,
      boardPositions: {
        create: body.boardPositions.map((bp: any) => {
          return {
            id: bp.id,
            title: bp.Title,
            years: bp.Years,
            status: bp.Status,
            company: bp.Company,
          };
        }),
      },
      website: body.website || '',
      diversity: mapDiversityToEnum(body.diversity),
      ticketSize: body.ticket_size || '',
      stages: body.stages || [],
      proRataRights: body.pro_rata_rights || false,
      location: body.location || '',
      foundedCompanies: {
        create: body.founded_companies.map((fc: any) => ({
          name: fc.Name,
          id: fc.id,
        })),
      },
      jobs: {
        create: body.jobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          years: job.years,
          status: job.status,
          companyName: job.company,
        })),
      },
      linkedIn: body.socials.linkedIn || '',
      twitter: body.socials.twitter || '',
      medium: body.socials.medium || '',
      youTube: body.socials.youTube || '',
      instagram: body.socials.instagram || '',
      newsletter: body.socials.newsletter || '',
      createdAt: new Date(body.createdAt || Date.now()),
    },
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
