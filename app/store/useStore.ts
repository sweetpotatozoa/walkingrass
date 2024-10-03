import { create } from 'zustand'

interface AppState {
  myInfo: { id: number; name: string }

  postList: {
    id: number
    userId: number
    event_photo: string
    landscape_photo: string
    likes: number[]
    cutes: number[]
    surprises: number[]
    awesomes: number[]
  }[]

  newPost: {
    user_id: number | null
    event_photo: string
    landscape_photo: string
    phone: string | null
  }

  myPostList: {
    id: number
    likes: number[]
    cutes: number[]
    surprises: number[]
    awesomes: number[]
    created_at: string
  }[]

  currentPost: {
    id: number
    userId: number
    event_photo: string
    landscape_photo: string
    likes: number[]
    cutes: number[]
    surprises: number[]
    awesomes: number[]
  }

  event: {
    id: number
    location: string
    hint: string
    quest_photo: string
    participants: number[]
    winners: number[]
  }

  setMyInfo: (user: { id: number; name: string }) => void

  setPostList: (
    posts: {
      id: number
      userId: number
      event_photo: string
      landscape_photo: string
      likes: number[]
      cutes: number[]
      surprises: number[]
      awesomes: number[]
    }[],
  ) => void
  setNewPost: (post: {
    user_id: number | null
    event_photo: string
    landscape_photo: string
    phone: string | null
  }) => void
  setMyPostList: (
    posts: {
      id: number
      likes: number[]
      cutes: number[]
      surprises: number[]
      awesomes: number[]
      created_at: string
    }[],
  ) => void
  setCurrentPost: (currentPost: {
    id: number
    userId: number
    event_photo: string
    landscape_photo: string
    likes: number[]
    cutes: number[]
    surprises: number[]
    awesomes: number[]
  }) => void
  setEvent: (event: {
    id: number
    location: string
    hint: string
    quest_photo: string
    participants: number[]
    winners: number[]
  }) => void
  fetchPostList: () => Promise<void>
}

// Zustand 스토어 생성
export const useStore = create<AppState>((set) => ({
  myInfo: { id: 0, name: '' },
  postList: [],
  newPost: {
    user_id: null,
    event_photo: '',
    landscape_photo: '',
    phone: null,
  },
  myPostList: [],
  currentPost: {
    id: 0,
    userId: 0,
    event_photo: '',
    landscape_photo: '',
    likes: [],
    cutes: [],
    surprises: [],
    awesomes: [],
  },
  event: {
    id: 0,
    location: '성북천',
    hint: '다리 밑',
    quest_photo: '',
    participants: [],
    winners: [],
  },

  // 상태 업데이트 함수들
  setMyInfo: (info) => set(() => ({ myInfo: info })),
  setPostList: (posts) => set(() => ({ postList: posts })),
  setNewPost: (post) => set(() => ({ newPost: post })),
  setMyPostList: (posts) => set(() => ({ myPostList: posts })),
  setCurrentPost: (post) => set(() => ({ currentPost: post })),
  setEvent: (event) => set(() => ({ event })),
  fetchPostList: async () => {
    try {
      const response = await fetch('/api/post-list') // 서버에서 데이터 가져오기
      const postList = await response.json() // JSON 데이터로 변환
      set({ postList: postList }) // postList 상태 업데이트
    } catch (error) {
      console.error('Failed to fetch posts', error)
    }
  },
}))
