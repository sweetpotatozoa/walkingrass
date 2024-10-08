'use server'

import prisma from '@/lib/prismaClient'
import { UserProfileWithTotalsAndDates } from '@/types/user'

export async function getUserProfileWithEvents(
  userId: number,
): Promise<UserProfileWithTotalsAndDates | null> {
  // 유저 정보 쿼리
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      posts: {
        orderBy: {
          created_at: 'desc', // 최신 순으로 정렬
        },
        select: {
          id: true,
          created_at: true, // 각 포스트의 생성 날짜 가져오기
        },
      },
    },
  })

  // 유저가 없을 경우 null 반환
  if (!userData) {
    return null
  }

  // 유저가 작성한 모든 포스트에 대한 감정표현 총합 계산 (중간 테이블에서 카운트)
  const totalLikes = await prisma.like.count({
    where: {
      post: {
        user_id: userId,
      },
    },
  })

  const totalCutes = await prisma.cute.count({
    where: {
      post: {
        user_id: userId,
      },
    },
  })

  const totalSurprises = await prisma.surprise.count({
    where: {
      post: {
        user_id: userId,
      },
    },
  })

  const totalAwesomes = await prisma.awesome.count({
    where: {
      post: {
        user_id: userId,
      },
    },
  })

  // 유저가 참여한 이벤트 수 계산
  const eventParticipationCount = await prisma.eventParticipation.count({
    where: {
      user_id: userId,
    },
  })

  return {
    id: userData.id,
    username: userData.username,
    posts: userData.posts
      ? userData.posts.map((post) => ({
          id: post.id,
          created_at: post.created_at,
        }))
      : [],
    totalLikes,
    totalCutes,
    totalSurprises,
    totalAwesomes,
    eventParticipationCount: eventParticipationCount || 0,
  }
}
