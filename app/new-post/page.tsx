'use client'

import React, { useState } from 'react'
import { createPost } from '../actions/postActions'
import { useRouter } from 'next/navigation'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 최대 파일 크기 5MB

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="absolute mt-8 bottom-20 w-[92%] max-w-[416px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {pending ? (
        <span>
          업로드 중... <span className="spinner" /> {/* 로딩 스피너 */}
        </span>
      ) : (
        '게시글 업로드'
      )}
    </button>
  )
}

const NewPost = () => {
  const [todayImage, setTodayImage] = useState<File | null>(null)
  const [myImage, setMyImage] = useState<File | null>(null)
  const [phone, setPhone] = useState<string>('')
  const [gpsLocation, setGpsLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [pending, setPending] = useState<boolean>(false) // 제출 중 상태 관리
  const router = useRouter()

  // 이미지 MIME 타입과 파일 크기 확인하는 함수
  const isValidImage = (file: File | null): boolean => {
    if (!file) return false
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/heic',
      'image/webp',
    ]
    const isValidType = validImageTypes.includes(file.type)
    const isValidSize = file.size <= MAX_FILE_SIZE
    return isValidType && isValidSize
  }

  const handleTodayImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    await getCurrentLocation() // 먼저 GPS 위치 수집
    if (e.target.files && e.target.files[0]) {
      setTodayImage(e.target.files[0]) // 위치 수집 후 사진 설정
    }
  }

  const handleMyImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMyImage(e.target.files[0])
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  // GPS 위치를 수집하는 함수
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setGpsLocation({ latitude, longitude })
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert(
                '위치 정보 접근이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용하세요.',
              )
              break
            case error.POSITION_UNAVAILABLE:
              alert(
                '위치 정보를 사용할 수 없습니다. GPS가 켜져 있는지 확인하세요.',
              )
              break
            case error.TIMEOUT:
              alert('위치 정보 요청 시간이 초과되었습니다.')
              break
          }
        },
      )
    } else {
      alert('이 브라우저는 Geolocation을 지원하지 않습니다.')
    }
  }

  const handleClientValidation = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!todayImage || !isValidImage(todayImage)) {
      alert(
        '오늘의 도토리 이미지를 올바른 이미지 파일로 업로드해주세요. (5MB 이하의 이미지 파일만 허용됩니다)',
      )
      return
    }

    if (!myImage || !isValidImage(myImage)) {
      alert(
        '나만의 도토리 이미지를 올바른 이미지 파일로 업로드해주세요. (5MB 이하의 이미지 파일만 허용됩니다)',
      )
      return
    }

    if (!phone) {
      alert('전화번호를 입력해주세요.')
      return
    }

    if (!gpsLocation) {
      alert('위치를 가져오지 못했습니다. GPS가 켜져있는지 확인해주세요.')
      return
    }

    // 제출 중 상태로 설정
    setPending(true)

    // FormData 생성
    const formData = new FormData()
    formData.append('todayImage', todayImage)
    formData.append('myImage', myImage)
    formData.append('phone', phone)
    formData.append('gpsLocation', JSON.stringify(gpsLocation)) // GPS 위치 추가

    // 서버 액션 직접 호출
    const response = await createPost(formData)

    // 제출 완료 후 상태 변경
    setPending(false)

    if (response.success) {
      alert('게시물이 정상적으로 업로드되었습니다!')

      // 폼 초기화
      setTodayImage(null)
      setMyImage(null)
      setPhone('')
      setGpsLocation(null)

      router.push('/') // 업로드 후 홈으로 이동
    } else {
      alert(response.error || '게시물 업로드에 실패했습니다.')
    }
  }

  return (
    <form onSubmit={handleClientValidation} className="mt-10 mx-4 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-4">도토리 모으기</h1>
        <p className="text-base">
          찾아낸 오늘의 도토리와 나만의 도토리를 올려주세요
        </p>
      </div>
      <div>
        <div className="mb-4">
          <div className="text-xl font-semibold mb-4">오늘의 도토리</div>
          <label
            htmlFor="file-upload1"
            className="w-full h-[126px] border-2 rounded-2xl border-gray-300 flex items-center justify-center cursor-pointer"
          >
            {todayImage ? (
              <img
                src={URL.createObjectURL(todayImage)}
                alt="오늘의 도토리 미리보기"
                className="h-full"
              />
            ) : (
              <img src="add.svg" alt="추가 아이콘" />
            )}
          </label>
          <input
            id="file-upload1"
            type="file"
            accept="image/*"
            capture="environment" // 카메라를 바로 실행 (후면 카메라)
            onChange={handleTodayImageChange}
            className="w-full hidden"
          />
        </div>
        <div className="mb-4">
          <div className="text-xl font-semibold mb-4">나만의 도토리</div>
          <label
            htmlFor="file-upload2"
            className="w-full h-[126px] border-2 rounded-2xl border-gray-300 flex items-center justify-center cursor-pointer"
          >
            {myImage ? (
              <img
                src={URL.createObjectURL(myImage)}
                alt="나만의 도토리 미리보기"
                className="h-full"
              />
            ) : (
              <img src="add.svg" alt="추가 아이콘" />
            )}
          </label>
          <input
            id="file-upload2"
            type="file"
            accept="image/*"
            onChange={handleMyImageChange}
            className="w-full hidden"
          />
        </div>
        <div>
          <div className="text-xl font-semibold mb-4">
            이벤트 참여를 위한 전화번호
          </div>
          <input
            type="text"
            placeholder="ex)01012345678"
            className="w-full text-xl bg-transparent text-white placeholder-gray-400 border-2 border-white focus:outline-none rounded-2xl py-2 px-4"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
      </div>
      <SubmitButton pending={pending} />
    </form>
  )
}

export default NewPost
