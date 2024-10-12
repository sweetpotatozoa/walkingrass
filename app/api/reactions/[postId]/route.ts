import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function POST(req: Request, { params }: { params: { postId: string } }) {
  const { postId } = params
  const { userId, reactionType } = await req.json()

  try {
    // 반응 타입에 따른 테이블을 결정
    let reactionTable: any
    switch (reactionType) {
      case 'Like':
        reactionTable = prisma.like
        break
      case 'Cute':
        reactionTable = prisma.cute
        break
      case 'Surprise':
        reactionTable = prisma.surprise
        break
      case 'Awesome':
        reactionTable = prisma.awesome
        break
      default:
        return NextResponse.json({ message: 'Invalid reaction type' }, { status: 400 })
    }

    // 이미 반응을 했는지 체크
    const existingReaction = await reactionTable.findFirst({
      where: {
        post_id: Number(postId),
        user_id: userId,
      },
    })

    if (existingReaction) {
      return NextResponse.json({ message: `이미 ${reactionType}를 누른 게시글이에요!` }, { status: 400 })
    }

    // 새로운 반응 추가
    const newReaction = await reactionTable.create({
      data: {
        post_id: Number(postId),
        user_id: userId,
      },
    })

    return NextResponse.json(newReaction, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error processing reaction', error }, { status: 500 })
  }
}
