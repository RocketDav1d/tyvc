import prisma from '@/server/db/prisma';
import { logger } from '@/utils/logger';

async function officeForId(officeId: string) {
  return prisma.office.findUnique({
    where: {
      id: officeId,
    },
  });
}

async function importOfficeHandler(body: any) {
  logger.debug('importOfficeHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    thumbnail: body.logo,
    name: '',
    street: body.street,
    state: body.state,
    zip: body.zip,
    city: body.city,
    country: body.country,
    latitude: body.coordinates.latitude
      ? parseFloat(body.coordinates.latitude)
      : null,
    longitude: body.coordinates.longitude
      ? parseFloat(body.coordinates.longitude)
      : null,
    // ...(body.fundId && {
    //   fund: {
    //     connect: {
    //       id: body.fundId,
    //     },
    //   },
    // }),
  };

  return prisma.office.upsert({
    where: { id: body.SupabaseID },
    update: data,
    create: data,
  });
}

async function removeOfficeById(officeId: string) {
  return prisma.office.delete({
    where: {
      id: officeId,
    },
  });
}

export { officeForId, importOfficeHandler, removeOfficeById };
