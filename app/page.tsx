'use client'

import { useEffect } from 'react'
import { useStore } from './store/useStore' // Zustand로 상태 관리
import { useSwipeable } from 'react-swipeable' // 스와이프를 위한 라이브러리

export default function MainPage() {
  const { postList, fetchPostList } = useStore()

  useEffect(() => {
    fetchPostList() // 처음 로드 시 포스트 불러오기
  }, [])

  return (
    <div className="min-h-screen">
      {postList.map((post, index) => (
        <div
          key={index}
          className="min-h-screen flex overflow-x-auto relative" // 부모가 relative이므로 자식 요소가 이 안에서 위치
        >
          {/* Buttons */}
          <div className="absolute top-4 left-4 z-10">
            {' '}
            {/* absolute로 부모를 기준으로 고정 */}
            <button className="bg-blue-500 text-white py-2 px-4 rounded m-2">
              👍 좋아요 {post.likes.length || 0}
            </button>
            <button className="bg-pink-500 text-white py-2 px-4 rounded m-2">
              🐱 귀여워요 {post.cutes.length || 0}
            </button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded m-2">
              😮 놀라워요 {post.surprises.length || 0}
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded m-2">
              💯 최고예요 {post.awesomes.length || 0}
            </button>
          </div>

          {/* landscape_photo */}
          <div className="w-screen h-screen flex-shrink-0">
            <img
              src={post.landscape_photo}
              alt="Landscape"
              className="w-full h-full object-cover"
            />
          </div>

          {/* event_photo */}
          <div className="w-screen h-screen flex-shrink-0">
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
