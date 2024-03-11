import { MEDIA_TYPE } from '@prisma/client';

import prisma from '@/server/db/prisma';

function mediaItemForId(mediaId: string) {
  return prisma.media.findUnique({
    where: {
      id: mediaId,
    },
  });
}

async function importMediaHandler(body: any) {
  return prisma.media.create({
    data: {
      id: body.SupabaseID,
      title: body.title,
      type: body.type || MEDIA_TYPE.ARTICLE,
      description: body.description,
      url: body.url,
      thumbnail: body.thumbnail,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
      fund: {
        connect: {
          id: body.fundId,
        },
      },
      publisher: {
        connectOrCreate: {
          where: {
            id: body.publisherId,
          },
          create: {
            name: body.publisherName,
            url: body.publisherUrl,
            logo: body.publisherLogo,
            foundingDate: body.publisherFoundingDate
              ? new Date(body.publisherFoundingDate)
              : null,
            description: body.publisherDescription,
          },
        },
      },
    },
  });
}

async function removeMediaItem(mediaId: string) {
  return prisma.media.delete({
    where: {
      id: mediaId,
    },
  });
}

export { mediaItemForId, importMediaHandler, removeMediaItem };
