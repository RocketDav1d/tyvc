import prisma from '@/server/db/prisma';
import { logger } from '@/utils/logger';

async function employeeByIdHandler(employeeId: string) {
  return prisma.employee.findUnique({
    where: {
      id: employeeId,
    },
  });
}

async function importEmployeeHandler(body: any) {
  logger.debug('importEmployeeHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    firstName: body.name ? body.name.split(' ')[0] : '',
    lastName: body.name ? body.name.split(' ').slice(1).join(' ') : '',
    position: body.position,
    email: body.email,
    about: body.about,
    location: body.location,
    phone: body.phoneNumber.toString(),
    startingYear: body.startingYear.toString(),
    linkedIn: body.socials.linkedIn || '',
    twitter: body.socials.twitter || '',
    medium: body.socials.medium || '',
    youTube: body.socials.youTube || '',
    instagram: body.socials.instagram || '',
    newsletter: body.socials.newsletter || '',
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

  return prisma.employee.create({
    data,
  });
}

async function removeEmployeeById(employeeId: string) {
  return prisma.employee.delete({
    where: {
      id: employeeId,
    },
  });
}

export { employeeByIdHandler, importEmployeeHandler, removeEmployeeById };
