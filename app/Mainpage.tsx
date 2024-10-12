'use client'

import { useState } from 'react'
import { Post, User } from '@/types/post'

export default function Mainpage({
  postList: initialPostList,
  userdata,
}: {
  postList: Post[]
  userdata: User
}) {
  const [postList, setPostList] = useState<Post[]>(initialPostList)

  const handleReaction = async (postId: number, reactionType: string) => {
    try {
      // 해당 반응에 대한 API 요청 전송
      const response = await fetch(`/api/reactions/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userdata.id, // 현재 유저 ID
          reactionType: reactionType, // 반응 종류 (Like, Awesome, Cute, Surprise)
        }),
      })

      if (!response.ok) {
        // 서버에서 에러 응답을 받았을 경우
        const errorMessage = await response.json()
        alert(errorMessage.message || 'Failed to update reaction')
        throw new Error('Failed to update reaction')
      }

      // 성공적으로 업데이트된 포스트 데이터를 받음
      const updatedReaction = await response.json()

      // postList 업데이트
      setPostList((prevList) =>
        prevList.map((post) =>
          post.id === postId
            ? {
                ...post,
                // 반응 종류에 따라 해당 값을 증가시킴
                likes: reactionType === 'Like' ? post.likes + 1 : post.likes,
                cutes: reactionType === 'Cute' ? post.cutes + 1 : post.cutes,
                surprises:
                  reactionType === 'Surprise'
                    ? post.surprises + 1
                    : post.surprises,
                awesomes:
                  reactionType === 'Awesome'
                    ? post.awesomes + 1
                    : post.awesomes,
              }
            : post,
        ),
      )
    } catch (error) {
      console.error('Error updating reaction:', error)
    }
  }

  return (
    <div className="min-h-screen">
      <div>
        <p>Logged in as: {userdata.username}</p>
        <p>Phone: {userdata.phone}</p>
      </div>

      {postList.map((post: Post, index: number) => (
        <div
          key={index}
          className="min-h-screen flex flex-row overflow-x-auto relative text-white"
        >
          {/* Buttons */}
          <div className="text-xs absolute flex flex-col bottom-16 right-4 justify-center items-center">
            <button
              className="bg-transparent rounded m-2 w-10 h-10"
              onClick={() => handleReaction(post.id, 'Like')}
            >
              <img
                src="/images/dotori-icon.png"
                alt="Likes"
                className="w-full h-full object-contain"
              />
            </button>
            <p>좋아요 : {post.likes || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-10 h-10"
              onClick={() => handleReaction(post.id, 'Cute')}
            >
              <img
                src="/images/mushroom.png"
                alt="Cute"
                className="w-full h-full object-contain"
              />
            </button>
            <p>귀여워요 : {post.cutes || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-10 h-10"
              onClick={() => handleReaction(post.id, 'Surprise')}
            >
              <img
                src="/images/leaf.png"
                alt="Surprise"
                className="w-full h-full object-contain"
              />
            </button>
            <p>놀라워요 : {post.surprises || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-10 h-10"
              onClick={() => handleReaction(post.id, 'Awesome')}
            >
              <img
                src="/images/pretzel.png"
                alt="Awesome"
                className="w-full h-full object-contain"
              />
            </button>
            <p>최고예요 : {post.awesomes || 0}</p>
          </div>

          {/* landscape_photo */}
          <div className="w-[430px] h-[932px] bg-gray-200 flex-shrink-0">
            <img
              src={post.landscape_photo}
              alt="Landscape"
              className="w-full h-full object-cover"
            />
          </div>

          {/* event_photo */}
          <div className="w-[430px] h-[932px] bg-gray-200 flex-shrink-0">
            <img
              src={post.event_photo}
              alt="Event"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
