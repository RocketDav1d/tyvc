import { Diversity } from '@prisma/client';
import { Status } from '@prisma/client';

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

  if (body.status === Status.draft) {
    const updateResult = await prisma.board.update({
      where: { id: body.SupabaseID },
      data: {
        status: Status.draft,
      },
    });
    logger.debug('unbpublished Employee with ID', body.SupabaseID);
    return updateResult;
  } else

  logger.debug('importEmployeeHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    firstName: body.firstName,
    lastName: body.lastName,
    position: body.position,
    email: body.email,
    about: body.about,
    about_english: body.about ? await translate(body.about) : '',
    location: body.location,
    location_english: body.location ? await translate(body.location): '',
    phone: body.phoneNumber ? body.phoneNumber.toString() : '',
    startingYear: body.startingYear ? body.startingYear.toString() : '',
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

  if (body.office) {
    data.office = {
      connect: {
        id: body.office,
      },
    };
  }


  try {
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: body.SupabaseID },
    });
    console.log("existing existingEmployee", existingEmployee); // Check if the record is found
    const updateResult = await prisma.employee.upsert({
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

async function removeEmployeeById(employeeId: string) {
  logger.debug('Insider removeEmployeeById', employeeId);
  return prisma.employee.delete({
    where: {
      id: employeeId,
    },
  });
}

export { employeeByIdHandler, importEmployeeHandler, removeEmployeeById };
