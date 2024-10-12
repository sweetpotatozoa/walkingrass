import prisma from '@/lib/prismaClient'

// 모든 게시글(Post)을 가져오는 함수
export async function getPost() {
  const postList = await prisma.post.findMany({
    orderBy: {
      id: 'desc', // id 역순으로 정렬
    },
    include: {
      user: true, // 게시글 작성자 정보 포함
      likes: {
        include: {
          user: true, // 좋아요를 누른 사용자 정보 포함
        },
      },
      cutes: {
        include: {
          user: true, // 귀여워요를 누른 사용자 정보 포함
        },
      },
      surprises: {
        include: {
          user: true, // 놀라워요를 누른 사용자 정보 포함
        },
      },
      awesomes: {
        include: {
          user: true, // 최고예요를 누른 사용자 정보 포함
        },
      },
    },
  })

  return postList
}

// 특정 사용자(User)를 id로 가져오는 함수
export const getUserId = async (id: number) => {
  const userdata = await prisma.user.findUnique({
    where: { id: id },
    include: {
      posts: true, // 사용자가 작성한 게시글 포함
      likes: true, // 사용자가 좋아요한 게시글 포함
      cutes: true, // 사용자가 귀여워요한 게시글 포함
      surprises: true, // 사용자가 놀라워요한 게시글 포함
      awesomes: true, // 사용자가 최고예요한 게시글 포함
      participatedEvents: true, // 사용자가 참가한 이벤트 포함
      wonEvents: true, // 사용자가 우승한 이벤트 포함
    },
  })

  return userdata
}
