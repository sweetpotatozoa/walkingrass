'use client'

import { useEffect, useState } from 'react'
import { useStore } from './store/useStore' // Zustand로 상태 관리
import { useSwipeable } from 'react-swipeable' // 스와이프를 위한 라이브러리

export default function MainPage() {
  const { postList, fetchPostList } = useStore()
  const [currentIndex, setCurrentIndex] = useState(0) // 현재 포스트 인덱스
  const [showEventPhoto, setShowEventPhoto] = useState(false) // 이벤트 사진을 보여줄지 여부

  useEffect(() => {
    fetchPostList() // 처음 로드 시 포스트 불러오기
  }, [])

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowEventPhoto(true), // 오른쪽에서 왼쪽으로 스와이프 시 event_photo를 보여줌
    onSwipedRight: () => setShowEventPhoto(false), // 왼쪽에서 오른쪽으로 스와이프 시 landscape_photo를 다시 보여줌
    onSwipedUp: () => {
      if (currentIndex < postList.length - 1) {
        setCurrentIndex(currentIndex + 1) // 다음 포스트로 이동
        setShowEventPhoto(false) // 포스트가 바뀌면 landscape_photo를 다시 보여줌
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1) // 이전 포스트로 이동
        setShowEventPhoto(false) // 포스트가 바뀌면 landscape_photo를 다시 보여줌
      }
    },
    trackTouch: true, // 터치 트래킹 활성화
  })

  if (postList.length === 0) {
    return <div>Loading...</div> // 데이터 로드 중일 때 로딩 메시지 표시
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <div
        className="min-h-screen flex justify-center items-center"
        {...handlers}
      >
        <div className="w-full h-full">
          <img
            src={
              showEventPhoto
                ? postList[currentIndex].event_photo
                : postList[currentIndex].landscape_photo
            }
            alt="Post"
            className="min-w-full min-h-full object-cover object-center"
          />
          {/* 알림 바 */}
          <div
            className="absolute top-12 right-4 bg-[#2C2C2C] text-white text-sm flex justify-center items-center rounded"
            style={{
              width: '35px',
              height: '26px',
              borderRadius: '13.5px',
              padding: '4px',
            }}
          >
            {showEventPhoto ? '2/2' : '1/2'}
          </div>
        </div>
      </div>
    </div>
  )
}
