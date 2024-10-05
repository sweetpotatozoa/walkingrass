import { PrismaClient } from '@prisma/client'

declare global {
  // PrismaClient를 전역에서 재사용할 수 있도록 선언
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
