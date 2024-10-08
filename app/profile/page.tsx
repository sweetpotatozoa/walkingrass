'use client'

import { useState, useEffect } from 'react'
import { getUserProfileWithEvents } from '../actions/userActions'
import { UserProfileWithTotalsAndDates } from '@/types/user'

export default function Profile() {
  const [userData, setUserData] =
    useState<UserProfileWithTotalsAndDates | null>(null)
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 상태
  const postsPerPage = 5 // 페이지당 포스트 수 설정

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserProfileWithEvents(1) // 예: userId = 1
      setUserData(data)
    }

    fetchUserData()
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  // 페이지네이션용 데이터 계산
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts =
    userData.posts?.slice(indexOfFirstPost, indexOfLastPost) || []

  // 페이지 변경 핸들러
  const handleNextPage = () => {
    if (currentPage < Math.ceil(userData.posts!.length / postsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <div
        className="text-white w-full min-h-screen px-4 py-10 flex-col"
        style={{
          backgroundImage: 'url(profile_bg.png)',
          backgroundSize: 'cover', // 배경 이미지가 요소 크기에 맞춰서 잘리지 않게 확대
        }}
      >
        <div className="w-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold mb-4">내가 모은 도토리</h1>
            <p className="text-base">지금까지 내가 모은 모든 도토리에요!</p>
          </div>
          <div></div>
          <div className="w-full flex flex-col justify-center items-center">
            <img src="my_today_dotori.svg"></img>
            <div className="text-4xl my-4">
              X {userData.eventParticipationCount} 개
            </div>
            <p>
              {userData.eventParticipationCount} 개의 오늘의 도토리를
              모으셨군요! 엄청나요
            </p>
          </div>

          {/* 감정표현 총합 */}
          <div className="w-full flex flex-row justify-between items-center px-8 mt-10">
            <div className="flex flex-col justify-center items-center">
              <img src="dotori.png" className="mb-4"></img>
              <div className="text-xl">{userData.totalLikes} 개</div>{' '}
              {/* 좋아요 */}
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="dotori.png" className="mb-4"></img>
              <div className="text-xl">{userData.totalCutes} 개</div>{' '}
              {/* 귀엽다 */}
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="dotori.png" className="mb-4"></img>
              <div className="text-xl">{userData.totalSurprises} 개</div>{' '}
              {/* 놀랍다 */}
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="dotori.png" className="mb-4"></img>
              <div className="text-xl">{userData.totalAwesomes} 개</div>{' '}
              {/* 대단하다 */}
            </div>
          </div>
        </div>

        {/* 나의 기록들 (페이지네이션 포함) */}
        <div className="w-full flex flex-col mt-8 mb-32">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold pb-4 border-b-2">
              나의 기록들
            </h1>
            <div className="flex flex-col">
              {currentPosts && currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex justify-between items-center px-4 pb-4 border-b-2 mt-4"
                  >
                    <div className="text-xl font-semibold">
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-xl">보러가기</div>
                  </div>
                ))
              ) : (
                <p>작성된 기록이 없습니다.</p>
              )}
            </div>

            {/* 페이지네이션 버튼 */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
              >
                이전
              </button>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage ===
                  Math.ceil(userData.posts!.length / postsPerPage)
                }
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
