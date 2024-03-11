import prisma from '@/server/db/prisma';
import { generateSlug } from '@/server/utils';

function angelByIdHandler(angelId: string) {
  return prisma.businessAngel.findUnique({
    where: {
      id: angelId,
    },
  });
}

async function importAngelHandler(body: any) {
  return prisma.businessAngel.create({
    data: {
      id: body.SupabaseID,
      name: body.name,
      slug: generateSlug(body.name),
      holdingVehicle: {
        create: body.HoldingVehicle.map((hv: any) => ({
          id: hv.id,
          name: hv.Name,
          register: hv.register,
          registerNumber: hv.registerNumber,
        })),
      },
      email: body.email,
      about: body.about || '',
      profilePicture: body.image,
      coInvestors: body.notableCoInvestors,
      boardPositions: {
        create: body.boardPositions.map((bp: any) => ({
          id: bp.id,
          title: bp.Title,
          years: bp.Years,
          status: bp.Status,
          company: bp.Company,
        })),
      },
      website: body.website || '',
      diversity: body.diversity,
      ticketSize: body.ticket_size || '',
      stages: body.stages || [],
      proRataRights: body.pro_rata_rights || false,
      location: body.location || '',
      foundedCompanies: {
        create: body.founded_companies.map((fc: any) => ({
          id: fc.id,
          status: fc.status,
          company: fc.company,
        })),
      },
      jobs: {
        create: body.jobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          years: job.years,
          status: job.status,
          company: job.company,
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
