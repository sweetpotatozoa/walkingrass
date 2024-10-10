import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

// GET 메서드로 포스트 데이터 가져오기
export async function GET() {
  try {
    const postList = await prisma.post.findMany() // Supabase의 포스트 데이터 가져오기
    return NextResponse.json(postList)
  } catch (error: unknown) {
    console.error('Error fetching post list:', error) // error를 로그로 출력
    return NextResponse.error() // 오류 응답 반환
  }
}
