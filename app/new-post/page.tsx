'use client'

import React, { useState } from 'react'
import { createPost } from '../actions/postActions'

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="absolute mt-8 bottom-20 w-[92%] max-w-[416px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {pending ? '업로드 중...' : '게시글 업로드'}
    </button>
  )
}

const NewPost = ({ action }: { action: (formData: FormData) => void }) => {
  const [todayImage, setTodayImage] = useState<File | null>(null)
  const [myImage, setMyImage] = useState<File | null>(null)
  const [phone, setPhone] = useState<string>('')

  // 이미지 MIME 타입을 확인하는 함수
  const isValidImage = (file: File | null): boolean => {
    if (!file) return false
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/heic',
      'image/webp',
    ]
    return validImageTypes.includes(file.type)
  }

  const handleTodayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTodayImage(e.target.files[0])
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

  const handleClientValidation = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!todayImage || !isValidImage(todayImage)) {
      alert(
        '오늘의 도토리 이미지를 올바른 이미지 파일로 업로드해주세요. (이미지 파일만 업로드 가능합니다)',
      )
      return
    }

    if (!myImage || !isValidImage(myImage)) {
      alert(
        '나만의 도토리 이미지를 올바른 이미지 파일로 업로드해주세요. (이미지 파일만 업로드 가능합니다)',
      )
      return
    }

    if (!phone) {
      alert('전화번호를 입력해주세요.')
      return
    }

    // FormData 생성
    const formData = new FormData()
    formData.append('todayImage', todayImage)
    formData.append('myImage', myImage)
    formData.append('phone', phone)

    // 서버 액션 직접 호출
    await createPost(formData)
  }

  const pending = false // 여기에 실제 상태를 연결할 수 있음

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
            onChange={handlePhoneChange}
          />
        </div>
      </div>
      <SubmitButton pending={pending} />
    </form>
  )
}

export default NewPost
