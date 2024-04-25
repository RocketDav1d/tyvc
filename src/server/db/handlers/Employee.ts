import { Diversity } from '@prisma/client';

import prisma from '@/server/db/prisma';
import { translate } from '@/server/translate';
import { logger } from '@/utils/logger';

async function employeeByIdHandler(employeeId: string) {
  return prisma.employee.findUnique({
    where: {
      id: employeeId,
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

async function importEmployeeHandler(body: any) {
  logger.debug('importEmployeeHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    firstName: body.firstName,
    lastName: body.lastName,
    position: body.position,
    email: body.email,
    about: body.about,
    about_english: await translate(body.about),
    location: body.location,
    location_english: await translate(body.location),
    phone: body.phoneNumber.toString(),
    startingYear: body.startingYear.toString(),
    linkedIn: body.socials.linkedIn || '',
    twitter: body.socials.twitter || '',
    medium: body.socials.medium || '',
    youTube: body.socials.youTube || '',
    instagram: body.socials.instagram || '',
    newsletter: body.socials.newsletter || '',
    profilePicture: body.logo,
    sector: body.sectors,
    skill: body.skills,
    university: body.university,
    languages: body.languages,
    diversity: mapDiversityToEnum(body.diversity),
  };

  if (body.investments) {
    data.investments = {
      connect: body.investments.map((investmentId: string) => ({
        id: investmentId,
      })),
    };
  }

  if (body.boardPositions && body.boardPositions.length > 0) {
    data.boards = {
      connect: body.boardPositions.map((boardPositionId: string) => ({
        id: boardPositionId,
      })),
    };
  }

  if (body.office && body.office.length > 0) {
    data.office = {
      connect: body.office.map((officeId: string) => ({
        id: officeId,
      })),
    };
  }

  return prisma.employee.upsert({
    where: { id: body.SupabaseID },
    update: data,
    create: data,
  });
}

async function removeEmployeeById(employeeId: string) {
  logger.debug('Insider removeEmployeeById', employeeId);
  return prisma.employee.delete({
    where: {
      id: employeeId,
    },
  });
}

export { employeeByIdHandler, importEmployeeHandler, removeEmployeeById };
