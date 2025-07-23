import { PrismaClient } from '../generated/prisma/client.js'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const db = globalForPrisma.prisma || new PrismaClient({omit: {user: {password:true}}}).$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export default db