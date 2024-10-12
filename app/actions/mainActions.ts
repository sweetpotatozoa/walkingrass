// app/actions/mainActions.ts

import prisma from '@/lib/prismaClient'
import { Post, User } from '@/types/post'

// 모든 게시글 가져오기
export async function getPost(): Promise<Post[]> {
  const postList = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
      user: true,
      likes: true,
      cutes: true,
      surprises: true,
      awesomes: true,
    },
  })

  // 각 포스트의 post_id가 일치하는 반응 수를 계산
  return postList.map((post) => ({
    ...post,
    likes: post.likes
      ? post.likes.filter((like) => like.post_id === post.id).length
      : 0,
    cutes: post.cutes
      ? post.cutes.filter((cute) => cute.post_id === post.id).length
      : 0,
    surprises: post.surprises
      ? post.surprises.filter((surprise) => surprise.post_id === post.id).length
      : 0,
    awesomes: post.awesomes
      ? post.awesomes.filter((awesome) => awesome.post_id === post.id).length
      : 0,
  }))
}

// 특정 유저 ID로 유저 정보 가져오기
export async function getUserId(id: number): Promise<User | null> {
  const userdata = await prisma.user.findUnique({
    where: { id: id },
    include: {
      posts: true,
      likes: true,
      cutes: true,
      surprises: true,
      awesomes: true,
    },
  })
  return userdata
}
