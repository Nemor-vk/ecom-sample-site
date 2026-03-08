import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as { prisma: any }; // Using any here to handle the extended type cleanly

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});

const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

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