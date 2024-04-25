import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const createAcceleratedPrismaClient = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  }).$extends(withAccelerate());
};

// Define a type for the accelerated client.
type PrismaClientAccelerated = ReturnType<typeof createAcceleratedPrismaClient>;

const prismaClientPropertyName = `__prevent-name-collision__prisma`;

type GlobalThisWithPrismaClient = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClientAccelerated;
};

const getPrismaClient = () => {
  if (process.env.NODE_ENV === `production`) {
    return createAcceleratedPrismaClient();
  } else {
    const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
    if (!newGlobalThis[prismaClientPropertyName]) {
      newGlobalThis[prismaClientPropertyName] = createAcceleratedPrismaClient();
    }
    return newGlobalThis[prismaClientPropertyName];
  }
};
const prisma = getPrismaClient();

export default prisma;
