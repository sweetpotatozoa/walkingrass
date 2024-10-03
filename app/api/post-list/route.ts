import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

// GET 메서드로 포스트 데이터 가져오기
export async function GET() {
  try {
    const postList = await prisma.post.findMany() // Supabase의 포스트 데이터 가져오기
    console.log(postList)
    return NextResponse.json(postList)
  } catch (error) {
    return NextResponse.error()
  }
}
