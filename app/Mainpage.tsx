// app/Mainpage.tsx

'use client'

import { useState } from 'react'
import { Post, User } from '@/types/post'
import Swipe from 'react-easy-swipe'

export default function Mainpage({
  postList: initialPostList,
  userdata,
}: {
  postList: Post[]
  userdata: User
}) {
  const [postList, setPostList] = useState<Post[]>(initialPostList)
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0) // 현재 보고 있는 게시글 인덱스
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0) // 현재 보고 있는 이미지 인덱스 (0: landscape_photo, 1: event_photo)

  const handleReaction = async (postId: number, reactionType: string) => {
    try {
      const response = await fetch(`/api/reactions/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userdata.id,
          reactionType: reactionType,
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        alert(errorMessage.message || 'Failed to update reaction')
        throw new Error('Failed to update reaction')
      }

      const updatedReaction = await response.json()
      setPostList((prevList) =>
        prevList.map((post) =>
          post.id === postId
            ? {
                ...post,
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

  // 좌우 스와이프 (사진 변경)
  const handleSwipeLeftRight = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentImageIndex < 1) {
      setCurrentImageIndex(1)
    } else if (direction === 'right' && currentImageIndex > 0) {
      setCurrentImageIndex(0)
    }
  }

  // 상하 스와이프 (게시글 변경)
  const handleSwipeUpDown = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentPostIndex < postList.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1)
      setCurrentImageIndex(0) // 게시글 이동 시 이미지도 초기화
    } else if (direction === 'down' && currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1)
      setCurrentImageIndex(0)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Swipe
        onSwipeLeft={() => handleSwipeLeftRight('left')}
        onSwipeRight={() => handleSwipeLeftRight('right')}
        onSwipeUp={() => handleSwipeUpDown('up')}
        onSwipeDown={() => handleSwipeUpDown('down')}
      >
        <div className="min-h-screen flex flex-col overflow-hidden relative text-white">
          {postList.map((post: Post, index: number) => (
            <div
              key={index}
              className={`w-full h-screen absolute transition-transform duration-500 ease-in-out ${
                index === currentPostIndex
                  ? 'translate-y-0'
                  : index < currentPostIndex
                    ? '-translate-y-full'
                    : 'translate-y-full'
              }`}
              style={{
                transform: `translateY(${(index - currentPostIndex) * 100}%)`,
              }}
            >
              <div className="flex flex-row">
                <div
                  className="w-full h-screen flex-shrink-0 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${currentImageIndex === 1 ? '-100%' : '0'})`,
                  }}
                >
                  <img
                    src={post.landscape_photo}
                    alt="Landscape"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className="w-full h-screen flex-shrink-0 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${currentImageIndex === 1 ? '-100%' : '0'})`,
                  }}
                >
                  <img
                    src={post.event_photo}
                    alt="Event"
                    className="w-full h-full object-cover"
                    style={{
                      visibility: post.event_photo ? 'visible' : 'hidden',
                    }}
                  />
                </div>
              </div>

              <div className="text-xs absolute flex flex-col bottom-16 right-4 justify-center items-center z-10">
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
            </div>
          ))}
        </div>
      </Swipe>
    </div>
  )
}
