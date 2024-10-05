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

// createPost 함수의 타입 정의
export async function createPost(
  formData: FormData, // FormData만 받도록 수정
): Promise<PostState> {
  const phone = formData.get('phone') as string
  const todayImage = formData.get('todayImage') as File | null
  const myImage = formData.get('myImage') as File | null

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

    const post = await prisma.post.create({
      data: postData,
    })

    // 게시글 생성 후 캐시 무효화
    revalidatePath('/postList')
    revalidatePath('/profile')

    return { success: true, error: null }
  } catch (error: any) {
    console.error('Error creating post:', error.message || error)
    return { success: false, error: '게시글 생성에 실패했습니다.' }
  }
}
