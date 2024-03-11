import prisma from '@/server/db/prisma';

async function boardByIdHandler(boardId: string) {
  return prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });
}

async function importBoardHandler(body: any) {
  return prisma.board.create({
    data: {
      id: body.SupabaseID,
      title: body.title,
      description: body.name,
      status: body.status,
      year: body.year,
      company: {
        connect: {
          id: body.boardSeatOn[0].id,
        },
      },
    },
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
