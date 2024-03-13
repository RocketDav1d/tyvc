import { BOARD_STATUS } from '@prisma/client';

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
  logger.debug('importBoardHandler', body);

  const data: any = {
    id: body.SupabaseID,
    payloadID: body.SupabaseID,
    title: body.title,
    status: body.status ? BOARD_STATUS.ACTIVE : BOARD_STATUS.DEACTIVE,
    year: body.year,
  };

  if (body.boardSeatOn && body.boardSeatOn.length > 0) {
    const boardSeat = body.boardSeatOn[0];
    if (boardSeat.portfoliocompany) {
      data.company = {
        connect: {
          id: boardSeat.portfoliocompany,
        },
      };
    } else if (boardSeat.fund) {
      data.fund = {
        connect: {
          id: boardSeat.fund,
        },
      };
    }
  }

  return prisma.board.create({
    data,
  });
}

async function removeBoardById(boardId: string) {
  return prisma.board.delete({
    where: {
      id: boardId,
    },
  });
}

export { boardByIdHandler, importBoardHandler, removeBoardById };
