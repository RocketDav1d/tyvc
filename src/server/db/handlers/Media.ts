import { MEDIA_TYPE } from '@prisma/client';
import { Status } from '@prisma/client';

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
    case 'document':
      return MEDIA_TYPE.DOCUMENT;
    case 'referenceCall':
      return MEDIA_TYPE.REFERENCE_CALL;
    case 'deck':
    return MEDIA_TYPE.DECK;
    default:
      return MEDIA_TYPE.ARTICLE; // Default to ARTICLE if type is unrecognized
  }
}

async function importMediaHandler(body: any) {

  if (body.status === Status.draft) {
    const updateResult = await prisma.board.update({
      where: { id: body.SupabaseID },
      data: {
        status: Status.draft,
      },
    });
    logger.debug('unbpublished Media with ID', body.SupabaseID);
    return updateResult;
  } else

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

  try {
    const existingMedia = await prisma.media.findUnique({
      where: { id: body.SupabaseID },
    });
    console.log("existingMedia", existingMedia); // Check if the record is found
    const updateResult = await prisma.media.upsert({
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

async function removeMediaItem(mediaId: string) {
  return prisma.media.delete({
    where: {
      id: mediaId,
    },
  });
}

export { mediaItemForId, importMediaHandler, removeMediaItem };
