'use client'
import { useEffect, useState } from 'react'
import { getLatestEvent } from '../actions/eventActions'
import type { EventWithParticipantsAndWinners } from '@/types/event'

export default function Event() {
  const [eventData, setEventData] =
    useState<EventWithParticipantsAndWinners | null>(null)

  useEffect(() => {
    const fetchEventData = async () => {
      const data = await getLatestEvent()
      setEventData(data)
    }

    fetchEventData()

    // 현재 시간과 9시 비교
    const now = new Date()
    const nineAm = new Date()
    nineAm.setHours(9, 0, 0, 0) // 9시 설정

    const timeUntilNineAm = nineAm.getTime() - now.getTime()

    // 로컬 스토리지에서 'hasReloaded' 상태 확인
    const hasReloaded = localStorage.getItem('hasReloaded')

    if (!hasReloaded) {
      if (timeUntilNineAm > 0) {
        setTimeout(() => {
          // 새로고침 전 로컬 스토리지에 기록
          localStorage.setItem('hasReloaded', 'true')
          window.location.reload() // 9시에 페이지 새로고침
        }, timeUntilNineAm)
      } else {
        localStorage.setItem('hasReloaded', 'true')
        window.location.reload() // 9시가 이미 지났으면 즉시 새로고침
      }
    } else {
      // 다음 날 9시가 지난 후 로컬 스토리지 리셋
      if (now.getHours() >= 9 && now.getDate() !== nineAm.getDate()) {
        localStorage.removeItem('hasReloaded') // 9시가 지나면 로컬 스토리지 리셋
      }
    }
  }, [])

  if (!eventData) {
    return (
      <div className="relative text-white w-full h-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>{' '}
        {/* 배경만 투명도 적용 */}
        <p className="relative z-10 text-4xl">로딩 중...</p>{' '}
        {/* 글씨는 투명도 없음 */}
      </div>
    )
  }

  return (
    <>
      <div
        className="text-white w-full h-screen"
        style={{
          backgroundImage: `url(${eventData.quest_photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative w-full h-screen">
          <div className="absolute bottom-32 left-4 flex-col justify-center items-center">
            <h1 className="text-base font-bold text-center mb-2">
              운영자 토토로
            </h1>
            <img src="mascot.png" alt="토토로" className="h-24 mx-auto" />
          </div>
          <div className="absolute flex-col justify-center items-center right-4 bottom-60 bg-blue-500 pl-4 pr-8 py-2 rounded-xl rounded-bl-none">
            <p className="mb-4">
              오늘의 도토리는 <strong>{eventData.location}</strong>에 있어!
            </p>
            <p className="mb-4">그럼 오늘도 응원할게 :)</p>
            <p className="text-sm">
              힌트 : <strong>{eventData.hint}</strong>
            </p>
            <div
              className="absolute z-10 border-2"
              style={{
                left: 24,
                top: '100%',
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '32px 32px 0 0',
                borderColor: '#3B82F6 transparent transparent transparent',
                marginTop: '-16px',
                marginLeft: '-32px',
                transform: 'rotate(32deg)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
