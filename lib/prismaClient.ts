import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined // 전역 prisma 변수 선언
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // 로그를 활성화하여 쿼리 상태 확인 가능
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
