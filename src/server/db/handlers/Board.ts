import { BOARD_STATUS } from '@prisma/client';
import { Status } from '@prisma/client';

import prisma from '@/server/db/prisma';
import { logger } from '@/utils/logger';

async function boardByIdHandler(boardId: string) {
  return prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });
}

async function importBoardHandler(body: any) {

  if (body.status === Status.draft) {
    const updateResult = await prisma.board.update({
      where: { id: body.SupabaseID },
      data: {
        status: Status.draft,
      },
    });
    logger.debug('unbpublished Board with ID', body.SupabaseID);
    return updateResult;
  } else
  logger.debug('importBoardHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    title: body.title,
    board_status: body.board_status ? BOARD_STATUS.ACTIVE : BOARD_STATUS.DEACTIVE,
    startingYear: body.startingYear,
    endingYear: body.endingYear,
    singleCompanyName: body.singleCompanyName,
    singleCompanyNameURL: body.singleCompanyNameURL
  };

  if (body.portfoliocompany && body.portfoliocompany.trim() !== '') {
    data.company = {
      connect: {
        id: body.portfoliocompany,
      },
    };
    // data.companyId = body.portfoliocompany;
  }

  if (body.funds && body.funds.length > 0 && body.funds[0].trim() !== '') {
    data.fund = {
      connect: {
        id: body.funds[0],
      },
    };
    // data.fundId = body.funds[0];
  }


  try {
    const existingBoard = await prisma.board.findUnique({
      where: { id: body.SupabaseID },
    });
    console.log("existingBoard", existingBoard); // Check if the record is found
    const updateResult = await prisma.board.upsert({
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

async function removeBoardById(boardId: string) {
  return prisma.board.delete({
    where: {
      id: boardId,
    },
  });
}

export { boardByIdHandler, importBoardHandler, removeBoardById };
