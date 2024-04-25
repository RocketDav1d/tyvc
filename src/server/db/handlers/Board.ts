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

  return prisma.board.upsert({
    where: { id: body.SupabaseID },
    update: data,
    create: data,
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
