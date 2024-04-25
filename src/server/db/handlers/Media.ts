import { MEDIA_TYPE } from '@prisma/client';

import prisma from '@/server/db/prisma';
import { logger } from '@/utils/logger';

function mediaItemForId(mediaId: string) {
  return prisma.media.findUnique({
    where: {
      id: mediaId,
    },
  });
}

function mapType(type: string): MEDIA_TYPE {
  switch (type) {
    case 'article':
      return MEDIA_TYPE.ARTICLE;
    case 'video':
      return MEDIA_TYPE.VIDEO;
    case 'podcast':
      return MEDIA_TYPE.PODCAST;
    default:
      return MEDIA_TYPE.ARTICLE; // Default to ARTICLE if type is unrecognized
  }
}

async function importMediaHandler(body: any) {
  logger.debug('importOfficeHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    title: body.title,
    type: mapType(body.mediaType),
    description: body.description,
    url: body.url,
    thumbnail: body.thumbnail,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
    // ...(body.fundId && {
    //   fund: {
    //     connect: {
    //       id: body.fundId,
    //     },
    //   },
    // }),
    // ...(body.publisherId && {
    //   publisher: {
    //     connectOrCreate: {
    //       where: {
    //         id: body.publisherId,
    //       },
    //       create: {
    //         name: body.publisherName,
    //         url: body.publisherUrl,
    //         logo: body.publisherLogo,
    //         foundingDate: body.publisherFoundingDate
    //           ? new Date(body.publisherFoundingDate)
    //           : null,
    //         description: body.publisherDescription,
    //       },
    //     },
    //   },
    // }),
  };

  return prisma.media.upsert({
    where: { id: body.SupabaseID },
    update: data,
    create: data,
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
