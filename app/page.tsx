'use client'

import { useEffect } from 'react'
import { useStore } from './store/useStore' // Zustand로 상태 관리
import { useSwipeable } from 'react-swipeable' // 스와이프를 위한 라이브러리

export default function MainPage() {
  const { postList, fetchPostList } = useStore()

  useEffect(() => {
    fetchPostList() // 처음 로드 시 포스트 불러오기
  }, [fetchPostList])

  useEffect(() => {
    if (postList.length > 0) {
      console.log(postList) // postList가 업데이트된 후에 로그 찍기
    }
  }, [postList]) // postList가 변경될 때마다 실행

  const handlers = useSwipeable({
    onSwipedUp: () => console.log('Swiped up!'), // 다음 포스트로 이동
    onSwipedDown: () => console.log('Swiped down!'), // 이전 포스트로 이동
  })

  return (
    <div {...handlers} className="min-h-screen">
      {postList.length > 0 ? ( // postList가 있을 때만 렌더링
        postList.map((post, index) => (
          <div
            key={index}
            className="min-h-screen flex overflow-x-auto relative"
          >
            {/* Buttons */}
            <div className="fixed top-4 left-4 z-50">
              <button className="bg-blue-500 text-white py-2 px-4 rounded m-2">
                👍 좋아요 {post.likes ? post.likes.length : 0}
              </button>
              <button className="bg-pink-500 text-white py-2 px-4 rounded m-2">
                🐱 귀여워요 {post.cutes ? post.cutes.length : 0}
              </button>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded m-2">
                😮 놀라워요 {post.surprises ? post.surprises.length : 0}
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded m-2">
                💯 최고예요 {post.awesomes ? post.awesomes.length : 0}
              </button>
            </div>

            {/* landscape_photo */}
            <div className="w-screen h-screen flex-shrink-0">
              <img
                src={post.landscape_photo || ''}
                alt="Landscape"
                className="w-full h-full object-cover"
              />
            </div>

            {/* event_photo */}
            <div className="w-screen h-screen flex-shrink-0">
              <img
                src={post.event_photo || ''}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p> // 데이터가 없을 때 보여줄 메시지
      )}
    </div>
  )
}
