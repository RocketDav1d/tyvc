import prisma from '@/server/db/prisma';

async function employeeByIdHandler(employeeId: string) {
  return prisma.employee.findUnique({
    where: {
      id: employeeId,
    },
  });
}

async function importEmployeeHandler(body: any) {
  return prisma.employee.create({
    data: {
      id: body.SupabaseID,
      firstName: body.name ? body.name.split(' ')[0] : '',
      lastName: body.name ? body.name.split(' ').slice(1).join(' ') : '',
      position: body.position,
      email: body.email,
      about: body.about,
      location: body.location,
      phone: body.phoneNumber,
      investments: {
        connect: body.investments.map((investmentId: string) => ({
          id: investmentId,
        })),
      },
      startingYear: body.startingYear,
      boards: {
        connect: body.boardPositions.map((boardPositionId: string) => ({
          id: boardPositionId,
        })),
      },
    },
  });
}

async function removeEmployeeById(employeeId: string) {
  return prisma.employee.delete({
    where: {
      id: employeeId,
    },
  });
}

export { employeeByIdHandler, importEmployeeHandler, removeEmployeeById };
