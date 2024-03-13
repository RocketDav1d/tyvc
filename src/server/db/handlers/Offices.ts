import prisma from '@/server/db/prisma';

async function officeForId(officeId: string) {
  return prisma.office.findUnique({
    where: {
      id: officeId,
    },
  });
}

async function importOfficeHandler(body: any) {
  return prisma.office.create({
    data: {
      id: body.SupabaseID,
      name: body.name,
      street: body.street,
      state: body.state,
      zip: body.zip,
      city: body.city,
      country: body.country,
      latitude: body.latitude ? parseFloat(body.latitude) : null,
      longitude: body.longitude ? parseFloat(body.longitude) : null,
      ...(body.fundId && {
        fund: {
          connect: {
            id: body.fundId,
          },
        },
      }),
    },
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
