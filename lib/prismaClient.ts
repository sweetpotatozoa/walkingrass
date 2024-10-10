import { PrismaClient } from '@prisma/client'

declare global {
  // const로 변경하여 ESLint 경고 해결
  const globalWithPrisma: typeof global & {
    prisma: PrismaClient | undefined
  }
}

const prisma =
  globalWithPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalWithPrisma.prisma = prisma

export default prisma
