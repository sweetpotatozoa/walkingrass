import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        // 기존 DATABASE_URL에 pgbouncer 옵션 추가
        url: process.env.DATABASE_URL + '?pgbouncer=true',
      },
    },
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
