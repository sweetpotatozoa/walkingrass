'use client'

import { useEffect } from 'react'
import { useStore } from './store/useStore' // Zustand로 상태 관리
import { useSwipeable } from 'react-swipeable' // 스와이프를 위한 라이브러리

export default function MainPage() {
  const { postList, fetchPostList } = useStore()

  useEffect(() => {
    fetchPostList() // 처음 로드 시 포스트 불러오기
  }, [])

  const handlers = useSwipeable({
    onSwipedUp: () => console.log('Swiped up!'), // 다음 포스트로 이동
    onSwipedDown: () => console.log('Swiped down!'), // 이전 포스트로 이동
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {postList.map((post, index) => (
        <div
          key={index}
          {...handlers}
          className="min-h-screen flex justify-center items-center"
        >
          <div className="max-w-md w-full bg-gray-800 rounded-lg p-6">
            <img
              src={post.landscape_photo}
              alt="Post"
              className="w-full rounded-lg mb-4"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
