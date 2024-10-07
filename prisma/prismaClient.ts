// prisma/prismaClient.ts

import { PrismaClient } from '@prisma/client'

// Next.js 개발 환경에서는 Prisma 클라이언트가 여러 번 생성되는 것을 방지하기 위해 글로벌 변수를 사용
declare global {
  var prisma: PrismaClient | undefined
}

// Prisma 클라이언트를 생성 (프로덕션에서는 단일 인스턴스를 사용)
export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma // 개발 환경에서는 전역 변수를 통해 Prisma 클라이언트를 유지
}
