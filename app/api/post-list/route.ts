import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

// GET 메서드로 포스트 데이터 가져오기
export async function GET() {
  try {
    // Prisma를 사용하여 포스트 데이터를 id 역순으로 정렬해서 가져오기
    const postList = await prisma.post.findMany({
      orderBy: {
        id: 'desc', // id 역순으로 정렬
      },
    })
    console.log(postList)
    return NextResponse.json(postList)
  } catch (error) {
    console.error('Error fetching postList:', error)
    return NextResponse.error()
  }
}
