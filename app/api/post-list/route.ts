import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

// GET 메서드로 포스트 데이터 가져오기
export async function GET() {
  try {
    const postList = await prisma.post.findMany({
      include: {
        likes: true, // likes 데이터를 포함
        cutes: true, // cutes 데이터를 포함
        surprises: true, // surprises 데이터를 포함
        awesomes: true, // awesomes 데이터를 포함
      },
      orderBy: {
        id: 'desc', // id 값이 큰 것부터 내림차순으로 정렬
      },
    })
    return NextResponse.json(postList) // 가져온 데이터를 JSON으로 응답
  } catch (error) {
    console.error('Error fetching postList:', error)
    return NextResponse.error() // 오류 처리
  }
}
