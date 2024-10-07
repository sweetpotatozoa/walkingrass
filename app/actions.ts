// app/actions.ts
import { prisma } from '../prisma/prismaClient' // Prisma 클라이언트 불러오기

export async function getPost() {
  const postList = await prisma.post.findMany({
    orderBy: {
      id: 'desc', // id 역순으로 정렬
    },
    include: {
      user: true, // 게시글 작성자 정보 포함
      Like: {
        include: {
          User: true,
          Post: {
            select: {
              id: true,
              user_id: true,
              event_photo: true,
              landscape_photo: true,
              created_at: true,
            },
          },
        },
      },
      Cute: {
        include: {
          User: true,
          Post: {
            select: {
              id: true,
              user_id: true,
              event_photo: true,
              landscape_photo: true,
              created_at: true,
            },
          },
        },
      },
      Surprise: {
        include: {
          User: true,
          Post: {
            select: {
              id: true,
              user_id: true,
              event_photo: true,
              landscape_photo: true,
              created_at: true,
            },
          },
        },
      },
      Awesome: {
        include: {
          User: true,
          Post: {
            select: {
              id: true,
              user_id: true,
              event_photo: true,
              landscape_photo: true,
              created_at: true,
            },
          },
        },
      },
    },
  })

  return postList
}
