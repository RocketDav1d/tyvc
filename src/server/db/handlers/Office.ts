import { Status } from '@prisma/client';

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


  if (body.status === Status.draft) {
    const updateResult = await prisma.board.update({
      where: { id: body.SupabaseID },
      data: {
        status: Status.draft,
      },
    });
    logger.debug('unbpublished Office with ID', body.SupabaseID);
    return updateResult;
  } else

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



  try {
    const existingOffice = await prisma.office.findUnique({
      where: { id: body.SupabaseID },
    });
    console.log("existingOffice", existingOffice); // Check if the record is found
    const updateResult = await prisma.office.upsert({
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

async function removeOfficeById(officeId: string) {
  return prisma.office.delete({
    where: {
      id: officeId,
    },
  });
}

export { officeForId, importOfficeHandler, removeOfficeById };
