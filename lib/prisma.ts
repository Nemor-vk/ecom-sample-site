import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    errorFormat: 'pretty',
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export default db;



// import { PrismaClient } from '../generated/prisma/client.js'
// // import { PrismaClient } from '@prisma/client';
// import { withAccelerate } from '@prisma/extension-accelerate'

// const globalForPrisma = global as unknown as { 
//     prisma: PrismaClient
// }

// const db = globalForPrisma.prisma || new PrismaClient({omit: {user: {password:true}}}).$extends(withAccelerate())

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// export default db
/////////////////////////
// import { PrismaClient } from '../generated/prisma/client.js'
// // import { PrismaClient } from '@prisma/client';
// import { withAccelerate } from '@prisma/extension-accelerate'

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient
// }

// // ✅ Remove the `omit` option — not supported in Prisma 5
// const db = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// export default db