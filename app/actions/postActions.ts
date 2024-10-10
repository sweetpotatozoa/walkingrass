'use server'

import { supabase } from '@/lib/supabaseClient'
import prisma from '@/lib/prismaClient'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid' // UUID 라이브러리

// 상태 타입 정의
interface PostState {
  success: boolean
  error: string | null
}

// 거리 계산 함수
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371 // 지구의 반지름 (킬로미터)
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // 킬로미터
}

// createPost 함수의 타입 정의
export async function createPost(
  formData: FormData, // FormData만 받도록 수정
): Promise<PostState> {
  const phone = formData.get('phone') as string
  const todayImage = formData.get('todayImage') as File | null
  const myImage = formData.get('myImage') as File | null
  const gpsLocation = JSON.parse(formData.get('gpsLocation') as string) // GPS 위치 가져오기

  // 필수 필드 확인
  if (!phone) {
    return { success: false, error: '전화번호를 입력해주세요.' }
  }

  if (!todayImage) {
    return { success: false, error: '오늘의 도토리 이미지를 업로드해주세요.' }
  }

  if (!myImage) {
    return { success: false, error: '나만의 도토리 이미지를 업로드해주세요.' }
  }

  try {
    // 가장 최근 이벤트의 GPS 위치 가져오기
    const event = await prisma.event.findFirst({
      orderBy: { created_at: 'desc' }, // createdAt 필드에 따라 내림차순 정렬
      select: { latitude: true, longitude: true },
    })

    if (!event) {
      return { success: false, error: '이벤트 정보를 찾을 수 없습니다.' }
    }

    // GPS 거리 확인
    const distance = calculateDistance(
      gpsLocation.latitude,
      gpsLocation.longitude,
      event.latitude,
      event.longitude,
    )

    if (distance > 0.05) {
      // 1km 이상이면 유효하지 않음
      return {
        success: false,
        error: '현재 위치가 이벤트와 유효한 거리를 벗어났습니다.',
      }
    }

    // Supabase 스토리지에 이미지 업로드
    const uploadedImages = await Promise.all(
      [todayImage, myImage].map(async (image, index) => {
        const uniqueFileName = `${Date.now()}_${index}_${uuidv4()}` // 파일 이름을 UUID로 대체

        const { data, error } = await supabase.storage
          .from('images') // 스토리지 버킷 이름
          .upload(uniqueFileName, image)

        if (error) {
          console.error('Error uploading image:', error)
          throw new Error('이미지 업로드 중 오류 발생')
        }

        return supabase.storage.from('images').getPublicUrl(data.path).data
          .publicUrl
      }),
    )

    const [todayImageUrl, myImageUrl] = uploadedImages

    console.log('Uploaded images:', todayImageUrl, myImageUrl)

    // 게시글 데이터 생성 및 Prisma를 사용하여 데이터베이스에 삽입
    const postData = {
      user_id: 1, // 나중에 로그인 기능 추가 후 수정
      event_photo: todayImageUrl,
      landscape_photo: myImageUrl,
    }

    await prisma.post.create({
      data: postData,
    })

    // 게시글 생성 후 캐시 무효화
    revalidatePath('/postList')
    revalidatePath('/profile')

    return { success: true, error: null }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // error가 Error 인스턴스인 경우 메시지 출력
      console.error('Error creating post:', error.message)
      return { success: false, error: error.message } // 실제 에러 메시지 반환
    } else {
      // error가 Error가 아닌 경우
      console.error('An unknown error occurred:', error)
      return { success: false, error: '게시글 생성에 실패했습니다.' }
    }
  }
}
